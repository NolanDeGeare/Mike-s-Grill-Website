import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MenuCarousel from './MenuCarousel';

interface MenuCategory {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: MenuCategory;
}

const PublicMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/public/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu items. Please try again later.');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/public/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category && item.category.id === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
  
  if (a.category.name === 'Drinks' && b.category.name === 'Drinks') {
    
    const getBase = (name: string) => {
      if (name.toLowerCase().includes('shake')) return 'shake';
      if (name.toLowerCase().includes('malt')) return 'malt';
      return name.toLowerCase();
    };

    
    const baseOrder = ['shake', 'malt', 'sundae', 'soda', 'coffee', 'tea', 'juice'];

    const baseA = getBase(a.name);
    const baseB = getBase(b.name);

    const baseIndexA = baseOrder.indexOf(baseA);
    const baseIndexB = baseOrder.indexOf(baseB);

   
    if (baseIndexA !== baseIndexB) {
      return baseIndexA - baseIndexB;
    }

    
    const sizeOrder = ['Small', 'Medium', 'Large'];
    const aSize = sizeOrder.findIndex(size => a.name.includes(size));
    const bSize = sizeOrder.findIndex(size => b.name.includes(size));
    return aSize - bSize;
  }

  // Default fallback for other categories
  return a.id - b.id;
});

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>Mike's Grill</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      <main>
        <section className="menu-hero">
          <div className="container">
            <h2 className="section-title">Our Menu</h2>
            <p className="menu-subtitle">Classic American diner fare since 1958</p>
          </div>
        </section>

        <MenuCarousel />

        <section className="menu-section">
          <div className="container">
            {/* Category Filter */}
            <div className="category-filter">
              <button
                key="All"
                className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
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
                {sortedItems.map(item => (
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
                      <span className="menu-item-category">{item.category?.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="senior-discount">
  <h4>Senior Discount</h4>
  <p>
    Mike’s Grill proudly offers a <strong>10% discount</strong> to diners over 60.
    <br />Inside dining only — please inform your waitress while ordering.
  </p>
</div>


            {/* No Items Message */}
            {!loading && !error && filteredItems.length === 0 && (
              <div className="no-items">
                <p>No menu items available in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      

    </>
  );
};

export default PublicMenu;
