import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHe9AoBuy54QpzvaGO4K9c16EdGS9q2g4",
  authDomain: "trabalhofinalmobile-49f44.firebaseapp.com",
  projectId: "trabalhofinalmobile-49f44",
  storageBucket: "trabalhofinalmobile-49f44.firebasestorage.app",
  messagingSenderId: "131644742877",
  appId: "1:131644742877:web:bfba678e0373885d5e4f34",
  measurementId: "G-4805FRYZVW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);