import React from 'react';
import './BeforeAfter.css';

function BeforeAfter() {
  return (
    <section id="before-after" className="before-after">
      <h2>Before & After</h2>
      <div className="images">
        <div>
          <h3>Before</h3>
          <img src="/images/before.jpg" alt="Before Renovation" />
        </div>
        <div>
          <h3>After</h3>
          <img src="/images/after.jpg" alt="After Renovation" />
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
