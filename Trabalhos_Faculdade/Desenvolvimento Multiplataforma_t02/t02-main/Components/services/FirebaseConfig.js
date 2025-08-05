import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlF5tWCsW-LOvBSitjng78_ECcLDxIqaU",
  authDomain: "dw-todolist-52938.firebaseapp.com",
  projectId: "dw-todolist-52938",
  storageBucket: "dw-todolist-52938.appspot.com",
  messagingSenderId: "947634049892",
  appId: "1:947634049892:web:baa5cc9b132ae3d6c7a071"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db = getFirestore(app);