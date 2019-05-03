import { State } from "./state";
import { Action } from "./actions";
import {
  SET_JOURNAL,
  REMOVE_JOURNAL,
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
    case SET_JOURNAL:
      return {
        ...state,
        journals: {
          ...state.journals,
          [action.journal.id]: action.journal
        }
      };
    case REMOVE_JOURNAL: {
      const { [action.id]: removed, ...others } = state.journals;
      return {
        ...state,
        journals: others
      };
    }
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
