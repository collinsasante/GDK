import { useState, useEffect, useCallback } from 'react';
import { courseService } from '../services/courseService';

/**
 * Custom hook for managing courses
 * @returns {Object} Courses data and methods
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCourses = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const allCourses = courseService.getAllCourses();
      setCourses(allCourses);
    } catch (err) {
      setError(err.message);
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const getCourseById = useCallback((id) => {
    return courses.find(course => course.id === id) || null;
  }, [courses]);

  const searchCourses = useCallback((query) => {
    return courseService.searchCourses(query);
  }, []);

  const createCourse = useCallback((courseData) => {
    try {
      const newCourse = courseService.createCourse(courseData);
      loadCourses(); // Reload courses
      return { success: true, course: newCourse };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadCourses]);

  const updateCourse = useCallback((id, updates) => {
    try {
      const updated = courseService.updateCourse(id, updates);
      if (updated) {
        loadCourses(); // Reload courses
        return { success: true, course: updated };
      }
      return { success: false, error: 'Course not found' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadCourses]);

  const deleteCourse = useCallback((id) => {
    try {
      const success = courseService.deleteCourse(id);
      if (success) {
        loadCourses(); // Reload courses
      }
      return { success };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadCourses]);

  return {
    courses,
    loading,
    error,
    refetch: loadCourses,
    getCourseById,
    searchCourses,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

export default useCourses;
