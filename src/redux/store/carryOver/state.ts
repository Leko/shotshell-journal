import { CarryOver } from "../../../models/CarryOver";

export type State = {
  resolved: boolean;
  error: Error | null;
  carryOver: CarryOver | null;
};
