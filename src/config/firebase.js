// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Uses environment variables in production, falls back to hardcoded values in development
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDFbYswYsz2qVru_Bk_DKcV2eXdwlTcxjI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "wgdk-3b21a.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "wgdk-3b21a",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "wgdk-3b21a.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "149217261386",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:149217261386:web:67f9090937182674edf3b3",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-PLH44WBXT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { analytics };
export default app;
