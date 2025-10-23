/**
 * Course Service
 * Manages course data from JSON and localStorage
 */

import coursesJson from '../data/Courses.json';
import { storageService } from './storageService';

const STORAGE_KEY = 'pianoCourses';

export const courseService = {
  /**
   * Get all courses (from JSON + localStorage)
   * @returns {Array} All courses
   */
  getAllCourses: () => {
    const localCourses = storageService.get(STORAGE_KEY, []);
    return [...coursesJson, ...localCourses];
  },

  /**
   * Get course by ID
   * @param {string} id - Course ID
   * @returns {Object|null} Course object or null
   */
  getCourseById: (id) => {
    const allCourses = courseService.getAllCourses();
    return allCourses.find(course => course.id === id) || null;
  },

  /**
   * Get courses by category
   * @param {string} category - Course category
   * @returns {Array} Filtered courses
   */
  getCoursesByCategory: (category) => {
    const allCourses = courseService.getAllCourses();
    return allCourses.filter(course =>
      course.category?.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Search courses by title or description
   * @param {string} query - Search query
   * @returns {Array} Matching courses
   */
  searchCourses: (query) => {
    const allCourses = courseService.getAllCourses();
    const lowerQuery = query.toLowerCase();
    return allCourses.filter(course =>
      course.title?.toLowerCase().includes(lowerQuery) ||
      course.description?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Create new course
   * @param {Object} courseData - Course data
   * @returns {Object} Created course
   */
  createCourse: (courseData) => {
    const courses = storageService.get(STORAGE_KEY, []);
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      image: courseData.image || '1.png'
    };
    courses.push(newCourse);
    storageService.set(STORAGE_KEY, courses);
    return newCourse;
  },

  /**
   * Update course
   * @param {string} id - Course ID
   * @param {Object} updates - Updated fields
   * @returns {Object|null} Updated course or null
   */
  updateCourse: (id, updates) => {
    const courses = storageService.get(STORAGE_KEY, []);
    const index = courses.findIndex(course => course.id === id);

    if (index !== -1) {
      courses[index] = {
        ...courses[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      storageService.set(STORAGE_KEY, courses);
      return courses[index];
    }
    return null;
  },

  /**
   * Delete course
   * @param {string} id - Course ID
   * @returns {boolean} Success status
   */
  deleteCourse: (id) => {
    const courses = storageService.get(STORAGE_KEY, []);
    const filtered = courses.filter(course => course.id !== id);

    if (filtered.length < courses.length) {
      storageService.set(STORAGE_KEY, filtered);
      return true;
    }
    return false;
  },

  /**
   * Get local courses only (uploaded by admin)
   * @returns {Array} Local courses
   */
  getLocalCourses: () => {
    return storageService.get(STORAGE_KEY, []);
  }
};

export default courseService;
