import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";

export const addLicense = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async dispatch => {};
