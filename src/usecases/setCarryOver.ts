import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { State } from "../redux/state"
import { UnsavedCarryOver } from "../models/CarryOver"
import { setCarryOver as setCarryOverLocal } from "../redux/store/carryOver/actions"
import { app } from "../firebase"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"

export const setCarryOver = (
  carryOver: UnsavedCarryOver
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
    const user = getLoggedInUser(getState())
    if (!user) {
      return
    }

    const carryOverWithUser = {
      ...carryOver,
      userId: user.id!,
      createdAt: new Date(),
    }

    await app
      .firestore()
      .collection("carryOvers")
      .doc(user.id)
      .set(carryOverWithUser)

    dispatch(
      setCarryOverLocal({
        ...carryOverWithUser,
        id: user.id!,
      })
    )
  }
