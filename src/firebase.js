// this file is just for the firebase configuration

import firebase from "firebase/compat/app";
// import { getAuth, connectWithAuthEmulator, SignInWithEmailAndPassword } from "firebase/compat/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCk3bZnUHzrhs7KhE5AqHwZQh8A-7a02Eo",
  authDomain: "disneyplus-clone-9bfc9.firebaseapp.com",
  projectId: "disneyplus-clone-9bfc9",
  storageBucket: "disneyplus-clone-9bfc9.appspot.com",
  messagingSenderId: "618031468944",
  appId: "1:618031468944:web:0739576dc2f13c64576315",
  measurementId: "G-WW3541RWRV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
