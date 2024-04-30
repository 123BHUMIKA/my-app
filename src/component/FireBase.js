import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCMdeUAEs_ocjdurDIyI_Obo6Mx6-DCRfk",
  authDomain: "fir-ec38e.firebaseapp.com",
  projectId: "fir-ec38e",
  storageBucket: "fir-ec38e.appspot.com",
  messagingSenderId: "515073212683",
  appId: "1:515073212683:web:52bdc9874e1377c0ae220e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
export default app;