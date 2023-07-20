import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "@firebase/firestore"

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyDiouCBMCQuexgKbm0ft8Z1pfxnLaRmdFY",
  authDomain: "start-up-3c286.firebaseapp.com",
  databaseURL: "https://start-up-3c286-default-rtdb.firebaseio.com",
  projectId: "start-up-3c286",
  storageBucket: "start-up-3c286.appspot.com",
  messagingSenderId: "840390492964",
  appId: "1:840390492964:web:d5aabbe1dd24157325e9b1"
};
export const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
export const db=getFirestore(app)