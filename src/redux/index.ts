import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers,
} from "redux"
import thunk from "redux-thunk"
import { reducer as user } from "./store/user"
import { reducer as journals } from "./store/journals"
import { reducer as licenses } from "./store/licenses"
import { reducer as carryOver } from "./store/carryOver"
import { reducer as examines } from "./store/examines"
import { firebaseAuth } from "./middleware/firebase-auth"
import { app } from "../firebase"
import { State } from "./state"

export function createStore() {
  const rootReducer = combineReducers({
    user,
    journals,
    licenses,
    carryOver,
    examines,
  })
  return createReduxStore<State, any, {}, {}>(
    rootReducer,
    applyMiddleware(firebaseAuth(app), thunk)
  )
}
