import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBXJ0E4HQRyYQB7AJDHYUS3v08TMVzUdSg",
  authDomain: "esta-admin.firebaseapp.com",
  projectId: "esta-admin",
  storageBucket: "esta-admin.appspot.com",
  messagingSenderId: "34767468512",
  appId: "1:34767468512:web:f995bfa261707521821d85"
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