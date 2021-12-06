import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8M-QFS62u8QOo-lnxYfbQkPPDqsCJ1NI",
  authDomain: "pwa-schedule-app-332818.firebaseapp.com",
  projectId: "pwa-schedule-app-332818",
  storageBucket: "pwa-schedule-app-332818.appspot.com",
  messagingSenderId: "751870125635",
  appId: "1:751870125635:web:32b41a18ca170e955f96f6",
};
let firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db, firebaseApp as default };
