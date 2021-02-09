import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC2Q9rtKGvpDR5-kiABKr9EZws36apJ-LU",
    authDomain: "virtual-stock-market-369.firebaseapp.com",
    projectId: "virtual-stock-market-369",
    storageBucket: "virtual-stock-market-369.appspot.com",
    messagingSenderId: "858506793603",
    appId: "1:858506793603:web:80a5b436a3e13af716c1b6"
  };

firebase.initializeApp(firebaseConfig);

 export default firebase;