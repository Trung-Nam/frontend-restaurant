import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"
import axios from 'axios';

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
    const signInWithGmail = () => {
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
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    // check signed-in user
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            if(currentUser){
                const userInfo ={email: currentUser.email}
                axios.post('http://localhost:6001/jwt', userInfo)
                  .then( (response) => {
                    // console.log(response.data.token);
                    if(response.data.token){
                        localStorage.setItem("access-token", response.data.token)
                    }
                  })
            } else{
               localStorage.removeItem("access-token")
            }
           
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])
    


    const authInfo = {
        user,
        loading,
        createUser,
        signInWithGmail,
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