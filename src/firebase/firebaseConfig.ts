import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTcvyxiSXCYoRzxH0vZ2Kzkom9nsEouuA",
  authDomain: "management-11e3d.firebaseapp.com",
  projectId: "management-11e3d",
  storageBucket: "management-11e3d.appspot.com",
  messagingSenderId: "51809482312",
  appId: "1:51809482312:web:5cc84bb51748438e7d4a7d"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore()

export {app, auth, storage, db}