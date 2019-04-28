import * as firebase from "firebase";
import credential from "./credential.json";

export const app = firebase.initializeApp(credential);
