// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXm_sfW4tYNw_X2IAkST5GV_Av7a7Lejg",
  authDomain: "todoclass-e9ef2.firebaseapp.com",
  projectId: "todoclass-e9ef2",
  storageBucket: "todoclass-e9ef2.appspot.com",
  messagingSenderId: "12959370635",
  appId: "1:12959370635:web:5011b0ec113e344205338e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);