import React from "react";
import "./Hero.css";
import ceoPhoto from "/images/CEOCR.png";
import { MdArrowForward, MdCheckCircle } from "react-icons/md";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-gradient-bg"></div>
      
      <div className="hero-container">
        {/* Text Content */}
        <div className="hero-text">          
          <h1 className="hero-title">
            Transform Your Space with
            <span className="hero-highlight"> ASGORI</span> Excellence
          </h1>
          
          <p className="hero-subtitle">
            Premium finishing & renovation solutions that blend innovative design 
            with unparalleled craftsmanship for homes and businesses across Ethiopia.
          </p>
          
          <div className="hero-features">
            <div className="feature-item">
              <MdCheckCircle className="feature-icon" />
              <span>10+ Years Experience</span>
            </div>
            <div className="feature-item">
              <MdCheckCircle className="feature-icon" />
              <span>Premium Materials</span>
            </div>
            <div className="feature-item">
              <MdCheckCircle className="feature-icon" />
              <span>On-Time Delivery</span>
            </div>
          </div>
          
          <div className="hero-cta">
            <a href="#contact" className="cta-btn-primary">
              Get Free Consultation
              <MdArrowForward className="cta-icon" />
            </a>
            <a href="#services" className="cta-btn-secondary">
              View Our Services
            </a>
          </div>
        </div>

        {/* CEO Image */}
        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <img 
              src={ceoPhoto} 
              alt="CEO & Founder - ASGORI Finishing & Renovation" 
              className="ceo-image"
            />
            <div className="image-badge">
              <div className="badge-content">
                <strong>Kaleb Menbere</strong>
                <span>CEO & Founder</span>
              </div>
            </div>
            <div className="floating-card">
              <div className="card-content">
                <div className="card-stat">
                  <h3>250+</h3>
                  <p>Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;