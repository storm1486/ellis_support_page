import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZNO8QSos8bPxeqWyB4X1RcC8glPsJJrU",
  authDomain: "ellis-test-support.firebaseapp.com",
  projectId: "ellis-test-support",
  storageBucket: "ellis-test-support.appspot.com",
  messagingSenderId: "983792357259",
  appId: "1:983792357259:web:03c76b59563e4d8344a98e",
  measurementId: "G-H8HSLQQDGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
