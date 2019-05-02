import { IncomingMessage } from "http";
import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import helmet from "helmet";
import morgan from "morgan";
import errorhandler from "errorhandler";
import { schema } from "./schema";
import { admin } from "./firebase";
import { createMiddleware } from "./firebase/middleware";
import { Context } from "./schema/resolvers/Context";
import { EntityMap } from "./schema/entities";
import { Repository } from "./repository";
import { createConnection } from "./drivers/firestore";

export const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(createMiddleware());
app.use(
  "/",
  graphqlHTTP(async (req: IncomingMessage) => {
    // @ts-ignore
    const { user }: { user: admin.auth.DecodedIdToken } = req;

    const context: Context<EntityMap> = {
      user,
      repository: new Repository(createConnection(admin.firestore()))
    };

    return {
      schema,
      graphiql: true,
      context
    };
  })
);
