import React from 'react';
import './Services.css';

function Services() {
  const services = [
    { name: 'Interior Finishing', img: '/images/interior.jpg' },
    { name: 'Exterior Finishing', img: '/images/exterior.jpg' },
    { name: 'Renovation', img: '/images/renovation.jpg' },
    { name: 'Furnishing', img: '/images/furnishing.jpg' },
  ];

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        {services.map((service, idx) => (
          <div key={idx} className="service-card">
            <img src={service.img} alt={service.name} />
            <h3>{service.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
