import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import { UnsavedJournal } from "../models/Journal";
import { addJournal } from "../redux/store/journals/actions";
import { app } from "../firebase";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

export const setJournal = (
  id: string,
  journal: UnsavedJournal
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  await app
    .firestore()
    .collection("journals")
    .doc(id)
    .set(journal);

  dispatch(addJournal({ id, ...journal }));
};
