import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAfUHE5Hs8mSENXylKx1L9VrqrKE6MvdQ4",
    authDomain: "pizzify-c3cec.firebaseapp.com",
    projectId: "pizzify-c3cec",
    storageBucket: "pizzify-c3cec.firebasestorage.app",
    messagingSenderId: "917307625044",
    appId: "1:917307625044:web:0e0f6c122ce37d5ca427c1",
    measurementId: "G-074PM0RRGN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
