import React, { useState, useRef, useEffect } from "react";
import "./BeforeAfter.css";

// Example projects
const projects = [
  {
    id: 1,
    title: "Living Room Renovation",
    before: "/images/before-living.jpg",
    after: "/images/after-living.jpg",
  },
  {
    id: 2,
    title: "Kitchen Renovation",
    before: "/images/before-kitchen.jpg",
    after: "/images/after-kitchen.jpg",
  },
  {
    id: 3,
    title: "Office Space Renovation",
    before: "/images/before-office.jpg",
    after: "/images/after-office.jpg",
  },
];

const BeforeAfter = () => {
  const [sliderValue, setSliderValue] = useState(50); // initial slider position

  return (
    <section className="before-after" id="before-after">
      <h2>Before & After</h2>
      <div className="gallery-container">
        {projects.map((project) => (
          <div key={project.id} className="gallery-item">
            <h3>{project.title}</h3>
            <div className="slider-container">
              {/* After Image */}
              <img src={project.after} alt={`${project.title} After`} className="after-img" />

              {/* Before Image overlay */}
              <div
                className="before-img-wrapper"
                style={{ width: `${sliderValue}%` }}
              >
                <img src={project.before} alt={`${project.title} Before`} className="before-img" />
              </div>

              {/* Slider handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                className="slider"
                onChange={(e) => setSliderValue(e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfter;
