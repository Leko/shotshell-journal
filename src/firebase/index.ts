import * as firebase from "firebase";
import "firebase/firestore";
import credential from "./credential.json";

export const app = firebase.initializeApp(credential);
