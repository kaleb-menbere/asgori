import React, { useState, useEffect, useRef } from 'react';
import './HorizontalSlideshow.css';

const HorizontalSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const slideshowRef = useRef(null);
  const autoPlayRef = useRef(null);

  const slides = [
    {
      image: "/images/gallery1.jpg",
      quote: "Transforming spaces, creating lasting impressions",
      subtext: "Where vision meets craftsmanship",
      author: "Our Philosophy"
    },
    {
      image: "/images/gallery2.jpg",
      quote: "Quality isn't expensive, it's priceless",
      subtext: "Excellence in every detail",
      author: "Our Promise"
    },
    {
      image: "/images/gallery3.jpg",
      quote: "Your dream space, our commitment",
      subtext: "Building relationships through exceptional work",
      author: "Our Commitment"
    },
    {
      image: "/images/gallery4.jpg",
      quote: "Renovating more than just spaces, we renovate lifestyles",
      subtext: "Creating environments that inspire",
      author: "Our Mission"
    },
    {
      image: "/images/gallery5.jpg",
      quote: "The relationship we build with our clients is just as important as the work we do",
      subtext: "When you trust us with your space, we treat it like our own",
      author: "Client Partnership"
    },
    {
      image: "/images/gallery6.jpg",
      quote: "From the first coat to the final polish, you're not just buying a service",
      subtext: "You're investing in precision, care, and a promise to deliver excellence",
      author: "ASGORRI | Excellence in Finishing"
    },
    {
      image: "/images/gallery7.jpg",
      quote: "The finishing stage is where a house becomes a home",
      subtext: "An office becomes inspiring, and a shop becomes unforgettable",
      author: "Transformation"
    },
    {
      image: "/images/gallery8.jpg",
      quote: "We take pride in turning bare spaces into polished masterpieces",
      subtext: "Every detail matters, every finish tells a story",
      author: "Craftsmanship"
    },
    {
      image: "/images/gallery9.jpg",
      quote: "Building with integrity, finishing with perfection",
      subtext: "Your vision completed, your satisfaction guaranteed",
      author: "Our Guarantee"
    }
  ];

  // Auto-play slides
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    
    if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <section className="horizontal-slideshow-section" id="inspiration">
      <div className="slideshow-container"
        ref={slideshowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slideshow-track"
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            transition: isAnimating ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="slideshow-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <div className="text-content">
                  <div className="quote-icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                    </svg>
                  </div>
                  <h2 className="quote-text">{slide.quote}</h2>
                  <p className="quote-subtext">{slide.subtext}</p>
                  <div className="quote-author">{slide.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          className="nav-arrow prev-arrow"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button 
          className="nav-arrow next-arrow"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="navigation-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HorizontalSlideshow;