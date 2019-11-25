import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import * as Google from "expo-google-app-auth"
import * as firebase from "firebase"
import { State } from "../redux/state"
import { setUser } from "../redux/store/user/actions"
import { app } from "../firebase"

// https://blog.expo.io/google-sign-in-with-react-native-and-expo-9cac6c392f0e
const clientId =
  "630184827238-m48qduo03al4pr8j7207m2n8a9jbndb6.apps.googleusercontent.com"

export const loginWithGoogle = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async dispatch => {
  const config = {
    clientId: clientId,
    scopes: ["profile"],
  }
  try {
    const result = await Google.logInAsync(config)
    if (result.type === "cancel") {
      return
    }

    // https://firebase.google.com/docs/auth/web/google-signin
    const credential = firebase.auth.GoogleAuthProvider.credential(
      result.idToken
    )
    await app.auth().signInWithCredential(credential)

    dispatch(setUser(result))
  } catch (e) {
    console.error(e)
    throw e
  }
}
