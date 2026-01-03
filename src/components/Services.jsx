import React from "react";
import "./Services.css";
import interiorImg from "/images/interior.jpg";
import exteriorImg from "/images/exterior.jpg";
import renovationImg from "/images/renovation.jpg";
import { MdDesignServices, MdRoofing, MdBuild } from "react-icons/md";

const services = [
  {
    id: 1,
    title: "Interior Design",
    description:
      "Transform your living and working spaces with stylish, functional interior solutions. Custom designs that reflect your personality and enhance daily living.",
    image: interiorImg,
    icon: <MdDesignServices />,
    features: ["Space Planning", "Custom Furniture", "Lighting Design", "Color Consultation"]
  },
  {
    id: 2,
    title: "Exterior Design",
    description:
      "Enhance building facades, landscapes, and outdoor spaces with modern, durable designs. Create stunning first impressions that last.",
    image: exteriorImg,
    icon: <MdRoofing />,
    features: ["Facade Renovation", "Landscaping", "Outdoor Lighting", "Hardscaping"]
  },
  {
    id: 3,
    title: "Full Renovation",
    description:
      "Complete residential and commercial property transformations. From concept to completion, we deliver exceptional results on time and within budget.",
    image: renovationImg,
    icon: <MdBuild />,
    features: ["Structural Work", "Modern Finishes", "Project Management", "Quality Assurance"]
  },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <div className="section-subtitles">What We Offer</div>
          <h2 className="section-titles">Premium Services</h2>
          <p className="section-descriptions">
            We deliver comprehensive finishing and renovation solutions 
            that combine aesthetic excellence with functional durability.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              {/* Image Container */}
              <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-image" />
                <div className="service-overlay">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                {/* Features List */}
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a href="#contact" className="service-cta">
                  Get Quote
                  <span className="cta-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;