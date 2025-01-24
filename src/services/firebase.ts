import * as admin from "firebase-admin";
import serviceAccount from "../config/FirebaseServiceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const adminAuth = admin.auth();
