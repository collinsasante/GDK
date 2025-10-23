import { createContext, useContext, useState, useEffect } from 'react';

const EnrollmentContext = createContext();

export const useEnrollment = () => {
    const context = useContext(EnrollmentContext);
    if (!context) {
        throw new Error('useEnrollment must be used within an EnrollmentProvider');
    }
    return context;
};

export const EnrollmentProvider = ({ children }) => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        // Load enrollments from localStorage
        const savedEnrollments = localStorage.getItem('enrollments');
        if (savedEnrollments) {
            setEnrollments(JSON.parse(savedEnrollments));
        }
    }, []);

    const enrollInLesson = (userId, lessonId, lessonTitle, price) => {
        const newEnrollment = {
            id: Date.now().toString(),
            userId,
            lessonId,
            lessonTitle,
            price,
            enrolledAt: new Date().toISOString(),
            status: 'active'
        };

        const updatedEnrollments = [...enrollments, newEnrollment];
        setEnrollments(updatedEnrollments);
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));

        return newEnrollment;
    };

    const getUserEnrollments = (userId) => {
        return enrollments.filter(enrollment => enrollment.userId === userId);
    };

    const isEnrolled = (userId, lessonId) => {
        return enrollments.some(
            enrollment => enrollment.userId === userId && enrollment.lessonId === lessonId
        );
    };

    const getAllEnrollments = () => {
        return enrollments;
    };

    return (
        <EnrollmentContext.Provider value={{
            enrollments,
            enrollInLesson,
            getUserEnrollments,
            isEnrolled,
            getAllEnrollments
        }}>
            {children}
        </EnrollmentContext.Provider>
    );
};
