import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 Mike's Grill. All rights reserved.</p>

        <div className="social-links">
          <a
            href="https://www.facebook.com/p/Mikes-Grill-100063692524719/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/facebook-icon.png"
              alt="Facebook"
              className="social-icon"
            />
          </a>

          <a
            href="https://www.yelp.com/biz/mikes-grill-tilton"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/yelp-icon.png"
              alt="Yelp"
              className="social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
