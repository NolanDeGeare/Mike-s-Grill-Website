import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const PublicMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/public/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu items. Please try again later.');
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>Mike's Grill</h1>
        </div>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/menu" className="nav-link">Menu</a>
          <a href="/#contact" className="nav-link">Contact</a>
          <a href="/admin/login" className="nav-link">Admin</a>
        </nav>
      </header>

      <main>
        <section className="menu-hero">
          <div className="container">
            <h2 className="section-title">Our Menu</h2>
            <p className="menu-subtitle">Classic American diner fare since 1958</p>
          </div>
        </section>

        <section className="menu-section">
          <div className="container">
            {/* Category Filter */}
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="loading">
                <p>Loading menu items...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {/* Menu Items Grid */}
            {!loading && !error && (
              <div className="menu-grid">
                {filteredItems.map(item => (
                  <div key={item.id} className="menu-item-card">
                    {item.imageUrl && (
                      <div className="menu-item-image">
                        <img src={item.imageUrl} alt={item.name} />
                      </div>
                    )}
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <h3 className="menu-item-name">{item.name}</h3>
                        <span className="menu-item-price">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="menu-item-description">{item.description}</p>
                      <span className="menu-item-category">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Items Message */}
            {!loading && !error && filteredItems.length === 0 && (
              <div className="no-items">
                <p>No menu items available in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mike's Grill. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PublicMenu;
