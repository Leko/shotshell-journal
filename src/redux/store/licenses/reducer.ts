import { State } from "./state";
import { Action } from "./actions";
import {
  ADD_LICENSE,
  FETCH_LICENSES_STARTED,
  FETCH_LICENSES_SUCCEED,
  FETCH_LICENSES_FAILED
} from "./types";

const initialState: State = {
  licenses: {},
  error: null
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_LICENSE:
      return {
        ...state,
        licenses: {
          ...state.licenses,
          [action.license.id]: action.license
        }
      };
    case FETCH_LICENSES_STARTED:
      return { ...state, error: null, licenses: {} };
    case FETCH_LICENSES_SUCCEED:
      return { ...state, error: null, licenses: action.licenses };
    case FETCH_LICENSES_FAILED:
      return { ...state, error: action.error, licenses: {} };
    default:
      return state;
  }
}
