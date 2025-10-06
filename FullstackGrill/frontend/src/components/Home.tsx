import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>Mike's Grill</h1>
        </div>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/menu" className="nav-link">Menu</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="/admin/login" className="nav-link">Admin</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
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
              <p>Complete with carhop service during summer months and that authentic 1950s diner atmosphere, we're the place where families have been gathering for generations. From our famous milkshakes to our all-day breakfast, every meal is prepared with the same care and quality that Mike insisted on.</p>
            </div>
            <div className="about-features">
              <div className="feature-card">
                <h4 className="card-title">Classic Recipes</h4>
                <p>Time-tested recipes from 1958, made fresh daily with quality ingredients and traditional cooking methods.</p>
              </div>
              <div className="feature-card">
                <h4 className="card-title">Carhop Service</h4>
                <p>Experience authentic 1950s dining with our seasonal carhop service - just like the good old days.</p>
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
                <h4>Monday - Thursday:</h4>
                <p>11:00 AM - 10:00 PM</p>
              </div>
              <div className="hours-col">
                <h4>Friday - Saturday:</h4>
                <p>11:00 AM - 11:00 PM</p>
              </div>
              <div className="hours-col">
                <h4>Sunday:</h4>
                <p>12:00 PM - 9:00 PM</p>
              </div>
              <div className="hours-col">
                <h4>Carhop Service:</h4>
                <p>May-Sep 11:00 AM-8:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;