import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import { UnsavedLicense } from "../models/License";
import { addLicense as addLicenseLocal } from "../redux/store/licenses/actions";
import { app } from "../firebase";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

export const addLicense = (
  license: UnsavedLicense
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  const licenseWithUser = {
    ...license,
    userId: user.id,
    createdAt: new Date()
  };
  const ref = await app
    .firestore()
    .collection("licenses")
    .add(licenseWithUser);

  dispatch(
    addLicenseLocal({
      ...licenseWithUser,
      id: ref.id
    })
  );
};
