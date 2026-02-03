import React, { useState, useEffect, useRef } from "react";
import "./HorizontalSlideshow.css";

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

export default function HorizontalSlideshow() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const typingRef = useRef(null);
  const startX = useRef(0);

  /* TYPEWRITER */
  useEffect(() => {
    clearTimeout(typingRef.current);
    setText("");

    let i = 0;
    const type = () => {
      setText(slides[index].quote.slice(0, i + 1));
      i++;
      if (i < slides[index].quote.length) {
        typingRef.current = setTimeout(type, 30);
      }
    };
    type();

    return () => clearTimeout(typingRef.current);
  }, [index]);

  /* AUTO PLAY */
  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [index]);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  /* SWIPE */
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section
      className="asgorri-slideshow"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="asgorri-slideshow-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="asgorri-slideshow-slide"
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="asgorri-slideshow-content">
              <h2 className="asgorri-slideshow-quote">
                {i === index ? text : s.quote}
                {i === index && <span className="asgorri-slideshow-cursor">|</span>}
              </h2>
              <p className="asgorri-slideshow-author">{s.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIOUS */}
      <button className="asgorri-slideshow-nav asgorri-slideshow-nav-left" onClick={prev} aria-label="Previous slide">
        ‹
      </button>

      {/* NEXT */}
      <button className="asgorri-slideshow-nav asgorri-slideshow-nav-right" onClick={next} aria-label="Next slide">
        ›
      </button>
    </section>
  );
}