import { useState, useEffect } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        setUsers(allUsers);
    };

    const handleRoleToggle = (userId) => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updated = allUsers.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    role: user.role === 'admin' ? 'user' : 'admin'
                };
            }
            return user;
        });

        localStorage.setItem('users', JSON.stringify(updated));
        loadUsers();

        // Update current user if their role changed
        const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (currentUser && currentUser.id === userId) {
            const updatedCurrentUser = updated.find(u => u.id === userId);
            const { password, ...userWithoutPassword } = updatedCurrentUser;
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        }
    };

    const handleDelete = (userId) => {
        const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

        if (currentUser && currentUser.id === userId) {
            alert('You cannot delete your own account!');
            return;
        }

        if (window.confirm('Are you sure you want to delete this user?')) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updated = allUsers.filter(user => user.id !== userId);
            localStorage.setItem('users', JSON.stringify(updated));
            loadUsers();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>User Management</h3>
                <p style={{ color: '#666', margin: 0 }}>
                    Total Users: <strong>{users.length}</strong> |
                    Admins: <strong>{users.filter(u => u.role === 'admin').length}</strong> |
                    Students: <strong>{users.filter(u => u.role === 'user').length}</strong>
                </p>
            </div>

            {users.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No users registered yet.
                </p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Username</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Role</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Joined</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>{user.username}</td>
                                    <td style={{ padding: '12px' }}>{user.email}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            backgroundColor: user.role === 'admin' ? '#e3f2fd' : '#f3e5f5',
                                            color: user.role === 'admin' ? '#1976d2' : '#7b1fa2'
                                        }}>
                                            {user.role === 'admin' ? 'Admin' : 'Student'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{formatDate(user.createdAt)}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => handleRoleToggle(user.id)}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: '#2196F3',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                marginRight: '8px'
                                            }}
                                        >
                                            {user.role === 'admin' ? 'Make Student' : 'Make Admin'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            style={{
                                                padding: '6px 12px',
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
    );
};

export default UserManagement;
