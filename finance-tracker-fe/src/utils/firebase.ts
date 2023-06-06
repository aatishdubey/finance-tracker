import { initializeApp } from 'firebase/app';
import {
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  AuthError,
} from 'firebase/auth';
import config from './config';

const app = initializeApp(config);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.log((error as AuthError).message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    window.location.replace('/login');
  } catch (error) {
    console.error(error);
  }
};
