import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">ASGORI</div>
      <nav>
        <a href="#hero">Home</a>
        <a href="#services">Services</a>
        <a href="#solutions">Solutions</a>
        <a href="#before-after">Gallery</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
