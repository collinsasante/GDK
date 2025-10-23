/**
 * Enrollment Service
 * Manages course enrollments
 */

import { storageService } from './storageService';

const ENROLLMENTS_KEY = 'enrollments';

export const enrollmentService = {
  /**
   * Enroll user in a course
   * @param {string} userId - User ID
   * @param {string} courseId - Course ID
   * @param {string} courseTitle - Course title
   * @param {number} price - Course price
   * @returns {Object} Enrollment object
   */
  enroll: (userId, courseId, courseTitle, price) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);

    // Check if already enrolled
    if (enrollmentService.isEnrolled(userId, courseId)) {
      throw new Error('Already enrolled in this course');
    }

    const newEnrollment = {
      id: Date.now().toString(),
      userId,
      courseId,
      courseTitle,
      price,
      enrolledAt: new Date().toISOString(),
      status: 'active',
      progress: 0,
      completedLessons: []
    };

    enrollments.push(newEnrollment);
    storageService.set(ENROLLMENTS_KEY, enrollments);

    return newEnrollment;
  },

  /**
   * Check if user is enrolled in a course
   * @param {string} userId - User ID
   * @param {string} courseId - Course ID
   * @returns {boolean}
   */
  isEnrolled: (userId, courseId) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    return enrollments.some(
      enrollment =>
        enrollment.userId === userId &&
        enrollment.courseId === courseId &&
        enrollment.status === 'active'
    );
  },

  /**
   * Get user's enrollments
   * @param {string} userId - User ID
   * @returns {Array} User's enrollments
   */
  getUserEnrollments: (userId) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    return enrollments.filter(
      enrollment => enrollment.userId === userId && enrollment.status === 'active'
    );
  },

  /**
   * Get all enrollments (admin only)
   * @returns {Array} All enrollments
   */
  getAllEnrollments: () => {
    return storageService.get(ENROLLMENTS_KEY, []);
  },

  /**
   * Update enrollment progress
   * @param {string} enrollmentId - Enrollment ID
   * @param {number} progress - Progress percentage (0-100)
   * @returns {Object|null} Updated enrollment or null
   */
  updateProgress: (enrollmentId, progress) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    const index = enrollments.findIndex(e => e.id === enrollmentId);

    if (index === -1) {
      return null;
    }

    enrollments[index].progress = Math.min(100, Math.max(0, progress));
    enrollments[index].updatedAt = new Date().toISOString();

    if (enrollments[index].progress === 100) {
      enrollments[index].completedAt = new Date().toISOString();
    }

    storageService.set(ENROLLMENTS_KEY, enrollments);
    return enrollments[index];
  },

  /**
   * Mark lesson as completed
   * @param {string} enrollmentId - Enrollment ID
   * @param {string} lessonId - Lesson ID
   * @returns {Object|null} Updated enrollment or null
   */
  completeLesson: (enrollmentId, lessonId) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    const index = enrollments.findIndex(e => e.id === enrollmentId);

    if (index === -1) {
      return null;
    }

    const enrollment = enrollments[index];

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      enrollment.updatedAt = new Date().toISOString();
      storageService.set(ENROLLMENTS_KEY, enrollments);
    }

    return enrollment;
  },

  /**
   * Cancel enrollment
   * @param {string} enrollmentId - Enrollment ID
   * @returns {boolean} Success status
   */
  cancelEnrollment: (enrollmentId) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    const index = enrollments.findIndex(e => e.id === enrollmentId);

    if (index === -1) {
      return false;
    }

    enrollments[index].status = 'cancelled';
    enrollments[index].cancelledAt = new Date().toISOString();
    storageService.set(ENROLLMENTS_KEY, enrollments);

    return true;
  },

  /**
   * Get enrollment statistics for a course
   * @param {string} courseId - Course ID
   * @returns {Object} Statistics object
   */
  getCourseStats: (courseId) => {
    const enrollments = storageService.get(ENROLLMENTS_KEY, []);
    const courseEnrollments = enrollments.filter(e => e.courseId === courseId);

    return {
      totalEnrollments: courseEnrollments.length,
      activeEnrollments: courseEnrollments.filter(e => e.status === 'active').length,
      completedEnrollments: courseEnrollments.filter(e => e.progress === 100).length,
      totalRevenue: courseEnrollments.reduce((sum, e) => sum + (e.price || 0), 0)
    };
  },

  /**
   * Get user statistics
   * @param {string} userId - User ID
   * @returns {Object} Statistics object
   */
  getUserStats: (userId) => {
    const enrollments = enrollmentService.getUserEnrollments(userId);

    return {
      totalCourses: enrollments.length,
      completedCourses: enrollments.filter(e => e.progress === 100).length,
      inProgressCourses: enrollments.filter(e => e.progress > 0 && e.progress < 100).length,
      totalSpent: enrollments.reduce((sum, e) => sum + (e.price || 0), 0)
    };
  }
};

export default enrollmentService;
