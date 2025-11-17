import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AdminUser {
    id: number;
    username: string;
}

const AdminUserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users', {
                headers: {
                    // This assumes you have a way to store and retrieve the auth token
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users.');
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/users', { username, password }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setUsername('');
            setPassword('');
            fetchUsers();
        } catch (err) {
            setError('Failed to create user.');
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await axios.delete(`/api/admin/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchUsers();
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    return (
        <div>
            <h2>Admin User Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <h3>Create New Admin User</h3>
            <form onSubmit={handleCreateUser}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Create User</button>
            </form>

            <h3>Existing Admin Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUserManagement;
