import { createContext, useContext } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from  'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

const firebaseApp = initializeApp(firebaseConfig)
const firebaseauth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({children}) => {

    const signupwithemailandpassword = (email,password) => {
        createUserWithEmailAndPassword(firebaseauth, email, password)
    }

    const googlesignup = () => {
        signInWithPopup(firebaseauth, googleProvider)
    }

    const signinwithemailandpassword = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(firebaseauth, email, password);
          return userCredential;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      

    return(
        <FirebaseContext.Provider value={{signupwithemailandpassword, googlesignup, signinwithemailandpassword}}>
            {children}
        </FirebaseContext.Provider>
    )
}