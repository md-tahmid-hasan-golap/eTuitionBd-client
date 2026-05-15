// FirebaseAuthProvider.jsx
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.init";
import { AuthContext } from "./AuthContext";
import axios from "axios";
const provider = new GoogleAuthProvider();

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2️⃣ Sign in with email & password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3️⃣ Sign in with Google
  const signInWithGoogle = () => signInWithPopup(auth, provider);

  // 4️⃣ Sign out
  const signOutUser = () => signOut(auth);

  // 5️⃣ Update user profile (name, photo)
  const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Get token and store in localStorage
        const userInfo = { email: currentUser.email };
        try {
          const apiURL = import.meta.env.VITE_API_URL;
          const cleanURL = apiURL?.endsWith('/') ? apiURL.slice(0, -1) : apiURL;
          const res = await axios.post(`${cleanURL}/api/jwt`, userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            console.log("JWT Token updated successfully");
          }
        } catch (err) {
          console.error("JWT Fetch Error:", err.response?.data || err.message);
        }
      } else {
        // Remove token from localStorage
        localStorage.removeItem("access-token");
        console.log("User logged out, token removed");
      }
      
      setLoading(false);
      console.log("Current User:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default FirebaseAuthProvider;
