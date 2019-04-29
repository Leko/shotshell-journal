import { State } from "../state";

export function getLicenses(state: State) {
  return Object.values(state.licenses.licenses);
}
