import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const AdminMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMenuItems = async () => {
    try {
      const username = localStorage.getItem('adminUsername');
      const password = localStorage.getItem('adminPassword');

      if (!username || !password) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('http://localhost:8080/api/admin/menu', {
        auth: { username, password }
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      navigate('/admin/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('adminUsername')!;
      const password = localStorage.getItem('adminPassword')!;

      if (editingItem) {
        await axios.put(`http://localhost:8080/api/admin/menu/${editingItem.id}`, formData, {
          auth: { username, password }
        });
      } else {
        await axios.post('http://localhost:8080/api/admin/menu', formData, {
          auth: { username, password }
        });
      }

      setFormData({ name: '', description: '', price: 0, imageUrl: '', category: '' });
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        const username = localStorage.getItem('adminUsername')!;
        const password = localStorage.getItem('adminPassword')!;

        await axios.delete(`http://localhost:8080/api/admin/menu/${id}`, {
          auth: { username, password }
        });
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
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
          <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
        </nav>
      </header>

      <div className="container" style={{ padding: '2rem 0' }}>
        <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem' }}>Menu Management</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Form */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image URL:</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="burgers">Burgers</option>
                  <option value="sandwiches">Sandwiches</option>
                  <option value="fries">Fries</option>
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: 'var(--primary-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({ name: '', description: '', price: 0, imageUrl: '', category: '' });
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#ccc',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menu Items List */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>Current Menu Items</h3>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {menuItems.length === 0 ? (
                <p>No menu items found. Add your first item!</p>
              ) : (
                menuItems.map((item) => (
                  <div key={item.id} style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-red)' }}>{item.name}</h4>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{item.description}</p>
                      <p style={{ margin: '0', fontWeight: 'bold' }}>${item.price.toFixed(2)} - {item.category}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          marginRight: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => item.id && handleDelete(item.id)}
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
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;