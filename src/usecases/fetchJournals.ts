import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchJournalsStart,
  fetchJournalsFailed,
  fetchJournalsSuccess
} from "../redux/store/journals/actions";
import { app } from "../firebase";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { Journal } from "../models/Journal";

export const fetchJournals = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async (dispatch, getState) => {
  dispatch(fetchJournalsStart());

  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  try {
    const snapshot = await app
      .firestore()
      .collection("journals")
      .where("userId", "==", user.id)
      .get();
    const journals: Record<string, Journal> = {};
    snapshot.forEach(docSnapshot => {
      journals[docSnapshot.id] = docSnapshot.data() as Journal;
    });
    dispatch(fetchJournalsSuccess(journals));
  } catch (e) {
    dispatch(fetchJournalsFailed(e));
  }
};
