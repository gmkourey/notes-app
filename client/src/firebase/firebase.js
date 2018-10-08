import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const prodConfig = {
//     apiKey: YOUR_API_KEY,
//     authDomain: YOUR_AUTH_DOMAIN,
//     databaseURL: YOUR_DATABASE_URL,
//     projectId: YOUR_PROJECT_ID,
//     storageBucket: '',
//     messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  };
  
  const devConfig = {
    apiKey: "AIzaSyCBMBQDk44o7BFspQVxjEPfc5uVo2fw4m0",
    authDomain: "note-app-ucberk.firebaseapp.com",
    databaseURL: "https://note-app-ucberk.firebaseio.com",
    projectId: "note-app-ucberk",
    storageBucket: "note-app-ucberk.appspot.com",
    messagingSenderId: "888209507310"}

{  const config = process.env.NODE_ENV === 'production'
      ? prodConfig
      : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


}

const db = firebase.database();
const auth = firebase.auth();
export {
  db,
  auth,
  firebase,
};