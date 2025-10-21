import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Home from './components/Home';
import PublicMenu from './components/PublicMenu';
import AdminLogin from './components/AdminLogin';
import AdminMenu from './components/AdminMenu';
import Contact from './components/Contact';
import Footer from './components/Footer';  

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<PublicMenu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
        </Routes>

        <Footer /> {}
      </>
    </Router>
  );
}



export default App;