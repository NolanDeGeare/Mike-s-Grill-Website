import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RestaurantHours, SiteSettings, MenuCategory } from '../types';

interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: MenuCategory;
  featured: boolean;
}

const AdminMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Omit<MenuItem, 'category'> & { categoryId: number | '' }>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: '',
    featured: false
  });
  const [hours, setHours] = useState<RestaurantHours[]>([]);
  const [hoursLoading, setHoursLoading] = useState(true);
  const [savingHours, setSavingHours] = useState(false);
  const [hoursMessage, setHoursMessage] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [heroImageInput, setHeroImageInput] = useState('');
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroFilePreview, setHeroFilePreview] = useState<string | null>(null);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [savingHero, setSavingHero] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryMessage, setCategoryMessage] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [menuSearchTerm, setMenuSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
    fetchHours();
    fetchSiteSettings();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (heroFilePreview) {
        URL.revokeObjectURL(heroFilePreview);
      }
    };
  }, [heroFilePreview]);

  useEffect(() => {
    if (categories.length > 0 && formData.categoryId === '') {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const fetchMenuItems = async () => {
    try {
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/menu', { withCredentials: true });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      navigate('/admin/login');
    }
  };

  const fetchHours = async () => {
    setHoursLoading(true);
    setHoursMessage(null);
    try {
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/hours', { withCredentials: true });
      setHours(response.data);
    } catch (error) {
      console.error('Error fetching hours of operation:', error);
      setHoursMessage('Unable to load hours. Please refresh the page.');
    } finally {
      setHoursLoading(false);
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/settings', { withCredentials: true });
      setSiteSettings(response.data);
      setHeroImageInput(response.data.heroImageUrl || '');
    } catch (error) {
      console.error('Error fetching site settings:', error);
      setSettingsMessage('Unable to load site settings.');
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/categories', { withCredentials: true });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoryMessage('Unable to load categories.');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleHoursFieldChange = (id: number, field: 'openTime' | 'closeTime', value: string) => {
    setHours((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleHoursClosedToggle = (id: number, closed: boolean) => {
    setHours((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              closed,
              openTime: closed ? '' : entry.openTime,
              closeTime: closed ? '' : entry.closeTime
            }
          : entry
      )
    );
  };

  const handleSaveHours = async () => {
    try {
      setSavingHours(true);
      setHoursMessage(null);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.put('/api/admin/hours', hours, { withCredentials: true });
      setHours(response.data);
      setHoursMessage('Hours updated successfully.');
    } catch (error) {
      console.error('Error updating hours of operation:', error);
      setHoursMessage('Failed to update hours. Please try again.');
    } finally {
      setSavingHours(false);
    }
  };

  const handleSaveHeroImage = async () => {
    try {
      setSavingHero(true);
      setSettingsMessage(null);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.put(
        '/api/admin/settings/hero-image',
        { heroImageUrl: heroImageInput },
        { withCredentials: true }
      );
      setSiteSettings(response.data);
      setHeroImageInput(response.data.heroImageUrl || '');
      setSettingsMessage('Hero image updated successfully.');
    } catch (error) {
      console.error('Error updating hero image:', error);
      setSettingsMessage('Failed to update hero image. Please try again.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleHeroFileChange = (file: File | null) => {
    if (heroFilePreview) {
      URL.revokeObjectURL(heroFilePreview);
    }
    setHeroFile(file);
    if (file) {
      setHeroFilePreview(URL.createObjectURL(file));
    } else {
      setHeroFilePreview(null);
    }
  };

  const handleUploadHeroImage = async () => {
    if (!heroFile) {
      setSettingsMessage('Please choose an image to upload.');
      return;
    }
    try {
      setSavingHero(true);
      setSettingsMessage(null);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      const formData = new FormData();
      formData.append('file', heroFile);

      const response = await axios.post(
        '/api/admin/settings/hero-image/upload',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      setSiteSettings(response.data);
      setHeroImageInput(response.data.heroImageUrl || '');
      handleHeroFileChange(null);
      setSettingsMessage('Image uploaded and hero updated successfully.');
    } catch (error) {
      console.error('Error uploading hero image:', error);
      setSettingsMessage('Image upload failed. Please try again.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleCategoryNameChange = (id: number, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: value } : cat))
    );
  };

  const handleSaveCategory = async (category: MenuCategory) => {
    try {
      setCategoryMessage(null);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      await axios.put(
        `/api/admin/categories/${category.id}`,
        { name: category.name, sortOrder: category.sortOrder },
        { withCredentials: true }
      );
      setCategoryMessage('Category updated.');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setCategoryMessage('Failed to update category.');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setCategoryMessage('Please enter a category name.');
      return;
    }
    try {
      setCategoryMessage(null);
      const username = localStorage.getItem('adminUsername');

      if (!username) {
        navigate('/admin/login');
        return;
      }

      await axios.post(
        '/api/admin/categories',
        { name: newCategoryName },
        { withCredentials: true }
      );
      setNewCategoryName('');
      setCategoryMessage('Category added.');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      setCategoryMessage('Failed to add category.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('adminUsername')!;

      const category = categories.find(c => c.id === formData.categoryId);
      if (!category) {
        console.error('Selected category not found');
        return;
      }

      const submissionData: Omit<MenuItem, 'id'> = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        imageUrl: formData.imageUrl,
        featured: formData.featured,
        category: category,
      };

      if (editingItem) {
        await axios.put(`/api/admin/menu/${editingItem.id}`, submissionData, {
          withCredentials: true
        });
      } else {
        await axios.post('/api/admin/menu', submissionData, {
          withCredentials: true
        });
      }

      setFormData({ name: '', description: '', price: 0, imageUrl: '', categoryId: '', featured: false });
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      categoryId: item.category ? item.category.id : '',
      featured: item.featured
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        const username = localStorage.getItem('adminUsername')!;

        await axios.delete(`/api/admin/menu/${id}`, {
          withCredentials: true
        });
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  const hoursTableHeaderStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #ddd',
    fontWeight: 600
  };

  const hoursTableCellStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  };

  const heroPreviewStyle: React.CSSProperties = {
    width: '100%',
    height: '220px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #ddd'
  };

  const normalizedSearch = menuSearchTerm.trim().toLowerCase();
  const visibleMenuItems = menuItems.filter((item) => {
    if (!normalizedSearch) {
      return true;
    }
    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch) ||
      (item.category && item.category.name.toLowerCase().includes(normalizedSearch))
    );
  });

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
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="/images/ItemName.jpeg or https://example.com/image.jpg"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category:</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                  disabled={categoriesLoading || categories.length === 0}
                >
                  <option value="">{categoriesLoading ? 'Loading...' : 'Select Category'}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Featured Item
                </label>
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
                      setFormData({ name: '', description: '', price: 0, imageUrl: '', categoryId: '', featured: false });
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
            <div style={{ margin: '1rem 0' }}>
              <input
                type="text"
                value={menuSearchTerm}
                onChange={(e) => setMenuSearchTerm(e.target.value)}
                placeholder="Search by name, description, or category..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {visibleMenuItems.length === 0 ? (
                <p>No menu items found. Add your first item!</p>
              ) : (
                visibleMenuItems.map((item) => (
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
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-red)' }}>{item.name} {item.featured && '(Featured)'}</h4>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{item.description}</p>
                      <p style={{ margin: '0', fontWeight: 'bold' }}>${item.price.toFixed(2)} - {item.category?.name}</p>
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

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem' }}>Hours of Operation</h2>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {hoursLoading ? (
              <p>Loading hours...</p>
            ) : hours.length === 0 ? (
              <p>No hours configured yet.</p>
            ) : (
              <>
                {hoursMessage && (
                  <p style={{ marginBottom: '1rem', color: hoursMessage.includes('successfully') ? '#198754' : '#dc3545' }}>
                    {hoursMessage}
                  </p>
                )}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={hoursTableHeaderStyle}>Day</th>
                        <th style={hoursTableHeaderStyle}>Open</th>
                        <th style={hoursTableHeaderStyle}>Close</th>
                        <th style={hoursTableHeaderStyle}>Closed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hours.map((entry) => (
                        <tr key={entry.id}>
                          <td style={hoursTableCellStyle}>{entry.dayOfWeek}</td>
                          <td style={hoursTableCellStyle}>
                            <input
                              type="text"
                              value={entry.openTime}
                              onChange={(e) => handleHoursFieldChange(entry.id, 'openTime', e.target.value)}
                              disabled={entry.closed}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                              }}
                            />
                          </td>
                          <td style={hoursTableCellStyle}>
                            <input
                              type="text"
                              value={entry.closeTime}
                              onChange={(e) => handleHoursFieldChange(entry.id, 'closeTime', e.target.value)}
                              disabled={entry.closed}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                              }}
                            />
                          </td>
                          <td style={{ ...hoursTableCellStyle, textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={entry.closed}
                              onChange={(e) => handleHoursClosedToggle(entry.id, e.target.checked)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleSaveHours}
                    disabled={savingHours}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'var(--primary-red)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: savingHours ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {savingHours ? 'Saving...' : 'Save Hours'}
                  </button>
                  <button
                    type="button"
                    onClick={fetchHours}
                    disabled={savingHours}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: savingHours ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Reload
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem' }}>Categories</h2>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {categoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              <>
                {categoryMessage && (
                  <p style={{ marginBottom: '1rem', color: categoryMessage.includes('fail') ? '#dc3545' : '#198754' }}>
                    {categoryMessage}
                  </p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {categories.map((category) => (
                    <div key={category.id} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                        style={{ flex: '1 1 250px', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveCategory(category)}
                        style={{
                          padding: '0.6rem 1.2rem',
                          backgroundColor: 'var(--primary-red)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ))}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    style={{ flex: '1 1 250px', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    style={{
                      padding: '0.6rem 1.2rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add Category
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem' }}>Hero Image</h2>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {settingsMessage && (
              <p style={{ marginBottom: '1rem', color: settingsMessage.includes('successfully') ? '#198754' : '#dc3545' }}>
                {settingsMessage}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontWeight: 600 }}>Hero Image URL</label>
              <input
                type="text"
                value={heroImageInput}
                onChange={(e) => setHeroImageInput(e.target.value)}
                placeholder="https://example.com/hero.jpg or /images/BarGrill1.png"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleSaveHeroImage}
                  disabled={savingHero}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--primary-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: savingHero ? 'not-allowed' : 'pointer'
                  }}
                >
                  {savingHero ? 'Saving...' : 'Save Hero Image'}
                </button>
                <button
                  type="button"
                  onClick={fetchSiteSettings}
                  disabled={savingHero}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: savingHero ? 'not-allowed' : 'pointer'
                  }}
                >
                  Reload
                </button>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />
              <label style={{ fontWeight: 600 }}>Upload From Your Computer</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleHeroFileChange(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                style={{ padding: '0.25rem 0' }}
              />
              <button
                type="button"
                onClick={handleUploadHeroImage}
                disabled={savingHero || !heroFile}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: heroFile && !savingHero ? 'var(--primary-red)' : '#bbb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: heroFile && !savingHero ? 'pointer' : 'not-allowed',
                  maxWidth: '230px'
                }}
              >
                {savingHero ? 'Uploading...' : 'Upload & Use Image'}
              </button>
              {heroFilePreview && (
                <div>
                  <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Selected File Preview</p>
                  <img src={heroFilePreview} alt="Selected hero preview" style={heroPreviewStyle} />
                </div>
              )}
              {heroImageInput && (
                <div>
                  <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Current Hero Preview</p>
                  <img src={heroImageInput} alt="Hero preview" style={heroPreviewStyle} onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminMenu;
