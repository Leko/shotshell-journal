import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Google } from "expo";
import { State } from "../redux/state";
import { setUser } from "../redux/store/user/actions";

// https://blog.expo.io/google-sign-in-with-react-native-and-expo-9cac6c392f0e
const clientId =
  "630184827238-m48qduo03al4pr8j7207m2n8a9jbndb6.apps.googleusercontent.com";

export const loginWithGoogle = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async dispatch => {
  const config = {
    androidClientId: clientId,
    iosClientId: clientId,
    scopes: ["profile"]
  };
  try {
    const result = await Google.logInAsync(config);
    if (result.type === "cancel") {
      return;
    }
    dispatch(setUser(result));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
