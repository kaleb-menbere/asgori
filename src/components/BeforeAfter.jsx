import React, { useState } from "react";
import "./BeforeAfter.css";
import { MdArrowBack, MdArrowForward, MdCompare } from "react-icons/md";

// Example projects
const projects = [
  {
    id: 1,
    title: "Living Room Transformation",
    before: "/images/before-living.jpg",
    after: "/images/after-living.jpg",
    category: "Residential",
    description: "Complete modern makeover with custom furniture and lighting"
  },
  {
    id: 2,
    title: "Kitchen Renovation",
    before: "/images/before-kitchen.jpg",
    after: "/images/after-kitchen.jpg",
    category: "Kitchen",
    description: "Premium cabinet installation with marble countertops"
  },
  {
    id: 3,
    title: "Office Space Modernization",
    before: "/images/before-office.jpg",
    after: "/images/after-office.jpg",
    category: "Commercial",
    description: "Open-plan office design with ergonomic solutions"
  },
  {
    id: 4,
    title: "Bathroom Upgrade",
    before: "/images/before-bathroom.jpg",
    after: "/images/after-bathroom.jpg",
    category: "Bathroom",
    description: "Luxury bathroom renovation with premium fixtures"
  },
];

const BeforeAfter = () => {
  const [activeSlider, setActiveSlider] = useState(Array(projects.length).fill(50));
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSliderChange = (index, value) => {
    const newSliders = [...activeSlider];
    newSliders[index] = value;
    setActiveSlider(newSliders);
  };

  const categories = ["All", "Residential", "Kitchen", "Commercial", "Bathroom"];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="before-after" id="before-after">
      <div className="ba-container">
        {/* Section Header */}
        <div className="ba-header">
          <div className="section-subtitles">Our Work</div>
          <h2 className="section-titles">Transformation Gallery</h2>
          <p className="section-descriptions">
            Witness the remarkable transformations we've delivered for our satisfied clients.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="ba-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="ba-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="project-category">
                  <MdCompare className="category-icon" />
                  <span>{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Slider Container */}
              <div className="slider-wrapper">
                <div className="slider-container">
                  {/* After Image */}
                  <img 
                    src={project.after} 
                    alt={`${project.title} After`} 
                    className="after-img" 
                    loading="lazy"
                  />

                  {/* Before Image Overlay */}
                  <div
                    className="before-img-wrapper"
                    style={{ width: `${activeSlider[index]}%` }}
                  >
                    <img 
                      src={project.before} 
                      alt={`${project.title} Before`} 
                      className="before-img" 
                      loading="lazy"
                    />
                  </div>

                  {/* Slider Controls */}
                  <div className="slider-controls">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={activeSlider[index]}
                      className="ba-slider"
                      onChange={(e) => handleSliderChange(index, e.target.value)}
                      aria-label="Before/After slider"
                    />
                    
                    {/* Custom Slider Thumb */}
                    <div 
                      className="slider-handle" 
                      style={{ left: `${activeSlider[index]}%` }}
                    >
                      <div className="handle-dot"></div>
                      <div className="handle-label">
                        {activeSlider[index]}%
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="slider-labels">
                      <span className="label label-before">
                        <MdArrowBack />
                        Before
                      </span>
                      <span className="label label-after">
                        After
                        <MdArrowForward />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;