import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MenuCarousel.css';

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
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axios.get('/api/public/menu/featured');
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    if (featuredItems.length > 0 && sliderRef.current) {
      sliderRef.current.slickPlay?.();
    }
  }, [featuredItems]);

  if (featuredItems.length === 0) {
    return null; // Don't render the carousel if there are no featured items
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'ease-in-out',
    arrows: false,
    pauseOnHover: true,
    swipe: true,
    draggable: true,
    touchMove: true,
    accessibility: true,
    adaptiveHeight: false
  };

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="section-title carousel-title">Featured Items</h2>
      <div className="carousel-wrapper">
        <div 
          className="carousel-edge-click carousel-edge-left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        />
        <div 
          className="carousel-edge-click carousel-edge-right"
          onClick={goToNext}
          aria-label="Next slide"
        />
        <Slider 
          {...settings}
          ref={sliderRef}
        >
          {featuredItems.map((item) => (
            <div key={item.id} className="carousel-slide">
              <div className="carousel-image-wrapper">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <div className="carousel-overlay-gradient"></div>
                  <div className="carousel-content">
                    <h3 className="carousel-item-name">{item.name}</h3>
                    <p className="carousel-item-description">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MenuCarousel;
