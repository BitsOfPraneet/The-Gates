// IMPORTANT: Replace this with your own Firebase project configuration object from the Firebase console.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1T-WltsAW36jJiquL9kRmowo4YKVL4ug",
  authDomain: "cryptic-auth.firebaseapp.com",
  projectId: "cryptic-auth",
  storageBucket: "cryptic-auth.firebasestorage.app",
  messagingSenderId: "955130363903",
  appId: "1:955130363903:web:8a9a46fa9fcb2fe316f1ca",
  measurementId: "G-3JKNPQ7RZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;