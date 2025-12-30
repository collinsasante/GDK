import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in with Firebase
                const userData = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    role: 'user', // Default role
                    photoURL: firebaseUser.photoURL,
                    provider: firebaseUser.providerData[0]?.providerId || 'password'
                };

                // Check if user is admin (stored in localStorage)
                const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
                if (adminUsers.includes(firebaseUser.uid)) {
                    userData.role = 'admin';
                }

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                // Check for legacy localStorage auth
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (error) {
                        console.error('Error parsing stored user:', error);
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Firebase Email/Password Login
    const loginWithFirebase = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        } catch (error) {
            let errorMessage = 'Login failed';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password';
            }
            return { success: false, error: errorMessage };
        }
    };

    // Firebase Google Sign-In
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return { success: true, user: result.user };
        } catch (error) {
            let errorMessage = 'Google sign-in failed';
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in cancelled';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection';
            }
            return { success: false, error: errorMessage };
        }
    };

    // Legacy localStorage login (for backward compatibility)
    const loginWithLocalStorage = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return { success: true };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    };

    // Unified login method
    const login = async (email, password, useFirebase = true) => {
        if (useFirebase) {
            return await loginWithFirebase(email, password);
        } else {
            return loginWithLocalStorage(email, password);
        }
    };

    // Firebase Email/Password Signup
    const signupWithFirebase = async (email, username, password, confirmPassword, adminCode = '') => {
        // Validation
        if (!email || !username || !password || !confirmPassword) {
            return { success: false, error: 'All fields are required' };
        }

        if (password !== confirmPassword) {
            return { success: false, error: 'Passwords do not match' };
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name
            await updateProfile(result.user, {
                displayName: username
            });

            // Check admin code
            const ADMIN_SECRET_CODE = process.env.REACT_APP_ADMIN_CODE || 'PIANO2024';
            if (adminCode === ADMIN_SECRET_CODE) {
                // Store admin user ID in localStorage
                const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
                adminUsers.push(result.user.uid);
                localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
            }

            return { success: true, user: result.user };
        } catch (error) {
            let errorMessage = 'Signup failed';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email already registered';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            }
            return { success: false, error: errorMessage };
        }
    };

    // Legacy localStorage signup (for backward compatibility)
    const signupWithLocalStorage = (email, username, password, confirmPassword, adminCode = '') => {
        // Validation
        if (!email || !username || !password || !confirmPassword) {
            return { success: false, error: 'All fields are required' };
        }

        if (password !== confirmPassword) {
            return { success: false, error: 'Passwords do not match' };
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }

        const ADMIN_SECRET_CODE = process.env.REACT_APP_ADMIN_CODE || 'PIANO2024';
        const isAdmin = adminCode === ADMIN_SECRET_CODE;

        const newUser = {
            id: Date.now().toString(),
            email,
            username,
            password,
            role: isAdmin ? 'admin' : 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    // Unified signup method
    const signup = async (email, username, password, confirmPassword, adminCode = '', useFirebase = true) => {
        if (useFirebase) {
            return await signupWithFirebase(email, username, password, confirmPassword, adminCode);
        } else {
            return signupWithLocalStorage(email, username, password, confirmPassword, adminCode);
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if Firebase logout fails, clear local state
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithGoogle,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
