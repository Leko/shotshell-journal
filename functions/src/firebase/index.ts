import admin, { ServiceAccount } from "firebase-admin";
import adminCredential from "./admin-credential.json";

admin.initializeApp({
  credential: admin.credential.cert(adminCredential as ServiceAccount),
  databaseURL: "https://shellshot-journal.firebaseio.com"
});

export { admin };
