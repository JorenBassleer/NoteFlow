import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBjQgks4IrKyPqxw0nMu9nPJ0qvQxtsMOM',
  authDomain: 'noteflow-403218.firebaseapp.com',
  projectId: 'noteflow-403218',
  storageBucket: 'noteflow-403218.appspot.com',
  messagingSenderId: '456260287241',
  appId: '1:456260287241:web:a514054ecf5844066831d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
};
