import React from "react";
import "./Solutions.css";
import { MdDesignServices, MdConstruction, MdSchedule } from "react-icons/md";

const solutions = [
  {
    id: 1,
    title: "Customized Renovation Plans",
    description:
      "Personalized renovation strategies designed specifically for your space, style preferences, and budget requirements.",
    icon: <MdDesignServices />,
    color: "#c4913f"
  },
  {
    id: 2,
    title: "Premium Materials & Craftsmanship",
    description:
      "We source only the highest quality materials and employ master craftsmen for flawless execution and durable results.",
    icon: <MdConstruction />,
    color: "#2f5586"
  },
  {
    id: 3,
    title: "Timely Project Delivery",
    description:
      "Efficient project management ensures completion within agreed timelines without compromising on quality standards.",
    icon: <MdSchedule />,
    color: "#45a049"
  },
];

const Solutions = () => {
  return (
    <section className="solutions" id="solutions">
      <div className="solutions-container">
        {/* Section Header */}
        <div className="solutions-header">
          <div className="section-subtitles">Our Approach</div>
          <h2 className="section-titles">Why Choose ASGORI?</h2>
          <p className="section-descriptions">
            We combine innovative solutions with proven methodologies 
            to deliver exceptional results for every project.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Solutions Grid */}
        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div key={solution.id} className="solution-card">
              {/* Number Badge */}
              <div className="solution-number">0{index + 1}</div>
              
              {/* Icon Container */}
              <div 
                className="solution-icon" 
                style={{ background: `${solution.color}15` }}
              >
                <div 
                  className="icon-wrapper"
                  style={{ color: solution.color }}
                >
                  {solution.icon}
                </div>
              </div>

              {/* Content */}
              <div className="solution-content">
                <h3 className="solution-title">{solution.title}</h3>
                <p className="solution-description">{solution.description}</p>
              </div>

              {/* Decorative Line */}
              <div 
                className="solution-line" 
                style={{ background: solution.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="solutions-footer">
          <div className="stats-grid">
            <div className="stat-item">
              <h4>10+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h4>250+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h4>100%</h4>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat-item">
              <h4>24/7</h4>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;