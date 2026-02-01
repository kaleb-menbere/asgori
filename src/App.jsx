import React from 'react';
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
