import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    const signInWithGmail = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // login using gmail and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = localStorage.getItem("access-token");

            if (token) {
                const dbUserResponse = await fetch(`http://localhost:6001/users/${userCredential.user.email}`, {
                    headers: {
                        method: 'GET',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const dbUserData = await dbUserResponse.json();
                console.log(dbUserData);

                setUser(dbUserData);
            }
            return userCredential;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Handle the error as needed
        }
    };
    

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

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };


    // check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {

                // Fetch or set JWT token for API requests
                const tokenResponse = await fetch('http://localhost:6001/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: currentUser?.email }),
                });
                const tokenData = await tokenResponse.json();

                if (tokenData.token) {
                    localStorage.setItem("access-token", tokenData.token);
                }

            } else {
                localStorage.removeItem("access-token");
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);




    const authInfo = {
        user,
        loading,
        createUser,
        signInWithGmail,
        login,
        logout,
        updateUserProfile,
        resetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider