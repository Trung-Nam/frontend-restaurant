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

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };


    // check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true); // Set loading to true while fetching data
            if (currentUser) {
                const userInfo = { email: currentUser.email };

                // Fetch or set JWT token for API requests
                const tokenResponse = await fetch('http://localhost:6001/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userInfo),
                });
                const tokenData = await tokenResponse.json();

                if (tokenData.token) {
                    localStorage.setItem("access-token", tokenData.token);
                }

                // Use the token to authenticate and fetch user data from your database
                const dbUserResponse = await fetch(`http://localhost:6001/users/admin/${currentUser.email}`, {
                    headers: {
                        method: 'GET',
                        'Authorization': `Bearer ${tokenData.token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const dbUserData = await dbUserResponse.json();

                // Combine Firebase and database user data
                const combinedUserData = {
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    email: currentUser.email,
                    role: dbUserData.admin === true ? 'admin' : 'user'
                };
                // console.log(currentUser);

                // console.log(combinedUserData);

                setUser(combinedUserData);
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