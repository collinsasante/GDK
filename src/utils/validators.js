/**
 * Validation utilities
 */

export const validators = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  email: (email) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Validate password strength
   * At least 8 chars, 1 uppercase, 1 lowercase, 1 number
   * @param {string} password - Password to validate
   * @returns {boolean}
   */
  password: (password) => {
    if (!password) return false;
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  },

  /**
   * Get password strength score
   * @param {string} password - Password to check
   * @returns {Object} {score: 0-4, message: string}
   */
  passwordStrength: (password) => {
    if (!password) return { score: 0, message: 'No password' };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    const messages = {
      0: 'Very Weak',
      1: 'Weak',
      2: 'Fair',
      3: 'Good',
      4: 'Strong',
      5: 'Very Strong'
    };

    return { score, message: messages[score], checks };
  },

  /**
   * Validate username
   * 3-20 chars, alphanumeric and underscore only
   * @param {string} username - Username to validate
   * @returns {boolean}
   */
  username: (username) => {
    if (!username) return false;
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  },

  /**
   * Validate price
   * @param {number|string} price - Price to validate
   * @returns {boolean}
   */
  price: (price) => {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) && numPrice >= 0;
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean}
   */
  url: (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number (basic)
   * @param {string} phone - Phone to validate
   * @returns {boolean}
   */
  phone: (phone) => {
    if (!phone) return false;
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone);
  },

  /**
   * Validate required field
   * @param {*} value - Value to check
   * @returns {boolean}
   */
  required: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  /**
   * Validate min length
   * @param {string} value - Value to check
   * @param {number} min - Minimum length
   * @returns {boolean}
   */
  minLength: (value, min) => {
    if (!value) return false;
    return value.length >= min;
  },

  /**
   * Validate max length
   * @param {string} value - Value to check
   * @param {number} max - Maximum length
   * @returns {boolean}
   */
  maxLength: (value, max) => {
    if (!value) return true;
    return value.length <= max;
  },

  /**
   * Validate number range
   * @param {number} value - Value to check
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {boolean}
   */
  range: (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  }
};

export default validators;
