import { GQLResolver } from "@shellshot-journal/schema";
import * as Mutation from "./Mutation";
import * as Query from "./Query";

export const resolvers: GQLResolver = {
  Mutation,
  Query
};
