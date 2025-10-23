/**
 * Sanitization utilities
 */

export const sanitizers = {
  /**
   * Sanitize HTML (prevent XSS)
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  html: (str) => {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Strip HTML tags
   * @param {string} str - String to strip
   * @returns {string} String without HTML
   */
  stripTags: (str) => {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '');
  },

  /**
   * Trim whitespace
   * @param {string} str - String to trim
   * @returns {string} Trimmed string
   */
  trim: (str) => {
    if (!str) return '';
    return str.trim();
  },

  /**
   * Remove extra spaces (multiple spaces to single)
   * @param {string} str - String to clean
   * @returns {string} Cleaned string
   */
  normalizeSpaces: (str) => {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
  },

  /**
   * Remove special characters
   * @param {string} str - String to clean
   * @returns {string} Cleaned string
   */
  alphanumeric: (str) => {
    if (!str) return '';
    return str.replace(/[^a-zA-Z0-9]/g, '');
  },

  /**
   * Remove numbers
   * @param {string} str - String to clean
   * @returns {string} String without numbers
   */
  removeNumbers: (str) => {
    if (!str) return '';
    return str.replace(/[0-9]/g, '');
  },

  /**
   * Keep only numbers
   * @param {string} str - String to clean
   * @returns {string} Only numbers
   */
  numbersOnly: (str) => {
    if (!str) return '';
    return str.replace(/[^0-9]/g, '');
  },

  /**
   * Sanitize filename
   * @param {string} filename - Filename to sanitize
   * @returns {string} Safe filename
   */
  filename: (filename) => {
    if (!filename) return '';
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase();
  },

  /**
   * Sanitize email
   * @param {string} email - Email to sanitize
   * @returns {string} Sanitized email
   */
  email: (email) => {
    if (!email) return '';
    return email.toLowerCase().trim();
  },

  /**
   * Remove script tags and dangerous content
   * @param {string} str - String to clean
   * @returns {string} Safe string
   */
  removeScripts: (str) => {
    if (!str) return '';
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');
  }
};

export default sanitizers;
