import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPloi1OeoEP1TZc0K21-UYfizEcXK1MqQ",
  authDomain: "stonks-369.firebaseapp.com",
  projectId: "stonks-369",
  storageBucket: "stonks-369.appspot.com",
  messagingSenderId: "705943685805",
  appId: "1:705943685805:web:88e317ee3cd52d39a29424",
  measurementId: "G-YST7HYZ098"
};

firebase.initializeApp(firebaseConfig);

export default firebase;