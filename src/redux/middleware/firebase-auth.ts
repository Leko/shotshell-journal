import { Middleware, Dispatch, AnyAction } from "redux";
import { SecureStore } from "expo";
import { State } from "../state";
import { SET_USER } from "../store/user/types";
import { setUser } from "../store/user/actions";
import * as firebase from "firebase";

const storageKey = "ShellShotJournal-GoogleOAuthKey";

export const firebaseAuth = (
  firebaseApp: firebase.app.App
): Middleware<{}, State, Dispatch<AnyAction>> => store => {
  SecureStore.getItemAsync(storageKey).then(res => {
    if (res) {
      const user = JSON.parse(res);
      // https://firebase.google.com/docs/auth/web/google-signin
      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.idToken
      );
      store.dispatch(setUser(user));
      firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);
    }
  });

  return next => action => {
    if (action.type === SET_USER) {
      SecureStore.setItemAsync(storageKey, JSON.stringify(action.user));
    }
    return next(action);
  };
};
