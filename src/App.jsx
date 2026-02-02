import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // Create audio once
    audioRef.current = new Audio('/Sound/music.mp3');
    audioRef.current.volume = 0.1; // 10% volume - very quiet
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';

    // Start music on first click (anywhere on page)
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Silent fail if browser blocks
        });
        // Remove listener after starting
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
      }
    };

    // Stop music when page is hidden
    const stopMusic = () => {
      if (document.visibilityState === 'hidden' && audioRef.current) {
        audioRef.current.pause();
      }
    };

    // Add event listeners
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('visibilitychange', stopMusic);

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('visibilitychange', stopMusic);
    };
  }, []);

  return (
    <div>
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