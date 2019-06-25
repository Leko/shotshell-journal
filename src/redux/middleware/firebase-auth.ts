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
    const user = res ? JSON.parse(res) : null;
    if (!user) {
      store.dispatch(setUser(null));
      return;
    }
    // https://firebase.google.com/docs/auth/web/google-signin
    const credential = firebase.auth.GoogleAuthProvider.credential(
      user.idToken
    );
    firebaseApp
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(() => {
        store.dispatch(setUser(user));
      })
      .catch(() => {
        store.dispatch(setUser(null));
      });
  });

  return next => action => {
    if (action.type === SET_USER) {
      if (action.user) {
        SecureStore.setItemAsync(storageKey, JSON.stringify(action.user));
      } else {
        SecureStore.deleteItemAsync(storageKey);
        firebaseApp.auth().signOut();
      }
    }
    return next(action);
  };
};
