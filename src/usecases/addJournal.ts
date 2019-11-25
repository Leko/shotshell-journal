import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { State } from "../redux/state"
import { UnsavedJournal } from "../models/Journal"
import { addJournal as addJournalLocal } from "../redux/store/journals/actions"
import { app } from "../firebase"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"

export const addJournal = (
  journal: UnsavedJournal
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
    const user = getLoggedInUser(getState())
    if (!user) {
      return
    }

    const journalWithUser = {
      ...journal,
      userId: user.id!,
      createdAt: new Date(),
    }
    const ref = await app
      .firestore()
      .collection("journals")
      .add(journalWithUser)

    dispatch(
      // @ts-ignore
      addJournalLocal({
        ...journalWithUser,
        id: ref.id,
      })
    )
  }
