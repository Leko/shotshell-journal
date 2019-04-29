import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchLicensesStart,
  fetchLicensesFailed,
  fetchLicensesSuccess
} from "../redux/store/licenses/actions";

export const fetchLicenses = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async dispatch => {
  dispatch(fetchLicensesStart());
  try {
    const licenses = await Promise.resolve({});
    dispatch(fetchLicensesSuccess(licenses));
  } catch (e) {
    dispatch(fetchLicensesFailed(e));
  }
};
