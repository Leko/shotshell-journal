import { State } from "./state"
import { Action } from "./actions"
import {
  SET_CARRY_OVER,
  FETCH_CARRY_OVERS_STARTED,
  FETCH_CARRY_OVERS_FAILED,
} from "./types"

const initialState: State = {
  resolved: false,
  carryOver: null,
  error: null,
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_CARRY_OVER:
      return {
        error: null,
        resolved: true,
        carryOver: action.carryOver,
      }
    case FETCH_CARRY_OVERS_STARTED:
      return { ...state, resolved: true, error: null }
    case FETCH_CARRY_OVERS_FAILED:
      return { ...state, resolved: true, error: action.error, carryOver: null }
    default:
      return state
  }
}
