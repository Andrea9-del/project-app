// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider , signInWithPopup , sendPasswordResetEmail , signOut} from 'firebase/auth';
import {getFirestore , query , getDocs , collection , where , addDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfdZjNYgazJKp7BrW1SMmvF7tYH_0ZMs8",
  authDomain: "first-app-9ee16.firebaseapp.com",
  projectId: "first-app-9ee16",
  storageBucket: "first-app-9ee16.appspot.com",
  messagingSenderId: "3700285146",
  appId: "1:3700285146:web:a5c91548a4322706d20fe3"
};
 
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () =>{
  try {
    const res = await signInWithPopup(Auth ,googleProvider);
    const user = res.user;
    const q = query (collection (db ,'users'), where('uid' , '==' , user.uid));
    const docs = await getDocs (q);
    if (docs.docs.length === 0){
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email:user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordReset = async (email) =>{
  try{
    await sendPasswordResetEmail (Auth , email);
    alert ('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert (err.message);
  }
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const Auth = getAuth(app);
export const db = getFirestore(app)