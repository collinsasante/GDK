/**
 * Authentication Service
 * Manages user authentication and authorization
 */

import { storageService } from './storageService';
import CryptoJS from 'crypto-js';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';
const SESSION_KEY = 'userSession';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const authService = {
  /**
   * Hash password
   * @param {string} password - Plain text password
   * @returns {string} Hashed password
   */
  hashPassword: (password) => {
    return CryptoJS.SHA256(password).toString();
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Object} Result with success status and user/error
   */
  register: ({ username, email, password, adminCode = '' }) => {
    const users = storageService.get(USERS_KEY, []);

    // Check if user already exists
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    // Determine if user is admin
    const isAdmin = adminCode === (process.env.REACT_APP_ADMIN_CODE || 'PIANO2024');

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: authService.hashPassword(password),
      isAdmin,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    storageService.set(USERS_KEY, users);

    // Auto login after registration
    const session = authService.createSession(newUser);
    return { success: true, user: authService.sanitizeUser(newUser), session };
  },

  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Object} Result with success status and user/error
   */
  login: (username, password) => {
    const users = storageService.get(USERS_KEY, []);
    const hashedPassword = authService.hashPassword(password);

    const user = users.find(u =>
      u.username === username && u.password === hashedPassword
    );

    if (!user) {
      return { success: false, error: 'Invalid username or password' };
    }

    const session = authService.createSession(user);
    return { success: true, user: authService.sanitizeUser(user), session };
  },

  /**
   * Create user session
   * @param {Object} user - User object
   * @returns {Object} Session object
   */
  createSession: (user) => {
    const session = {
      userId: user.id,
      expiresAt: Date.now() + SESSION_DURATION,
      createdAt: Date.now()
    };

    storageService.set(SESSION_KEY, session);
    storageService.set(CURRENT_USER_KEY, authService.sanitizeUser(user));

    return session;
  },

  /**
   * Check if session is valid
   * @returns {boolean} Session validity
   */
  isSessionValid: () => {
    const session = storageService.get(SESSION_KEY);

    if (!session) {
      return false;
    }

    if (Date.now() > session.expiresAt) {
      authService.logout();
      return false;
    }

    return true;
  },

  /**
   * Get current user
   * @returns {Object|null} Current user or null
   */
  getCurrentUser: () => {
    if (!authService.isSessionValid()) {
      return null;
    }
    return storageService.get(CURRENT_USER_KEY);
  },

  /**
   * Logout user
   */
  logout: () => {
    storageService.remove(CURRENT_USER_KEY);
    storageService.remove(SESSION_KEY);
  },

  /**
   * Check if current user is admin
   * @returns {boolean}
   */
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.isAdmin === true;
  },

  /**
   * Remove sensitive data from user object
   * @param {Object} user - User object
   * @returns {Object} Sanitized user
   */
  sanitizeUser: (user) => {
    const { password, ...sanitized } = user;
    return sanitized;
  },

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updates - Updated fields
   * @returns {Object} Result with success status
   */
  updateUser: (userId, updates) => {
    const users = storageService.get(USERS_KEY, []);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      return { success: false, error: 'User not found' };
    }

    // Don't allow updating sensitive fields directly
    const { password, isAdmin, id, ...allowedUpdates } = updates;

    users[index] = {
      ...users[index],
      ...allowedUpdates,
      updatedAt: new Date().toISOString()
    };

    storageService.set(USERS_KEY, users);

    // Update current user if it's the same user
    const currentUser = authService.getCurrentUser();
    if (currentUser?.id === userId) {
      storageService.set(CURRENT_USER_KEY, authService.sanitizeUser(users[index]));
    }

    return { success: true, user: authService.sanitizeUser(users[index]) };
  },

  /**
   * Change password
   * @param {string} userId - User ID
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Object} Result with success status
   */
  changePassword: (userId, oldPassword, newPassword) => {
    const users = storageService.get(USERS_KEY, []);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const hashedOldPassword = authService.hashPassword(oldPassword);
    if (user.password !== hashedOldPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }

    user.password = authService.hashPassword(newPassword);
    user.updatedAt = new Date().toISOString();

    storageService.set(USERS_KEY, users);
    return { success: true, message: 'Password changed successfully' };
  },

  /**
   * Get all users (admin only)
   * @returns {Array} All users without passwords
   */
  getAllUsers: () => {
    const users = storageService.get(USERS_KEY, []);
    return users.map(authService.sanitizeUser);
  }
};

export default authService;
