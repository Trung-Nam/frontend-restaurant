import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from 'react-toastify';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //  Fetch and store JWT token
    const fetchToken = async (email) => {
        try {
            const response = await fetch('https://backend-restaurant-b5d2.onrender.com/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("access-token", data.token);
                return data.token;
            }
            throw new Error("Failed to fetch token");
        } catch (error) {
            console.error('Error fetching token:', error);
            return null;
        }
    };

    //  Fetch user data from the database
    const fetchUserData = async (email, token) => {
        try {
            const response = await fetch(`https://backend-restaurant-b5d2.onrender.com/users/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    // Create a new account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await fetchToken(userCredential.user.email);
            if (token) {
                const userData = await fetchUserData(userCredential.user.email, token);
                setUser(userData);
            } else {
                logoutUser();
            }
            return userCredential;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    // Sign in with Google
    const signInWithGmail = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const token = await fetchToken(userCredential.user.email);
            if (token) {
                const userData = await fetchUserData(userCredential.user.email, token);
                setUser(userData);
            } else {
                logoutUser();
            }
            return userCredential;
        } catch (error) {
            console.error('Error logging in with Google:', error);
            throw error;
        }
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem("access-token");
        setUser(null);
    };

    const logout = async () => {
        const result = await signOut(auth);
        return logoutUser(result);
    };

    // Update user profile
    const updateUserProfile = async (user, data) => {
        try {
            const token = await fetchToken(user?.email);
            if (token) {
                const response = await fetch(`https://backend-restaurant-b5d2.onrender.com/users/${user?._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error("Failed to update user profile");
                }

                const result = await response.json();

                return result;
            }

        } catch (error) {
            toast.error("Update information failed");
            console.error(error); // Use a console for debugging
        }
    };


    // Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const token = await fetchToken(currentUser.email);
                if (token) {
                    const userData = await fetchUserData(currentUser.email, token);
                    setUser(userData);
                }
            } else {
                logoutUser();
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Auth context value
    const authInfo = {
        user,
        loading,
        createUser,
        login,
        signInWithGmail,
        logout,
        updateUserProfile,
        resetPassword,
        setUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
