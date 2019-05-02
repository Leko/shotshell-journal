import { admin } from "../firebase";

export interface ID extends String {
  __ID: never;
}

export type EntityMap<Entities> = { [Name in keyof Entities]: Entities[Name] };

export type AutoFilled<Entity extends {}> = Entity & {
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

export type Stored<Entity extends {}> = AutoFilled<Entity> & {
  id: ID;
};
