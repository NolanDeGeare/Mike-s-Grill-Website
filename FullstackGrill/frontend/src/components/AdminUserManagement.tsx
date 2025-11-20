import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
    id: number;
    username: string;
}

const AdminUserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const adminUsername = localStorage.getItem('adminUsername');
        if (!adminUsername) {
            navigate('/admin/login');
        } else {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/users', {
                withCredentials: true
            });
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users.');
            console.error(err);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/admin/users', { username, password }, {
                withCredentials: true
            });
            setUsername('');
            setPassword('');
            setMessage(`User '${username}' created successfully.`);
            fetchUsers();
        } catch (err) {
            setError('Failed to create user. The username might already exist.');
            console.error(err);
        }
    };

    const handleDeleteUser = async (id: number, name: string) => {
        const currentAdmin = localStorage.getItem('adminUsername');
        if (name === currentAdmin) {
            setError("You cannot delete your own account.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete the user '${name}'?`)) {
            setError('');
            setMessage('');
            try {
                await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
                    withCredentials: true
                });
                setMessage(`User '${name}' deleted successfully.`);
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user.');
                console.error(err);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminUsername');
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--light)' }}>
            <header className="header">
                <div className="logo">
                    <h1>Admin Panel - Mike's Grill</h1>
                </div>
                <nav className="nav">
                    <button onClick={() => navigate('/')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
                    <button onClick={() => navigate('/admin/menu')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Menu Management</button>
                    <button onClick={() => navigate('/admin/users')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>User Management</button>
                    <button onClick={() => navigate('/admin/contacts')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Contact Messages</button>
                    <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                </nav>
            </header>

            <div className="container" style={{ padding: '2rem 0' }}>
                <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem' }}>Admin User Management</h2>
                
                {error && <p style={{ color: 'red', backgroundColor: '#f8d7da', padding: '1rem', borderRadius: '8px' }}>{error}</p>}
                {message && <p style={{ color: 'green', backgroundColor: '#d4edda', padding: '1rem', borderRadius: '8px' }}>{message}</p>}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <h3>Create New Admin User</h3>
                        <form onSubmit={handleCreateUser}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username:</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    minLength={8}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                            <button 
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: 'var(--primary-red)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Create User
                            </button>
                        </form>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <h3>Existing Admin Users</h3>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {users.length === 0 ? (
                                <p>No users found.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {users.map(user => (
                                        <li key={user.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            borderBottom: '1px solid #eee'
                                        }}>
                                            <span style={{ fontWeight: 500 }}>{user.username}</span>
                                            <button 
                                                onClick={() => handleDeleteUser(user.id, user.username)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserManagement;
