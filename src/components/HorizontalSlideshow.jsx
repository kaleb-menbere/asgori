import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HorizontalSlideshow.css';

const HorizontalSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [typedQuotes, setTypedQuotes] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const slideshowRef = useRef(null);
  const autoPlayRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const soundEnabledRef = useRef(true);
  const interactionTimeoutRef = useRef(null);
  const touchMoveRef = useRef(null);

  const slides = [
    {
      image: "/images/gallery1.jpg",
      quote: "Transforming spaces, creating lasting impressions",
      author: "Our Philosophy"
    },
    {
      image: "/images/gallery2.jpg",
      quote: "Quality isn't expensive, it's priceless",
      author: "Our Promise"
    },
    {
      image: "/images/gallery3.jpg",
      quote: "Your dream space, our commitment",
      author: "Our Commitment"
    },
    {
      image: "/images/gallery4.jpg",
      quote: "Renovating more than just spaces, we renovate lifestyles",
      author: "Our Mission"
    },
    {
      image: "/images/gallery5.jpg",
      quote: "The relationship we build with our clients is just as important as the work we do",
      author: "Client Partnership"
    },
    {
      image: "/images/gallery6.jpg",
      quote: "From the first coat to the final polish, you're not just buying a service",
      author: "ASGORRI | Excellence in Finishing"
    },
    {
      image: "/images/gallery7.jpg",
      quote: "The finishing stage is where a house becomes a home",
      author: "Transformation"
    },
    {
      image: "/images/gallery8.jpg",
      quote: "We take pride in turning bare spaces into polished masterpieces",
      author: "Craftsmanship"
    },
    {
      image: "/images/gallery9.jpg",
      quote: "Building with integrity, finishing with perfection",
      author: "Our Guarantee"
    }
  ];

  // Check if user is viewing the page AND has interacted
  const isUserActive = isPageVisible && hasUserInteracted;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize simple audio - no external files
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    } catch (error) {
      console.log('Audio context not available, sounds will be disabled');
      soundEnabledRef.current = false;
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Set up user interaction tracking
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
      
      // Reset interaction timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      
      // Consider user inactive after 5 minutes of no interaction
      interactionTimeoutRef.current = setTimeout(() => {
        setHasUserInteracted(false);
      }, 5 * 60 * 1000); // 5 minutes
    };

    // Listen for various user interactions
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [hasUserInteracted]);

  // Page Visibility API for detecting when page is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      setIsPageVisible(isVisible);
      
      if (!isVisible) {
        // Page is hidden, stop all activity
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.suspend();
        }
      } else {
        // Page is visible again, resume audio if needed
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Check if page is initially visible
    setIsPageVisible(document.visibilityState === 'visible');
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Create a pleasant, subtle typing sound - ONLY when user is active
  const playTypingSound = useCallback(() => {
    // Only play sound if user is active AND has interacted
    if (!isUserActive || !soundEnabledRef.current || isMobile) return; // Disable sound on mobile
    
    // Rate limiting: don't play sounds too close together
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 60) {
      return;
    }
    lastSoundTimeRef.current = now;

    try {
      // Try using Web Audio API
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        const audioContext = audioContextRef.current;
        
        // Resume if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        
        // Create a simple, pleasant typing sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Pleasant frequency range (similar to modern keyboard)
        oscillator.frequency.value = 800 + Math.random() * 400;
        oscillator.type = 'sine'; // Smooth sine wave
        
        // Quick, subtle envelope
        const startTime = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.03, startTime + 0.001); // Very quick attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05); // Quick release
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.06);
        
        // Clean up
        oscillator.onended = () => {
          oscillator.disconnect();
          gainNode.disconnect();
        };
      }
    } catch (error) {
      // If audio fails, disable sounds
      soundEnabledRef.current = false;
    }
  }, [isUserActive, isMobile]);

  // Typewriter effect for current slide - optimized for mobile
  const typeQuote = useCallback((slideIndex) => {
    // Only type if user is active AND has interacted
    if (!isUserActive) {
      // If user is not active, show full text immediately
      setTypedQuotes(prev => ({
        ...prev,
        [slideIndex]: slides[slideIndex].quote
      }));
      return;
    }
    
    const slide = slides[slideIndex];
    const fullQuote = slide.quote;
    
    // Clear any existing typing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    
    // Start with empty quote
    setTypedQuotes(prev => ({
      ...prev,
      [slideIndex]: ""
    }));
    
    let currentCharIndex = 0;
    let soundCounter = 0;
    
    const typeNextChar = () => {
      // Stop typing if user becomes inactive
      if (!isUserActive) {
        setIsTyping(false);
        setTypedQuotes(prev => ({
          ...prev,
          [slideIndex]: fullQuote
        }));
        return;
      }
      
      if (currentCharIndex < fullQuote.length) {
        const currentChar = fullQuote[currentCharIndex];
        
        setTypedQuotes(prev => ({
          ...prev,
          [slideIndex]: fullQuote.substring(0, currentCharIndex + 1)
        }));
        
        // Play sound for some characters (not every character) - ONLY when active and not mobile
        soundCounter++;
        if (!isMobile && soundCounter % 2 === 0 && Math.random() > 0.4) {
          playTypingSound();
        }
        
        currentCharIndex++;
        
        // Faster typing speed on mobile for better UX
        const typingSpeed = isMobile ? 20 : 35; // Base speed
        
        const isSpace = currentChar === ' ';
        const isPunctuation = /[.,!?;:]/.test(currentChar);
        
        let speed;
        if (isSpace) {
          speed = (isMobile ? 40 : 70) + Math.random() * 30;
        } else if (isPunctuation) {
          speed = (isMobile ? 80 : 120) + Math.random() * 50;
        } else {
          speed = typingSpeed + Math.random() * 25;
        }
        
        typingTimeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
      }
    };
    
    // Start typing after a short delay
    typingTimeoutRef.current = setTimeout(typeNextChar, 300);
  }, [isUserActive, playTypingSound, isMobile]);

  // Auto-play slides (only when user is active)
  useEffect(() => {
    // Clear existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    
    if (isUserActive) {
      // Longer interval on mobile to give users time to read
      const interval = isMobile ? 10000 : 8000;
      
      autoPlayRef.current = setInterval(() => {
        if (!isTyping && isUserActive) {
          nextSlide();
        }
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isTyping, isUserActive, isMobile]);

  // Start typing when slide changes (only when user is active)
  useEffect(() => {
    if (isUserActive) {
      typeQuote(currentIndex);
    } else {
      // If user is not active, show full text immediately
      setTypedQuotes(prev => ({
        ...prev,
        [currentIndex]: slides[currentIndex].quote
      }));
    }
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentIndex, typeQuote, isUserActive]);

  const nextSlide = useCallback(() => {
    if (isAnimating || isTyping || !isUserActive) return;
    setIsAnimating(true);
    
    // Stop current typing
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % slides.length;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, isTyping, isUserActive, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || isTyping || !isUserActive) return;
    setIsAnimating(true);
    
    // Stop current typing
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + slides.length) % slides.length;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, isTyping, isUserActive, slides.length]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex || isTyping || !isUserActive) return;
    setIsAnimating(true);
    
    // Stop current typing
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setCurrentIndex(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, isTyping, isUserActive]);

  // Improved touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    if (!isUserActive) {
      setHasUserInteracted(true);
    }
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchEndX(touch.clientX); // Initialize touchEndX
    touchMoveRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;
    
    const touch = e.touches[0];
    setTouchEndX(touch.clientX);
    touchMoveRef.current = true;
    
    // Prevent default on significant horizontal movement to avoid page scroll
    const diff = Math.abs(touch.clientX - touchStartX);
    if (diff > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchMoveRef.current) return;
    
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = isMobile ? 40 : 50; // Smaller threshold on mobile
    
    if (Math.abs(distance) < minSwipeDistance) return;
    
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
    touchMoveRef.current = false;
  };

  // Pause auto-play on hover - also track interaction
  const handleMouseEnter = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    if (autoPlayRef.current && isUserActive) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [isUserActive, hasUserInteracted]);

  const handleMouseLeave = useCallback(() => {
    if (isUserActive && !isTyping && !autoPlayRef.current) {
      // Longer interval on mobile
      const interval = isMobile ? 10000 : 8000;
      
      autoPlayRef.current = setInterval(() => {
        if (!isTyping && isUserActive) {
          nextSlide();
        }
      }, interval);
    }
  }, [isUserActive, isTyping, nextSlide, isMobile]);

  // Handle click interactions for navigation
  const handleNavClick = useCallback((handler) => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    handler();
  }, [hasUserInteracted]);

  // Get the typed quote for current slide, or full quote if done typing or user inactive
  const getCurrentQuote = (slideIndex) => {
    if (!isUserActive || (slideIndex === currentIndex && typedQuotes[slideIndex])) {
      return typedQuotes[slideIndex] || slides[slideIndex].quote;
    }
    return slides[slideIndex].quote;
  };

  // Handle container click for initial interaction
  const handleContainerClick = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
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
        onClick={handleContainerClick}
      >
        <div className="slideshow-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="slideshow-slide"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundAttachment: isMobile ? 'scroll' : 'fixed'
              }}
            >
              <div className="slide-content">
                <div className="text-content">
                  <div className="quote-icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                    </svg>
                  </div>
                  <h2 className="quote-text">
                    {getCurrentQuote(index)}
                    {index === currentIndex && isTyping && isUserActive && (
                      <span className="typing-cursor">|</span>
                    )}
                  </h2>
                  <div className="quote-author">{slide.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          className={`nav-arrow prev-arrow ${(isAnimating || isTyping || !isUserActive) ? 'disabled' : ''}`}
          onClick={() => handleNavClick(prevSlide)}
          aria-label="Previous slide"
          disabled={isAnimating || isTyping || !isUserActive}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button 
          className={`nav-arrow next-arrow ${(isAnimating || isTyping || !isUserActive) ? 'disabled' : ''}`}
          onClick={() => handleNavClick(nextSlide)}
          aria-label="Next slide"
          disabled={isAnimating || isTyping || !isUserActive}
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
            className={`nav-dot ${index === currentIndex ? 'active' : ''} ${index === currentIndex && isTyping && isUserActive ? 'typing' : ''}`}
            onClick={() => handleNavClick(() => goToSlide(index))}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating || isTyping || !isUserActive}
          />
        ))}
      </div>
      
      {/* Show indicator when slideshow is paused due to inactivity */}
      {(!isUserActive || !hasUserInteracted) && (
        <div className="slideshow-paused-overlay">
          {!hasUserInteracted ? (
            isMobile ? "Tap to activate slideshow" : "Click to activate slideshow"
          ) : (
            "Slideshow paused - Return to view"
          )}
        </div>
      )}
    </section>
  );
};

export default HorizontalSlideshow;