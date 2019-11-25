import { State } from "../state"

export function isAuthenticating(state: State) {
  return !state.user.resolved
}
