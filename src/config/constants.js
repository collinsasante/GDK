/**
 * Application Constants
 */

export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'Gospel Keys Demystified',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  ENV: process.env.REACT_APP_ENV || 'development'
};

export const AUTH_CONFIG = {
  ADMIN_CODE: process.env.REACT_APP_ADMIN_CODE || 'PIANO2024',
  SESSION_DURATION: parseInt(process.env.REACT_APP_SESSION_DURATION || '86400000', 10)
};

export const FEATURE_FLAGS = {
  ENABLE_BLOG: process.env.REACT_APP_ENABLE_BLOG === 'true',
  ENABLE_EVENTS: process.env.REACT_APP_ENABLE_EVENTS === 'true',
  ENABLE_INSTRUCTORS: process.env.REACT_APP_ENABLE_INSTRUCTORS === 'true'
};

export const STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  SESSION: 'userSession',
  COURSES: 'pianoCourses',
  ENROLLMENTS: 'enrollments',
  CART: 'shoppingCart'
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LESSONS: '/course',
  LESSON_DETAILS: '/course/:id',
  MY_LESSONS: '/my-lessons',
  CHECKOUT: '/checkout',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADMIN: '/admin',
  NOT_FOUND: '*'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const PRICE_CONFIG = {
  CURRENCY: '$',
  MIN_PRICE: 0,
  MAX_PRICE: 999.99
};

export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]{3,20}$/
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: false
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};

export const UI_CONFIG = {
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300
};

export default {
  APP_CONFIG,
  AUTH_CONFIG,
  FEATURE_FLAGS,
  STORAGE_KEYS,
  ROUTES,
  USER_ROLES,
  ENROLLMENT_STATUS,
  PRICE_CONFIG,
  VALIDATION_RULES,
  UI_CONFIG
};
