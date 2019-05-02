import { Connection } from "./Connection";
import { ID, Stored } from "./types";

export class Repository<EntityMap> {
  constructor(private connection: Connection) {}

  get<K extends keyof EntityMap>(
    collectionName: K,
    id: ID
  ): Promise<Stored<EntityMap[K]>> {
    return this.connection.get<EntityMap[K]>(collectionName as string, id);
  }

  add<K extends keyof EntityMap>(
    collectionName: K,
    entity: EntityMap[K]
  ): Promise<Stored<EntityMap[K]>> {
    const value = {
      ...entity,
      createdAt: this.connection.getTimestamp(),
      updatedAt: this.connection.getTimestamp()
    };

    return this.connection.add<EntityMap[K]>(collectionName as string, value);
  }

  set<K extends keyof EntityMap>(
    collectionName: K,
    id: ID,
    entity: Partial<EntityMap[K]>
  ): Promise<Stored<EntityMap[K]>> {
    const value = {
      ...entity,
      updatedAt: this.connection.getTimestamp()
    };
    return this.connection.set<EntityMap[K]>(
      collectionName as string,
      id,
      value
    );
  }

  async delete<K extends keyof EntityMap>(
    collectionName: K,
    id: ID
  ): Promise<void> {
    await this.connection.delete(collectionName as string, id);
  }
}
