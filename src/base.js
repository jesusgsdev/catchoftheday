import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCKprueGVW0HWXfW-G44d_-0th3j2mWUrE",
        authDomain: "catch-the-fish-9cb31.firebaseapp.com",
        databaseURL: "https://catch-the-fish-9cb31.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp }

//This is a default export
export default base;