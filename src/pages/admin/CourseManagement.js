import { useState, useEffect } from 'react';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        beginner: 0,
        intermediate: 0,
        advanced: 0
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        const pianoCourses = JSON.parse(localStorage.getItem('pianoCourses') || '[]');
        setCourses(pianoCourses);

        // Calculate stats
        const stats = {
            total: pianoCourses.length,
            beginner: pianoCourses.filter(c => c.type === 'Beginner').length,
            intermediate: pianoCourses.filter(c => c.type === 'Intermediate').length,
            advanced: pianoCourses.filter(c => c.type === 'Advanced' || c.type === 'Expert').length
        };
        setStats(stats);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this gospel piano lesson?')) {
            const pianoCourses = JSON.parse(localStorage.getItem('pianoCourses') || '[]');
            const updated = pianoCourses.filter(course => course.id !== id);
            localStorage.setItem('pianoCourses', JSON.stringify(updated));
            loadCourses();
        }
    };

    return (
        <div>
            {/* Statistics Cards */}
            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-3">
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#1D3FAD',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>{stats.total}</h2>
                        <p style={{ margin: 0, fontSize: '14px' }}>Total Gospel Lessons</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>{stats.beginner}</h2>
                        <p style={{ margin: 0, fontSize: '14px' }}>Beginner Lessons</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#FF9800',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>{stats.intermediate}</h2>
                        <p style={{ margin: 0, fontSize: '14px' }}>Intermediate</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>{stats.advanced}</h2>
                        <p style={{ margin: 0, fontSize: '14px' }}>Advanced</p>
                    </div>
                </div>
            </div>

            {/* Courses Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginBottom: '20px' }}>Gospel Piano Lesson Catalog</h3>

                {courses.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        No gospel piano lessons uploaded yet. Use the "Upload New Lesson" tab to add your first lesson!
                    </p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Title</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Instructor</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Level</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Lessons</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Price</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Enrolled</th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '12px' }}>{course.id}</td>
                                        <td style={{ padding: '12px', fontWeight: '500' }}>{course.title}</td>
                                        <td style={{ padding: '12px' }}>{course.author}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                backgroundColor:
                                                    course.type === 'Beginner' ? '#e3f2fd' :
                                                    course.type === 'Intermediate' ? '#fff3e0' :
                                                    '#ffebee',
                                                color:
                                                    course.type === 'Beginner' ? '#1976d2' :
                                                    course.type === 'Intermediate' ? '#f57c00' :
                                                    '#c62828'
                                            }}>
                                                {course.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>{course.lesson || 'N/A'}</td>
                                        <td style={{ padding: '12px', fontWeight: '600', color: '#1D3FAD' }}>{course.price}</td>
                                        <td style={{ padding: '12px' }}>{course.enrolled || '0'}</td>
                                        <td style={{ padding: '12px' }}>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                style={{
                                                    padding: '6px 16px',
                                                    backgroundColor: '#f44336',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseManagement;
