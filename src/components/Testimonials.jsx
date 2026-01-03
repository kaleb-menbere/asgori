import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { MdFormatQuote, MdStar, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const testimonials = [
  {
    id: 1,
    name: 'Alemayehu Bekele',
    role: 'Homeowner, Bole',
    feedback: 'ASGORRI transformed our outdated apartment into a modern masterpiece. Their attention to detail and commitment to quality exceeded our expectations. Highly recommended!',
    rating: 5,
    project: '3-Bedroom Apartment Renovation'
  },
  {
    id: 2,
    name: 'Sara Mohammed',
    role: 'Restaurant Owner',
    feedback: 'Our restaurant renovation was completed ahead of schedule and within budget. The team was professional, creative, and delivered exceptional craftsmanship.',
    rating: 5,
    project: 'Commercial Restaurant Renovation'
  },
  {
    id: 3,
    name: 'Daniel Tesfaye',
    role: 'Office Manager',
    feedback: 'From initial consultation to final walkthrough, ASGORRI demonstrated expertise and professionalism. Our office space now reflects our brand perfectly.',
    rating: 5,
    project: 'Corporate Office Design'
  },
  {
    id: 4,
    name: 'Meron Abebe',
    role: 'Villa Owner',
    feedback: 'The exterior renovation of our villa has received countless compliments. The team used premium materials and the results are stunning.',
    rating: 5,
    project: 'Villa Exterior Makeover'
  },
  {
    id: 5,
    name: 'Teshome Girma',
    role: 'Hotel General Manager',
    feedback: 'Working with ASGORRI was a game-changer for our hotel renovation. Their innovative solutions saved us time and money while delivering luxury finishes.',
    rating: 5,
    project: 'Hotel Lobby & Rooms Renovation'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Get testimonials for display (3 at a time for desktop)
  const getDisplayTestimonials = () => {
    if (window.innerWidth < 768) {
      // Mobile: Show one testimonial
      return [testimonials[currentIndex]];
    } else {
      // Desktop: Show three testimonials
      const start = currentIndex % testimonials.length;
      const end = (start + 3) % testimonials.length;
      
      if (end > start) {
        return testimonials.slice(start, end);
      } else {
        return [...testimonials.slice(start), ...testimonials.slice(0, end)];
      }
    }
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="section-subtitle">Client Stories</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Testimonials Display */}
        <div 
          className="testimonials-display"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button 
            className="nav-btn prev-btn"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <MdChevronLeft size={24} />
          </button>

          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {getDisplayTestimonials().map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                {/* Quote Icon */}
                <div className="quote-icon">
                  <MdFormatQuote size={32} />
                </div>

                {/* Rating */}
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <MdStar key={i} className="star-icon" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="feedback">"{testimonial.feedback}"</p>

                {/* Project Info */}
                <div className="project-info">
                  <span className="project-label">Project:</span>
                  <span className="project-name">{testimonial.project}</span>
                </div>

                {/* Client Info */}
                <div className="client-info">
                  <div className="client-details">
                    <h4 className="client-name">{testimonial.name}</h4>
                    <p className="client-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            className="nav-btn next-btn"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <MdChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="dots-container">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div className="stat-item">
            <h3>250+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Repeat Clients</p>
          </div>
          <div className="stat-item">
            <h3>5★</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;