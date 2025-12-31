import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <img src="/images/ceo.jpg" alt="CEO" className="hero-photo" />
        <h1>ASGORI Finishing & Renovation</h1>
        <p>Transforming Spaces with Quality & Excellence</p>
        <a href="#contact" className="hero-btn">Get in Touch</a>
      </div>
    </section>
  );
}

export default Hero;
