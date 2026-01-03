import React from "react";
import "./Services.css";
import interiorImg from "/images/interior.jpg"; // replace with your images
import exteriorImg from "/images/exterior.jpg";
import renovationImg from "/images/renovation.jpg";

const services = [
  {
    id: 1,
    title: "Interior Design",
    description:
      "Stylish and functional interior solutions to transform your living and working spaces.",
    image: interiorImg,
  },
  {
    id: 2,
    title: "Exterior Design",
    description:
      "Enhancing building facades, landscapes, and outdoor spaces with modern designs.",
    image: exteriorImg,
  },
  {
    id: 3,
    title: "Renovation",
    description:
      "Full renovation services for residential and commercial properties, before & after transformation guaranteed.",
    image: renovationImg,
  },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
