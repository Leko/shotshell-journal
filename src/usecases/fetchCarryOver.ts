import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { State } from "../redux/state"
import {
  fetchCarryOversStart,
  setCarryOver,
} from "../redux/store/carryOver/actions"
import { app } from "../firebase"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"
import { CarryOver } from "../models/CarryOver"

export const fetchCarryOver = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async (dispatch, getState) => {
  dispatch(fetchCarryOversStart())

  const user = getLoggedInUser(getState())
  if (!user) {
    return
  }

  const snapshot = await app
    .firestore()
    .collection("carryOvers")
    .doc(user.id)
    .get()

  const data = snapshot.data()! as CarryOver
  const carryOver: CarryOver = {
    ...data,
    id: user.id!,
    createdAt: ((data.createdAt as unknown) as firebase.firestore.Timestamp).toDate(),
  }
  dispatch(setCarryOver(carryOver))
}
