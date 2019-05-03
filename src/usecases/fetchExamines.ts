import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchExaminesStart,
  fetchExaminesSuccess
} from "../redux/store/examines/actions";
import { app } from "../firebase";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { Examine } from "../models/Examine";

export const fetchExamines = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async (dispatch, getState) => {
  dispatch(fetchExaminesStart());

  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  const snapshot = await app
    .firestore()
    .collection("examines")
    .where("userId", "==", user.id)
    .get();
  const examines: Record<string, Examine> = {};
  snapshot.forEach(docSnapshot => {
    const data: Examine = docSnapshot.data();
    examines[docSnapshot.id] = {
      ...data,
      id: docSnapshot.id,
      createdAt: ((data.createdAt as unknown) as firebase.firestore.Timestamp).toDate(),
      examinedAt: ((data.examinedAt as unknown) as firebase.firestore.Timestamp).toDate()
    };
  });
  dispatch(fetchExaminesSuccess(examines));
};
