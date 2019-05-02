import { admin } from "../firebase";
import { Connection } from "../repository/Connection";
import { AutoFilled, Stored, ID } from "../repository/types";

export function createConnection(
  firestore: admin.firestore.Firestore
): Connection {
  return {
    getTimestamp() {
      return admin.firestore.FieldValue.serverTimestamp();
    },

    async get<Entity>(collectionName: string, id: ID): Promise<Stored<Entity>> {
      const ref = firestore
        .collection(collectionName)
        .doc((id as unknown) as string);
      const snapshot = await ref.get();
      const data = snapshot.data() as AutoFilled<Entity> | undefined;
      if (!data) {
        throw new Error(`Not found (collection=${collectionName}, id=${id})`);
      }

      return {
        ...data,
        id: (snapshot.id as unknown) as ID
      };
    },

    async add<Entity>(
      collectionName: string,
      value: Entity
    ): Promise<Stored<Entity>> {
      const ref = await firestore.collection(collectionName).add(value);
      const snapshot = await ref.get();
      const data = snapshot.data()! as AutoFilled<Entity>;

      return {
        ...data,
        id: (snapshot.id as unknown) as ID
      };
    },

    async set<Entity>(
      collectionName: string,
      id: ID,
      value: Partial<Entity>
    ): Promise<Stored<Entity>> {
      const ref = await firestore
        .collection(collectionName)
        .doc((id as unknown) as string);
      await ref.set(value, { merge: true });
      const snapshot = await ref.get();
      const data = snapshot.data()! as AutoFilled<Entity>;

      return {
        ...data,
        id: (snapshot.id as unknown) as ID
      };
    },

    async delete(collectionName: string, id: ID): Promise<void> {
      await firestore
        .collection(collectionName)
        .doc((id as unknown) as string)
        .delete();
    }
  };
}
