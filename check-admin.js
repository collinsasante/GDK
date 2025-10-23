// Open browser console and run this to check your admin status
const user = JSON.parse(localStorage.getItem('user') || 'null');
const users = JSON.parse(localStorage.getItem('users') || '[]');

console.log('Current User:', user);
console.log('All Users:', users);
console.log('Is Admin?', user?.role === 'admin');
console.log('Total Users:', users.length);

// To make yourself admin, run:
// users[0].role = 'admin';
// localStorage.setItem('users', JSON.stringify(users));
// const updatedUser = {...user, role: 'admin'};
// localStorage.setItem('user', JSON.stringify(updatedUser));
// Then refresh the page
