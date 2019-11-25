import { State } from "../state"

export function getCarryOver(state: State) {
  if (!state.carryOver.resolved) {
    return null
  }
  return state.carryOver.carryOver
}
