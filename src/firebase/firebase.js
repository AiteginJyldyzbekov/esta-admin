import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCMzzgwkcEXF6WhvYZE0_5eszWn2T7ywk0",
  authDomain: "solid-devs.firebaseapp.com",
  projectId: "solid-devs",
  storageBucket: "solid-devs.appspot.com",
  messagingSenderId: "927044977766",
  appId: "1:927044977766:web:bcfe3d999c8aca0b7399a7",
  measurementId: "G-PT47ZEP0XF"
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