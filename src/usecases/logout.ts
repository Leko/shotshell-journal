import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import * as Google from "expo-google-app-auth"
import { State } from "../redux/state"
import { setUser } from "../redux/store/user/actions"
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser"

// https://blog.expo.io/google-sign-in-with-react-native-and-expo-9cac6c392f0e
const clientId =
  "630184827238-m48qduo03al4pr8j7207m2n8a9jbndb6.apps.googleusercontent.com"

export const logout = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async (dispatch, getState) => {
  if (!getLoggedInUser(getState())) {
    return
  }
  const { accessToken } = getState().user.rawUser!
  try {
    await Google.logOutAsync({ accessToken, clientId })
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    dispatch(setUser(null))
  }
}
