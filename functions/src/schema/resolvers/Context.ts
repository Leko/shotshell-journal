import { admin } from "../../firebase";
import { Repository } from "../../repository";

export type Context<EntityMap> = {
  user: admin.auth.DecodedIdToken;
  repository: Repository<EntityMap>;
};
