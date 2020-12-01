import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD1Snj80DNfXJE1VnZ0TQ3lMxHmrupm7fc",
  authDomain: "crwn-db-92b89.firebaseapp.com",
  databaseURL: "https://crwn-db-92b89.firebaseio.com",
  projectId: "crwn-db-92b89",
  storageBucket: "crwn-db-92b89.appspot.com",
  messagingSenderId: "147483944657",
  appId: "1:147483944657:web:fed59709b77c8d0efa87f0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
