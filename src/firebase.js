// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import  { getAuth } from "firebase/auth";
// SDK for google realtime database
import  { getDatabase } from "firebase/database";

// SDK for google cloud platform storage
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQjXgmL7F1zeFGRZcMpnY51joPBbh9ecM",
  authDomain: "juvenils-4ab5f.firebaseapp.com",
  databaseURL: "https://juvenils-4ab5f-default-rtdb.firebaseio.com",
  projectId: "juvenils-4ab5f",
  storageBucket: "juvenils-4ab5f.appspot.com",
  messagingSenderId: "348698741970",
  appId: "1:348698741970:web:39a242a243f7cafcb7310b",
  measurementId: "G-WH14SWPB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and get reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app); 

// provide ref and uploadBytes
export {ref as storageRef, uploadBytes, getDownloadURL, deleteObject};

const analytics = getAnalytics(app);