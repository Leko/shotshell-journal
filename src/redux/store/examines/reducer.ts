import { State } from "./state";
import { Action } from "./actions";
import {
  ADD_EXAMINE,
  FETCH_EXAMINES_STARTED,
  FETCH_EXAMINES_SUCCEED,
  FETCH_EXAMINES_FAILED
} from "./types";

const initialState: State = {
  examines: {},
  error: null
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_EXAMINE:
      return {
        ...state,
        examines: {
          ...state.examines,
          [action.examine.id]: action.examine
        }
      };
    case FETCH_EXAMINES_STARTED:
      return { ...state, error: null, examines: {} };
    case FETCH_EXAMINES_SUCCEED:
      return { ...state, error: null, examines: action.examines };
    case FETCH_EXAMINES_FAILED:
      return { ...state, error: action.error, examines: {} };
    default:
      return state;
  }
}
