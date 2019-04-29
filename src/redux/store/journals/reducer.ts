import { State } from "./state";
import { Action } from "./actions";
import {
  ADD_JOURNAL,
  FETCH_JOURNALS_STARTED,
  FETCH_JOURNALS_SUCCEED,
  FETCH_JOURNALS_FAILED
} from "./types";

const initialState: State = {
  journals: {},
  error: null
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_JOURNAL:
      return {
        ...state,
        journals: {
          ...state.journals,
          [action.journal.id]: action.journal
        }
      };
    case FETCH_JOURNALS_STARTED:
      return { ...state, error: null, journals: {} };
    case FETCH_JOURNALS_SUCCEED:
      return { ...state, error: null, journals: action.journals };
    case FETCH_JOURNALS_FAILED:
      return { ...state, error: action.error, journals: {} };
    default:
      return state;
  }
}
