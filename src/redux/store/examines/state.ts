import { Examine } from "../../../models/Examine";

export type State = {
  error: Error | null;
  examines: Record<string, Examine>;
};
