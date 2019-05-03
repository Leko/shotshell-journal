import maxBy from "lodash/maxBy";
import { State } from "../state";

export function getLatestExamine(state: State) {
  return maxBy(
    Object.values(state.examines.examines),
    examine => -examine.examinedAt.getTime()
  );
}
