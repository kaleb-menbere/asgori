import React from "react";
import "./Hero.css";
import ceoPhoto from "/images/CEOCR.png"; // replace with your CEO photo

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        {/* Text content */}
        <div className="hero-text">
          <h1>ASGORI Finishing & Renovation</h1>
          <p>
            Transforming your spaces with precision and style. Interior, exterior, 
            and full renovation solutions that bring your vision to life.
          </p>
          <a href="#contact" className="cta-btn">Get a Quote</a>
        </div>

        {/* CEO Photo */}
        <div className="hero-image">
          <img src={ceoPhoto} alt="CEO & Founder" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
