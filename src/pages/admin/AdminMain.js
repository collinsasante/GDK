import { useState } from 'react';
import CourseUploadForm from './CourseUploadForm';
import CourseManagement from './CourseManagement';
import UserManagement from './UserManagement';

const AdminMain = () => {
    const [activeTab, setActiveTab] = useState('courses');

    return (
        <div className="react-login-page pt---120 pb---120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Admin Navigation Tabs */}
                        <div className="admin-tabs" style={{ marginBottom: '40px' }}>
                            <ul style={{
                                display: 'flex',
                                listStyle: 'none',
                                padding: 0,
                                gap: '10px',
                                borderBottom: '2px solid #e0e0e0'
                            }}>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('courses')}
                                        style={{
                                            padding: '15px 30px',
                                            border: 'none',
                                            background: activeTab === 'courses' ? '#1D3FAD' : 'transparent',
                                            color: activeTab === 'courses' ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Gospel Piano Lessons
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('upload')}
                                        style={{
                                            padding: '15px 30px',
                                            border: 'none',
                                            background: activeTab === 'upload' ? '#1D3FAD' : 'transparent',
                                            color: activeTab === 'upload' ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Upload New Lesson
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('users')}
                                        style={{
                                            padding: '15px 30px',
                                            border: 'none',
                                            background: activeTab === 'users' ? '#1D3FAD' : 'transparent',
                                            color: activeTab === 'users' ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Student Management
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Tab Content */}
                        <div className="admin-content">
                            {activeTab === 'courses' && <CourseManagement />}
                            {activeTab === 'upload' && <CourseUploadForm />}
                            {activeTab === 'users' && <UserManagement />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMain;
