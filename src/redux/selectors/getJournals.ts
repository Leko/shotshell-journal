import { State } from "../state";

export function getJournals(state: State) {
  return Object.values(state.journals.journals);
}
