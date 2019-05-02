import { IncomingMessage } from "http";
// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
import { Request, Response, NextFunction } from "express";
import debug from "debug";
import { admin } from "./index";

// FIXME:
export type RequestWithUser = IncomingMessage & {
  user: admin.auth.DecodedIdToken;
};

const log = debug("shellshot-journal:auth");

export const createMiddleware = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationPrefix = "Bearer ";
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(authorizationPrefix)) {
    res.status(403).send("Unauthorized");
    return;
  }

  const [, idToken] = authorization.split(authorizationPrefix);
  if (!idToken) {
    res.status(403).send("Unauthorized");
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      // @ts-ignore
      req.user = decodedIdToken;
      return next();
    })
    .catch(e => {
      log(e.stack);
      res.status(403).send("Unauthorized");
    });
};
