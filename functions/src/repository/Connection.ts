import { admin } from "../firebase";
import { ID, Stored } from "./types";

export type Connection = {
  getTimestamp(): any;
  get<Entity>(collectionName: string, id: ID): Promise<Stored<Entity>>;
  add<Entity>(collectionName: string, value: Entity): Promise<Stored<Entity>>;
  set<Entity>(
    collectionName: string,
    id: ID,
    value: Partial<Entity>
  ): Promise<Stored<Entity>>;
  delete(collectionName: string, id: ID): Promise<void>;
};
