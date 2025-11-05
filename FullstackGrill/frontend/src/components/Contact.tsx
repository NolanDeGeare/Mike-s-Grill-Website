import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contactMessage = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactMessage),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

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

        <section className="contact-form-section">
          <div className="container">
            <h3 className="section-title">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </section>

<div className="map-box">
  <h3>Find Us Here</h3>
  <div className="map-frame">
    <iframe
      title="Mike's Grill Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.956198768846!2d-87.63811502375798!3d40.088038971494385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880d50dcf7e166ff%3A0xf29928a8b96d8c22!2sMike&#39;s%20Grill!5e1!3m2!1sen!2sus!4v1761100958426!5m2!1sen!2sus"
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "10px" }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  {/* Optional “Get Directions” button */}
  <a
    href="https://www.google.com/maps/dir/?api=1&destination=Mike's+Grill,+2006+Georgetown+Rd,+Tilton,+IL+61833"
    target="_blank"
    rel="noopener noreferrer"
    className="directions-btn"
  >
    📍 Get Directions
  </a>
</div>

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
