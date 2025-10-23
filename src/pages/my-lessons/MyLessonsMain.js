import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';

const MyLessonsMain = () => {
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const { getUserEnrollments } = useEnrollment();
    const [enrollments, setEnrollments] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            const userEnrollments = getUserEnrollments(user.id);
            setEnrollments(userEnrollments);
        }

        // Check if just enrolled
        if (searchParams.get('enrolled') === 'true') {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [user, getUserEnrollments, searchParams]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner" style={{ padding: '80px 0', minHeight: '60vh' }}>
                <div className="container">
                    {showSuccess && (
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            borderRadius: '8px',
                            marginBottom: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <strong>Enrollment Successful!</strong>
                                <p style={{ margin: '5px 0 0 0' }}>You now have access to your new gospel piano lesson.</p>
                            </div>
                            <button
                                onClick={() => setShowSuccess(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '24px',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ marginBottom: '10px' }}>My Gospel Piano Lessons</h1>
                        <p style={{ color: '#666', fontSize: '18px' }}>
                            Welcome back, {user?.username}! Here are your enrolled lessons.
                        </p>
                    </div>

                    {enrollments.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '12px'
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ color: '#ccc', margin: '0 auto 20px' }}
                            >
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            <h3 style={{ marginBottom: '15px' }}>No Lessons Yet</h3>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                You haven't enrolled in any gospel piano lessons yet.
                            </p>
                            <Link
                                to="/course"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontWeight: '600'
                                }}
                            >
                                Browse Lessons
                            </Link>
                        </div>
                    ) : (
                        <div className="row">
                            {enrollments.map((enrollment) => (
                                <div key={enrollment.id} className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{
                                            backgroundColor: '#2196F3',
                                            color: 'white',
                                            padding: '20px',
                                            minHeight: '120px'
                                        }}>
                                            <h4 style={{ marginBottom: '10px', color: 'white' }}>
                                                {enrollment.lessonTitle}
                                            </h4>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                fontSize: '12px'
                                            }}>
                                                {enrollment.status === 'active' ? 'Active' : enrollment.status}
                                            </span>
                                        </div>
                                        <div style={{ padding: '20px', flex: 1 }}>
                                            <div style={{
                                                marginBottom: '15px',
                                                paddingBottom: '15px',
                                                borderBottom: '1px solid #eee'
                                            }}>
                                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                                                    Enrolled on
                                                </p>
                                                <p style={{ margin: 0, fontWeight: '500' }}>
                                                    {formatDate(enrollment.enrolledAt)}
                                                </p>
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                                                    Price Paid
                                                </p>
                                                <p style={{ margin: 0, fontWeight: '600', color: '#4CAF50', fontSize: '18px' }}>
                                                    {enrollment.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
                                            <Link
                                                to={`/course/${enrollment.lessonId}`}
                                                style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    padding: '12px',
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    borderRadius: '4px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Start Learning
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {enrollments.length > 0 && (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <Link
                                to="/course"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    backgroundColor: 'transparent',
                                    color: '#2196F3',
                                    textDecoration: 'none',
                                    border: '2px solid #2196F3',
                                    borderRadius: '4px',
                                    fontWeight: '600'
                                }}
                            >
                                Browse More Lessons
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyLessonsMain;
