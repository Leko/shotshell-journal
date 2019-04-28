import { State } from "./state";
import { Action } from "./actions";
import { SET_USER } from "./types";

const initialState: State = {
  rawUser: null
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, rawUser: action.user };
    default:
      return state;
  }
}
