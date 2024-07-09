import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCAlotyEn7gzF6kKwFl0eCBn56To_ExPDE",
  authDomain: "fashion-admin-3dbe1.firebaseapp.com",
  projectId: "fashion-admin-3dbe1",
  storageBucket: "fashion-admin-3dbe1.appspot.com",
  messagingSenderId: "185186706788",
  appId: "1:185186706788:web:5903338a3f45b79b63c671",
  measurementId: "G-MY7NTP5D6Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export const login = async (e, p) => {
  await signInWithEmailAndPassword(auth, e, p)
};

export const logout = () => signOut(auth);

export const usersRef = collection(db, "users")