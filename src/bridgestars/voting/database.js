//DATABASE
import { firebaseApp } from 'firebase-config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getFirestore,
  query,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
