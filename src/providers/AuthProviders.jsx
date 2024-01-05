import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import app from "../firebase/firebase.config";
import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }




    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);

                if (currentUser) {
                    const userInfo = { email: currentUser.email };
                    try {
                        const res = await axiosPublic.post('/jwt', userInfo);
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error('Error fetching token:', error);
                    }
                } else {
                    localStorage.removeItem('access-token');
                    setLoading(false);
                }

                console.log('Current User:', currentUser);
            });

            return () => {
                return unsubscribe();
            };
        };

        fetchData();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;