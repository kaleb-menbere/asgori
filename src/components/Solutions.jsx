import React from "react";
import "./Solutions.css";

const solutions = [
  {
    id: 1,
    title: "Customized Renovation Plans",
    description:
      "We create personalized renovation plans tailored to your space, style, and budget.",
  },
  {
    id: 2,
    title: "Quality Materials & Execution",
    description:
      "We source premium materials and ensure precise execution for lasting results.",
  },
  {
    id: 3,
    title: "Timely Project Delivery",
    description:
      "Our team works efficiently to complete projects on schedule without compromising quality.",
  },
];

const Solutions = () => {
  return (
    <section className="solutions" id="solutions">
      <h2>Our Solutions</h2>
      <div className="solutions-container">
        {solutions.map((solution) => (
          <div key={solution.id} className="solution-card">
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
