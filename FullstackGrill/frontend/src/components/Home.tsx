import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultHero from '../images/BarGrill1.png';
import { RestaurantHours, SiteSettings } from '../types';

const Home: React.FC = () => {
  const [hours, setHours] = useState<RestaurantHours[]>([]);
  const [loadingHours, setLoadingHours] = useState(true);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadHours = async () => {
      try {
        const response = await fetch('/api/public/hours');
        if (!response.ok) {
          throw new Error('Failed to fetch hours of operation');
        }
        const data: RestaurantHours[] = await response.json();
        setHours(data);
      } catch (error) {
        console.error('Error fetching hours of operation:', error);
      } finally {
        setLoadingHours(false);
      }
    };

    loadHours();
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/public/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch site settings');
        }
        const data: SiteSettings = await response.json();
        setHeroImageUrl(data.heroImageUrl);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    loadSettings();
  }, []);

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
        <section className="hero-section"
  style={{
    backgroundImage: `url(${heroImageUrl || defaultHero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
          <div className="hero-content">
            <h2>Welcome to Mike's Grill</h2>
            <p>Classic American diner since 1958</p>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="container">
            <div className="about-story">
              <h3 className="section-title">Our Story</h3>
              <p>Since Mike first opened his doors in 1958, Mike's Grill has been a cornerstone of the community, serving classic American diner fare with old-fashioned hospitality. Our kitchen specializes in flame-grilled burgers, hand-cut fries, and traditional comfort food recipes passed down through the decades.</p>
            </div>
            <div className="about-features">
              <div className="feature-card">
                <h4 className="card-title">Classic Recipes</h4>
                <p>Time-tested recipes from 1958, made fresh daily with quality ingredients and traditional cooking methods.</p>
              </div>
              <div className="feature-card">
                <h4 className="card-title">Authentic Service</h4>
                <p>Experience authentic 1950s dining with our retro ambiance - just like the good old days.</p>
              </div>
              <div className="feature-card">
                <h4 className="card-title">Family Tradition</h4>
                <p>A multigenerational gathering place where families have been creating memories for over 65 years.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="hours" className="hours-section">
          <div className="container">
            <div className="hours-shell">
              <div className="hours-container">
                <div className="hours-panel">
                  <h3 className="section-title">Hours of Operation</h3>
                  {loadingHours ? (
                    <p className="hours-message">Loading hours...</p>
                  ) : hours.length === 0 ? (
                    <p className="hours-message">Hours information is currently unavailable.</p>
                  ) : (
                    <ul className="hours-list">
                      {hours.map((entry) => (
                        <li className="hours-item" key={entry.id ?? entry.dayOfWeek}>
                          <span className="hours-day">{entry.dayOfWeek}</span>
                          <span className="hours-time">
                            {entry.closed
                              ? 'Closed'
                              : `${entry.openTime || 'TBD'} - ${entry.closeTime || 'TBD'}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="map-panel">
                  <h3 className="map-title">Find Us Here</h3>
                  <div className="map-frame">
                    <iframe
                      title="Mike's Grill Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.956198768846!2d-87.63811502375798!3d40.088038971494385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880d50dcf7e166ff%3A0xf29928a8b96d8c22!2sMike&#39;s%20Grill!5e1!3m2!1sen!2sus!4v1761100958426!5m2!1sen!2sus"
                      width="100%"
                      height="360"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Mike's+Grill,+2006+Georgetown+Rd,+Tilton,+IL+61833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-btn"
                  >
                    📍 Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
