import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchLicensesStart,
  fetchLicensesFailed,
  fetchLicensesSuccess
} from "../redux/store/licenses/actions";
import { app } from "../firebase";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { License } from "../models/License";

export const fetchLicenses = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async (dispatch, getState) => {
  dispatch(fetchLicensesStart());

  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  try {
    const snapshot = await app
      .firestore()
      .collection("licenses")
      .where("userId", "==", user.id)
      .get();
    const licenses: Record<string, License> = {};
    snapshot.forEach(docSnapshot => {
      licenses[docSnapshot.id] = {
        ...(docSnapshot.data() as License),
        id: docSnapshot.id
      };
    });
    dispatch(fetchLicensesSuccess(licenses));
  } catch (e) {
    dispatch(fetchLicensesFailed(e));
  }
};
