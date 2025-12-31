import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const reviews = [
    { name: 'John Doe', feedback: 'Excellent work, very professional!' },
    { name: 'Mary Smith', feedback: 'Our home looks amazing after renovation!' },
    { name: 'Ali Ahmed', feedback: 'Reliable, timely, and top-quality finishing.' },
  ];

  return (
    <section id="testimonials" className="testimonials">
      <h2>Testimonials</h2>
      <div className="reviews">
        {reviews.map((r, idx) => (
          <div key={idx} className="review">
            <p>"{r.feedback}"</p>
            <h4>- {r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
