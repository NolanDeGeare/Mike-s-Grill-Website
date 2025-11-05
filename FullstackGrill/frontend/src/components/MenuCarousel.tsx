import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const MenuCarousel: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/public/menu/featured');
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (featuredItems.length === 0) {
    return null; // Don't render the carousel if there are no featured items
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="carousel-container" style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Featured Items</h2>
      <Slider {...settings}>
        {featuredItems.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: 'black',
              padding: '1rem',
              textAlign: 'left'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
              <p style={{ margin: 0 }}>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MenuCarousel;
