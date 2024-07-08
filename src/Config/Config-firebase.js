// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//for email and password authentication
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAB5n1CkfH6Y4y6ACQCx9TRD_ZyEp0LFXA',
  authDomain: 'eshop-5055f.firebaseapp.com',
  projectId: 'eshop-5055f',
  storageBucket: 'eshop-5055f.appspot.com',
  messagingSenderId: '330260111333',
  appId: '1:330260111333:web:0144da00f5b1d7e47ad90c',
  measurementId: 'G-V8FVD6M2EF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const GoogleAuthenticator = new GoogleAuthProvider();

export const fireDatabase = getFirestore(app);
export const storage = getStorage(app);
