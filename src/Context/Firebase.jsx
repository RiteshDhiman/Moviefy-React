import { createContext, useContext } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from  'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
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