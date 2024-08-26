import { createContext, useContext } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from  'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBK-05VJ7VhnXoXc-muGV3YyWaCAfBRtMc",
    authDomain: "moviefy-db656.firebaseapp.com",
    projectId: "moviefy-db656",
    storageBucket: "moviefy-db656.appspot.com",
    messagingSenderId: "535260592677",
    appId: "1:535260592677:web:dd7ec9e96cd503ed165dcc",
    measurementId: "G-20LPHFCN6N"
  };

const firebaseApp = initializeApp(firebaseConfig)
const firebaseauth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({children}) => {

  const signupwithemailandpassword = async (email, password) => {
    return await createUserWithEmailAndPassword(firebaseauth, email, password);
  };

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