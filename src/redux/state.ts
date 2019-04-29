import { State as UserState } from "./store/user";
import { State as JournalsState } from "./store/journals";
import { State as LicensesState } from "./store/licenses";

export type State = {
  user: UserState;
  journals: JournalsState;
  licenses: LicensesState;
};
