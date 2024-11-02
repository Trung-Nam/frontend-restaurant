import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signup with gmail
    const signUpWithGmail = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // login using gmail and password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout
    const logout = () => {
        return signOut(auth);
    }

    // update profile
    const updateUserProfile = ({name, photoURL}) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    // check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
          });
          return () => {
            return unsubscribe();
          }
    }, [])
    


    const authInfo = {
        user,
        loading,
        createUser,
        signUpWithGmail,
        login,
        logout,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider