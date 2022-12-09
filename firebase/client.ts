// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { user } from "../interfaces/user";
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { IPurchase } from "../interfaces/utilsRobert";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCYeik8ULptOL04rzxUCb16syA0XIigGg",
  authDomain: "app-web-multiusos.firebaseapp.com",
  projectId: "app-web-multiusos",
  storageBucket: "app-web-multiusos.appspot.com",
  messagingSenderId: "876788949920",
  appId: "1:876788949920:web:9a42b51ee6753b471cfac5",
  measurementId: "G-YKTTHL1TFK",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore();

export const onAuthStateChangedToUser = (onChange: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const usserLogged: user = {
        userName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      console.log(user);
      onChange(usserLogged);
    }
  });
};
export const LoginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const userLogged: user = {
    userName: res.user.displayName,
    email: res.user.email,
    avatar: res.user.photoURL,
  };
  return userLogged;
};

export const addDataPurchase = async (newPurchase: IPurchase) => {
  try {
    const docRef = await addDoc(
      collection(db, "purchaseBusiness"),
      newPurchase
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateDataPurchase = async (updatePurchase: IPurchase) => {
  try {
    const docRef = await setDoc(
      doc(db, "purchaseBusiness", "c8G9F22eAQM022UVr1jd"),updatePurchase
    );
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// const analytics = getAnalytics(app);
