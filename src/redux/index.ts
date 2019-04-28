import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { reducer as user } from "./store/user";
import { firebaseAuth } from "./middleware/firebase-auth";
import { app } from "../firebase";

export function createStore() {
  const rootReducer = combineReducers({
    user
  });
  return createReduxStore(
    rootReducer,
    applyMiddleware(firebaseAuth(app), thunk)
  );
}
