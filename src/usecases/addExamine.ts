import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { State } from "../redux/state"
import { UnsavedExamine } from "../models/Examine"
import { addExamine as addExamineLocal } from "../redux/store/examines/actions"
import { app } from "../firebase"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"

export const addExamine = (
  examine: UnsavedExamine
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const user = getLoggedInUser(getState())
  if (!user) {
    return
  }

  const examineWithUser = {
    ...examine,
    userId: user.id,
    createdAt: new Date(),
  }

  const ref = await app
    .firestore()
    .collection("examines")
    .add(examineWithUser)

  dispatch(
    addExamineLocal({
      ...examineWithUser,
      id: ref.id,
    })
  )
}
