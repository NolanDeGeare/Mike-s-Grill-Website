import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantHours } from '../types';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hours, setHours] = useState<RestaurantHours[]>([]);
  const [loadingHours, setLoadingHours] = useState(true);

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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
