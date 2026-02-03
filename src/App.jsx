import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Solutions from './components/Solutions';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HorizontalSlideshow from './components/HorizontalSlideshow';

function App() {
  const audioRef = useRef(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const userActiveTimeout = useRef(null);
  const videoObserver = useRef(null);
  const hasUserInteracted = useRef(false);

  // Define fade functions outside useEffect so they're accessible
  const fadeOutAudio = () => {
    if (!audioRef.current) return;
    
    const fadeInterval = setInterval(() => {
      if (audioRef.current.volume > 0.01) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.02);
      } else {
        clearInterval(fadeInterval);
        audioRef.current.pause();
        audioRef.current.volume = 0.1; // Reset volume
        setIsAudioEnabled(false);
      }
    }, 50);
  };

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    
    // If audio is already playing, just update state
    if (!audioRef.current.paused) {
      setIsAudioEnabled(true);
      return;
    }
    
    // Try to play with user interaction
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Successfully started playing
        setIsAudioEnabled(true);
        
        // Fade in volume
        audioRef.current.volume = 0;
        const fadeInterval = setInterval(() => {
          if (audioRef.current.volume < 0.1) {
            audioRef.current.volume = Math.min(0.1, audioRef.current.volume + 0.01);
          } else {
            clearInterval(fadeInterval);
          }
        }, 50);
      }).catch(() => {
        // Failed to play, wait for user interaction
        console.log('Audio autoplay blocked, waiting for user interaction');
      });
    }
  };

  const pauseBackgroundAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  const resumeBackgroundAudio = () => {
    if (audioRef.current && isAudioEnabled) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silent fail
        });
      }
    }
  };

  // Check if any video is playing on the page
  const isVideoPlaying = () => {
    const videos = document.querySelectorAll('video, iframe');
    
    for (const video of videos) {
      if (video.tagName === 'VIDEO') {
        if (!video.paused && !video.ended) return true;
      } else if (video.tagName === 'IFRAME') {
        // For YouTube/Vimeo iframes
        const rect = video.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          // If iframe is visible, assume it might be playing
          if (video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Function to attempt autoplay with user interaction
  const attemptAutoplay = () => {
    if (!hasUserInteracted.current && audioRef.current && audioRef.current.paused) {
      hasUserInteracted.current = true;
      fadeInAudio();
    }
  };

  useEffect(() => {
    // Create audio once
    audioRef.current = new Audio('/Sound/music.mp3');
    audioRef.current.volume = 0.1; // 10% volume - very quiet
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';

    // Try to start playing immediately (might be blocked by browser)
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Autoplay succeeded
        console.log('Autoplay succeeded');
        setIsAudioEnabled(true);
      }).catch(() => {
        // Autoplay was blocked by browser
        console.log('Autoplay blocked, waiting for user interaction');
        setIsAudioEnabled(false);
      });
    }

    // Setup visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && audioRef.current) {
        // Pause when tab is hidden
        audioRef.current.pause();
      } else if (document.visibilityState === 'visible' && audioRef.current && isAudioEnabled) {
        // Resume when tab becomes visible again
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silent fail
          });
        }
      }
    };

    // Inactivity detection
    const resetInactivityTimer = () => {
      // Mark that user has interacted
      if (!hasUserInteracted.current) {
        hasUserInteracted.current = true;
        // Try to play audio now that user has interacted
        if (!isAudioEnabled) {
          fadeInAudio();
        }
      }
      
      clearTimeout(userActiveTimeout.current);
      
      // Start timer for 2 minutes of inactivity
      userActiveTimeout.current = setTimeout(() => {
        if (audioRef.current && !document.hidden && !audioRef.current.paused) {
          // Only fade out if no videos are playing
          if (!isVideoPlaying()) {
            fadeOutAudio();
          }
        }
      }, 120000); // 2 minutes
    };

    // Monitor video elements
    const setupVideoMonitoring = () => {
      // Watch for video play events
      document.addEventListener('play', handleVideoPlay, true);
      document.addEventListener('pause', handleVideoPause, true);
      
      // Monitor YouTube iframes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              if (node.tagName === 'IFRAME' || 
                  (node.querySelector && node.querySelector('iframe'))) {
                setupYouTubeListener(node);
              }
            });
          }
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Setup existing iframes
      document.querySelectorAll('iframe').forEach(setupYouTubeListener);
      
      return observer;
    };

    const setupYouTubeListener = (iframe) => {
      if (!iframe.src.includes('youtube')) return;
      
      // YouTube doesn't allow direct access, but we can listen to messages
      window.addEventListener('message', (event) => {
        // Check for YouTube player state changes
        if (event.source === iframe.contentWindow) {
          try {
            const data = JSON.parse(event.data);
            if (data.event === 'infoDelivery' && data.info) {
              if (data.info.playerState === 1) { // Playing
                pauseBackgroundAudio();
              } else if (data.info.playerState === 2) { // Paused
                resumeBackgroundAudio();
              }
            }
          } catch (e) {
            // Not a YouTube message or not JSON
          }
        }
      });
    };

    const handleVideoPlay = (e) => {
      if (e.target.tagName === 'VIDEO' && audioRef.current && !audioRef.current.paused) {
        pauseBackgroundAudio();
      }
    };

    const handleVideoPause = (e) => {
      if (e.target.tagName === 'VIDEO' && audioRef.current && isAudioEnabled) {
        resumeBackgroundAudio();
      }
    };

    // Initialize activity monitoring
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, { once: true, capture: true });
    });

    // Set up initial inactivity timer
    resetInactivityTimer();
    
    // Setup video monitoring
    videoObserver.current = setupVideoMonitoring();

    // Add event listeners for user interaction to enable audio
    document.addEventListener('click', attemptAutoplay);
    document.addEventListener('touchstart', attemptAutoplay);
    document.addEventListener('keydown', attemptAutoplay);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      clearTimeout(userActiveTimeout.current);
      
      // Remove event listeners
      document.removeEventListener('click', attemptAutoplay);
      document.removeEventListener('touchstart', attemptAutoplay);
      document.removeEventListener('keydown', attemptAutoplay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Remove video monitoring
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPause, true);
      
      if (videoObserver.current) {
        videoObserver.current.disconnect();
      }
      
      // Remove activity monitoring
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, { capture: true });
      });
    };
  }, [isAudioEnabled]);

  // Add a button to toggle audio manually
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      fadeInAudio();
    } else {
      fadeOutAudio();
    }
  };

  return (
    <div>
      {/* Optional: Add audio control button */}
      <button 
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={isAudioEnabled ? "Pause background music" : "Play background music"}
      >
        {isAudioEnabled ? '🔊' : '🔇'}
      </button>
      
      <Header />
      <Hero />
      <HorizontalSlideshow />
      <Services />
      <Solutions />
      <BeforeAfter />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;