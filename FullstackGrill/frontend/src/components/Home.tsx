import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../images/BarGrill1.png'

const Home: React.FC = () => {
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
    backgroundImage: `url(${bg})`,
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
            <h3 className="section-title">Hours of Operation</h3>
            <div className="hours-grid">
              <div className="hours-col">
                <h4>Monday - Saturday:</h4>
                <p>11:00 AM - 9:00 PM</p>
              </div>
              <div className="hours-col">
                <h4>Sunday:</h4>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;