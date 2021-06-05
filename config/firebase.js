import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBln90SvTC21FHwm8e1FaSJmxr2wc7BeWs",
    authDomain: "spotify-976db.firebaseapp.com",
    databaseURL: "https://spotify-976db.firebaseio.com",
    projectId: "spotify-976db",
    storageBucket: "spotify-976db.appspot.com",
    messagingSenderId: "666324277607",
    appId: "1:666324277607:web:1d0e3746ab1e029b50b7c2"
  };

  firebase.initializeApp(firebaseConfig)
 
  export default firebase