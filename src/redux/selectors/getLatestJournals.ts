import { State } from "../state";

export function getLatestJournals(state: State) {
  return Object.values(state.journals.journals).sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}
