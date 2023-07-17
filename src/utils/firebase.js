// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeVWpEryuCD-C5Rc6PfnZ45u0zu2jrR3E',
  authDomain: 'postdost-e5e6a.firebaseapp.com',
  projectId: 'postdost-e5e6a',
  storageBucket: 'postdost-e5e6a.appspot.com',
  messagingSenderId: '465684623032',
  appId: '1:465684623032:web:5ba6c893beb538e2960e4d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
