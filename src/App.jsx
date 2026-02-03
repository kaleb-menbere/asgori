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
  const inactivityTimer = useRef(null);

  // Fade audio in/out
  const fadeVolume = (target, step = 0.01, interval = 50) => {
    if (!audioRef.current) return;
    const fade = setInterval(() => {
      const vol = audioRef.current.volume;
      if ((step > 0 && vol >= target) || (step < 0 && vol <= target)) {
        clearInterval(fade);
        if (target === 0) audioRef.current.pause();
        setIsAudioEnabled(target > 0);
      } else {
        audioRef.current.volume = Math.min(1, Math.max(0, vol + step));
      }
    }, interval);
  };

  // Check if any video is playing
  const isVideoPlaying = () => {
    const videos = document.querySelectorAll('video');
    return [...videos].some(v => !v.paused && !v.ended);
  };

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/Sound/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // start silent
    audioRef.current.preload = 'auto';

    // Try to autoplay on page load
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => fadeVolume(0.1, 0.01)) // fade in
        .catch(() => console.log('Autoplay blocked, waiting for user interaction'));
    }

    // Pause if tab is hidden, resume if visible
    const handleVisibility = () => {
      if (document.hidden) fadeVolume(0, -0.02);
      else if (!isVideoPlaying()) audioRef.current.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Pause after 2 minutes inactivity
    const resetInactivity = () => {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        if (!document.hidden && !isVideoPlaying()) fadeVolume(0, -0.02);
      }, 120000);
    };
    ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(evt =>
      document.addEventListener(evt, resetInactivity)
    );

    // Pause when video plays
    const handleVideoPlay = (e) => {
      if (e.target.tagName === 'VIDEO') fadeVolume(0, -0.02);
    };
    const handleVideoPause = (e) => {
      if (e.target.tagName === 'VIDEO') fadeVolume(0.1, 0.01);
    };
    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('pause', handleVideoPause, true);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPause, true);
      clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Manual toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) fadeVolume(0.1, 0.01);
    else fadeVolume(0, -0.02);
  };

  return (
    <div>
      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          fontSize: 24,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
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
