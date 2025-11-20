import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ContactMessage } from '../types';

const AdminContacts: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    setStatus('');

    const adminUsername = localStorage.getItem('adminUsername');
    if (!adminUsername) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/admin/contacts', {
        withCredentials: true
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
      setError('Failed to load contact messages.');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError('');
    setStatus('');

    if (!window.confirm('Delete this message?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/admin/contacts/${id}`, {
        withCredentials: true
      });
      setStatus('Message deleted.');
      fetchMessages();
    } catch (err) {
      console.error('Error deleting contact message:', err);
      setError('Failed to delete message.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  const filteredMessages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return messages;

    return messages.filter((msg) =>
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term)
    );
  }, [messages, searchTerm]);

  const formatTimestamp = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light)' }}>
      <header className="header">
        <div className="logo">
          <h1>Admin Panel - Mike&apos;s Grill</h1>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: 'var(--primary-red)', marginBottom: '0.25rem' }}>Contact Messages</h2>
            <p style={{ margin: 0, color: '#555' }}>View submissions from the public contact form.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, email, or message"
              style={{
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                minWidth: '260px'
              }}
            />
            <button
              onClick={fetchMessages}
              style={{
                padding: '0.7rem 1.1rem',
                backgroundColor: 'var(--primary-red)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Refresh
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'red', backgroundColor: '#f8d7da', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>{error}</p>}
        {status && <p style={{ color: 'green', backgroundColor: '#d4edda', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>{status}</p>}

        <div style={{ marginTop: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '1.25rem' }}>
          {loading ? (
            <p>Loading messages...</p>
          ) : filteredMessages.length === 0 ? (
            <p style={{ margin: 0 }}>No messages found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {filteredMessages.map((msg) => (
                <div key={msg.id} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '1rem', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{msg.name}</div>
                      <div style={{ color: '#555', fontSize: '0.95rem' }}>{msg.email}</div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#777', textAlign: 'right' }}>
                      {formatTimestamp(msg.createdAt)}
                    </div>
                  </div>
                  <div style={{ whiteSpace: 'pre-line', lineHeight: 1.4, color: '#222' }}>
                    {msg.message}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
