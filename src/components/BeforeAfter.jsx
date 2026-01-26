import React, { useState } from "react";
import "./BeforeAfter.css";
import { 
  MdCompare, 
  MdHome,
  MdDesignServices,
  MdBuild
} from "react-icons/md";

const projects = [
  {
    id: 1,
    title: "Modern Villa Exterior Transformation",
    beforeVideo: "GSBoMdpwCRg",
    afterVideo: "PT88C5YV_yA",
    category: "Exterior Design & Finishing",
    description: "Complete exterior transformation with modern facade design"
  },
  {
    id: 2,
    title: "Office Building Facade Renovation",
    beforeVideo: "HACcBjqbGlQ",
    afterVideo: "GIFxsuFTLFw",
    category: "Exterior Design & Finishing",
    description: "Commercial building exterior renovation with new cladding"
  },
  {
    id: 3,
    title: "Luxury Apartment Interior Makeover",
    beforeVideo: "dyKkGC75tJk",
    afterVideo: "G8QKSi0qpeY",
    category: "Interior Design & Finishing",
    description: "Complete interior transformation with custom furniture"
  },
  {
    id: 4,
    title: "Hotel Lobby Design Transformation",
    beforeVideo: "WTIuCQE7Xpo",
    afterVideo: "zAZGGrehy5Q",
    category: "Interior Design & Finishing",
    description: "Luxury hotel lobby renovation with premium finishes"
  },
  {
    id: 5,
    title: "Complete House Structural Renovation",
    beforeVideo: "KTWx-NJPyqs",
    afterVideo: "4JFom_jC1ow",
    category: "Full Renovation",
    description: "Full structural renovation including interior and exterior"
  },
];

const BeforeAfter = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: <MdCompare />, count: projects.length },
    { name: "Exterior Design & Finishing", icon: <MdHome />, count: projects.filter(p => p.category === "Exterior Design & Finishing").length },
    { name: "Interior Design & Finishing", icon: <MdDesignServices />, count: projects.filter(p => p.category === "Interior Design & Finishing").length },
    { name: "Full Renovation", icon: <MdBuild />, count: projects.filter(p => p.category === "Full Renovation").length }
  ];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Exterior Design & Finishing":
        return <MdHome />;
      case "Interior Design & Finishing":
        return <MdDesignServices />;
      case "Full Renovation":
        return <MdBuild />;
      default:
        return <MdCompare />;
    }
  };

  // YouTube embed URL - Optimized for Shorts and mobile
  const getYouTubeEmbedUrl = (videoId) => {
    const params = new URLSearchParams({
      rel: 0,
      modestbranding: 1,
      controls: 1, // Show YouTube's native controls
      playsinline: 1, // CRITICAL: Play inline on iOS
      enablejsapi: 1,
      origin: window.location.origin,
      widget_referrer: window.location.href,
      autohide: 1,
      showinfo: 0,
      iv_load_policy: 3,
      // Mobile-specific optimizations
      fs: 1, // Allow fullscreen
      disablekb: 0, // Enable keyboard controls
    });
    
    // Use the standard embed URL for Shorts (not /shorts/)
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <section className="before-after" id="before-after">
      <div className="ba-container">
        <div className="ba-header">
          <div className="section-subtitle">Our Portfolio</div>
          <h2 className="section-title">Before & After Gallery</h2>
          <p className="section-description">
            See the transformation from start to finish. Each project showcases our commitment to quality.
          </p>
          <div className="divider"></div>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`filter-btn ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.name}</span>
              <span className="filter-count">{category.count}</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <div className="project-category">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="videos-comparison">
                {/* Before Video */}
                <div className="video-wrapper before-video">
                  <div className="video-label">
                    <span className="label-text">BEFORE</span>
                    <span className="label-sub">Original</span>
                  </div>
                  
                  <div className="video-container">
                    <iframe
                      src={getYouTubeEmbedUrl(project.beforeVideo)}
                      title={`${project.title} - Before`}
                      className="youtube-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      // Mobile-specific attributes
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                      playsInline="true"
                    />
                  </div>
                </div>

                {/* VS Divider - Hidden on mobile, shown on desktop */}
                <div className="vs-divider">
                  <div className="vs-circle">
                    <MdCompare />
                  </div>
                  <div className="vs-text">VS</div>
                </div>

                {/* After Video */}
                <div className="video-wrapper after-video">
                  <div className="video-label">
                    <span className="label-text">AFTER</span>
                    <span className="label-sub">Transformation</span>
                  </div>
                  
                  <div className="video-container">
                    <iframe
                      src={getYouTubeEmbedUrl(project.afterVideo)}
                      title={`${project.title} - After`}
                      className="youtube-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      // Mobile-specific attributes
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                      playsInline="true"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mobile Video Controls Hint */}
              <div className="mobile-hint">
                <span className="hint-text">Tap video to play/pause • Use YouTube controls</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;