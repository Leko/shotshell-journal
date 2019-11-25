import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { State } from "../redux/state"
import { Journal } from "../models/Journal"
import { removeJournal as removeJournalLocal } from "../redux/store/journals/actions"
import { app } from "../firebase"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"

export const removeJournal = (
  journal: Journal
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const user = getLoggedInUser(getState())
  if (!user) {
    return
  }

  await app
    .firestore()
    .collection("journals")
    .doc(journal.id)
    .delete()

  dispatch(removeJournalLocal(journal.id))
}
