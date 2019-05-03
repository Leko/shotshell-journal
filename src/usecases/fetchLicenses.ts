import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchLicensesStart,
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

  const snapshot = await app
    .firestore()
    .collection("licenses")
    .where("userId", "==", user.id)
    .get();
  const licenses: Record<string, License> = {};
  snapshot.forEach(docSnapshot => {
    const data: License = docSnapshot.data();
    licenses[docSnapshot.id] = {
      ...data,
      id: docSnapshot.id,
      createdAt: ((data.createdAt as unknown) as firebase.firestore.Timestamp).toDate(),
      startsAt: ((data.startsAt as unknown) as firebase.firestore.Timestamp).toDate()
    };
    if (data.kind === "limited") {
      licenses[
        docSnapshot.id
      ].expiredAt = ((data.expiredAt as unknown) as firebase.firestore.Timestamp).toDate();
    }
  });
  dispatch(fetchLicensesSuccess(licenses));
};
