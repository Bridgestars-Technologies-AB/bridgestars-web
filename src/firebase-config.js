// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGlMTrGCUD4bvnlmHH_Ih6atMTKloQBHc',
  authDomain: 'bridge-fcee8.firebaseapp.com',
  databaseURL: 'https://bridge-fcee8-default-rtdb.firebaseio.com',
  projectId: 'bridge-fcee8',
  storageBucket: 'bridge-fcee8.appspot.com',
  messagingSenderId: '1037326697643',
  appId: '1:1037326697643:web:b1ff2576df9a12ce1923ee',
  measurementId: 'G-B3W21KHLQD',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const sendPasswordResetEmailLink =
  'https://us-central1-bridge-fcee8.cloudfunctions.net/sendPasswordResetEmail?apiKey=' +
  firebaseConfig.apiKey +
  '&';
