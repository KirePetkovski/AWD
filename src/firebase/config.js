import firebase from 'firebase';
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpEpisYjRBloz4HqqwqFAwFFWKOG3Xy6A",
    authDomain: "first-vueapp-test.firebaseapp.com",
    projectId: "first-vueapp-test",
    storageBucket: "first-vueapp-test.appspot.com",
    messagingSenderId: "272427356588",
    appId: "1:272427356588:web:b7551a896a10db313eea09",
    measurementId: "G-VBZC121LJW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
