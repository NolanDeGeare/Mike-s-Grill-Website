import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
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
        <section className="contact-section">
          <div className="container">
            <h2 className="section-title">Contact Us</h2>
            <div className="contact-info">
              <p>📍 2006 Georgetown Rd, Tilton, IL</p>
              <p>📞 <a href="tel:5551234567">(217) 446-6605</a></p>
            </div>
          </div>
        </section>

        <section id="hours" className="hours-section">
          <div className="container">
            <h3 className="section-title">Hours of Operation</h3>
            <div className="hours-grid">
              <div className="hours-col">
                <h4>Mon - Sat:</h4><p>11:00 AM - 9:00 PM</p>
              </div>
              <div className="hours-col">
                <h4>Sunday:</h4><p>Closed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
