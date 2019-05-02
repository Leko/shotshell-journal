import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { typeDefs } from "@shellshot-journal/schema";
import { resolvers } from "./resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers
});
