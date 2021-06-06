import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  };

  firebase.initializeApp(firebaseConfig)
 
  export default firebase
