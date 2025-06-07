import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBMvA_ECCLR9dwqoQBAHsGGNHMkO2sTn4E",
    authDomain: "projectsirjulius.firebaseapp.com",
    projectId: "projectsirjulius",
    storageBucket: "projectsirjulius.firebasestorage.app",
    messagingSenderId: "913681724149",
    appId: "1:913681724149:web:d4d1de89acecc509240bbc",
    measurementId: "G-CTPDLWK1F6"
  };

  const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

const analytics = getAnalytics(app);
export { auth, db, analytics };
