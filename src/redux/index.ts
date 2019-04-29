import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers,
  AnyAction
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as user } from "./store/user";
import { reducer as journals } from "./store/journals";
import { reducer as licenses } from "./store/licenses";
import { firebaseAuth } from "./middleware/firebase-auth";
import { app } from "../firebase";
import { State } from "./state";

export function createStore() {
  const rootReducer = combineReducers({
    user,
    journals,
    licenses
  });
  return createReduxStore<State, any, {}, {}>(
    rootReducer,
    applyMiddleware(firebaseAuth(app), thunk)
  );
}
