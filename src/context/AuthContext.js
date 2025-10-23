import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Find user with matching email and password
        const foundUser = users.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            // Don't store password in the user object
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return { success: true };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    };

    const signup = (email, username, password, confirmPassword, adminCode = '') => {
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

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }

        // Check admin code - use "PIANO2024" as the secret admin code
        const ADMIN_SECRET_CODE = 'PIANO2024';
        const isAdmin = adminCode === ADMIN_SECRET_CODE;

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email,
            username,
            password, // In production, this should be hashed
            role: isAdmin ? 'admin' : 'user',
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login after signup
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
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

export default AuthContext;
