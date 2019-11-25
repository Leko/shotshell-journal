import { State as UserState } from "./store/user"
import { State as JournalsState } from "./store/journals"
import { State as LicensesState } from "./store/licenses"
import { State as CarryOverState } from "./store/carryOver"
import { State as ExaminesState } from "./store/examines"

export type State = {
  user: UserState
  journals: JournalsState
  licenses: LicensesState
  carryOver: CarryOverState
  examines: ExaminesState
}
