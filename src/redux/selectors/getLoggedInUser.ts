import { State } from "../state"

export function getLoggedInUser(state: State) {
  return state.user.rawUser ? state.user.rawUser.user : null
}
