import { useState, useEffect, useCallback } from 'react';
import { enrollmentService } from '../services/enrollmentService';

/**
 * Custom hook for managing enrollments
 * @param {string} userId - User ID (optional)
 * @returns {Object} Enrollment data and methods
 */
export const useEnrollment = (userId = null) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEnrollments = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const data = userId
        ? enrollmentService.getUserEnrollments(userId)
        : enrollmentService.getAllEnrollments();
      setEnrollments(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading enrollments:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  const enroll = useCallback((userId, courseId, courseTitle, price) => {
    try {
      const enrollment = enrollmentService.enroll(userId, courseId, courseTitle, price);
      loadEnrollments(); // Reload enrollments
      return { success: true, enrollment };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadEnrollments]);

  const isEnrolled = useCallback((userId, courseId) => {
    return enrollmentService.isEnrolled(userId, courseId);
  }, []);

  const updateProgress = useCallback((enrollmentId, progress) => {
    try {
      const updated = enrollmentService.updateProgress(enrollmentId, progress);
      if (updated) {
        loadEnrollments(); // Reload enrollments
        return { success: true, enrollment: updated };
      }
      return { success: false, error: 'Enrollment not found' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadEnrollments]);

  const completeLesson = useCallback((enrollmentId, lessonId) => {
    try {
      const updated = enrollmentService.completeLesson(enrollmentId, lessonId);
      if (updated) {
        loadEnrollments(); // Reload enrollments
        return { success: true, enrollment: updated };
      }
      return { success: false, error: 'Enrollment not found' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadEnrollments]);

  const cancelEnrollment = useCallback((enrollmentId) => {
    try {
      const success = enrollmentService.cancelEnrollment(enrollmentId);
      if (success) {
        loadEnrollments(); // Reload enrollments
      }
      return { success };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadEnrollments]);

  const getUserStats = useCallback((userId) => {
    return enrollmentService.getUserStats(userId);
  }, []);

  const getCourseStats = useCallback((courseId) => {
    return enrollmentService.getCourseStats(courseId);
  }, []);

  return {
    enrollments,
    loading,
    error,
    refetch: loadEnrollments,
    enroll,
    isEnrolled,
    updateProgress,
    completeLesson,
    cancelEnrollment,
    getUserStats,
    getCourseStats
  };
};

export default useEnrollment;
