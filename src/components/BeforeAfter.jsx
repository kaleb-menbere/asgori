import React, { useState, useRef } from "react";
import "./BeforeAfter.css";
import { MdCompare, MdPlayArrow, MdPause, MdVolumeUp, MdVolumeOff } from "react-icons/md";

// Example projects with videos
const projects = [
  {
    id: 1,
    title: "Modern Villa Exterior",
    beforeVideo: "/Vid/A1.MOV",
    afterVideo: "/Vid/A2.MOV",
    category: "Exterior design and Finishing",
    description: "Complete exterior transformation with modern facade and landscaping"
  },
  {
    id: 2,
    title: "Office Building Facade",
    beforeVideo: "/Vid/B1.MOV",
    afterVideo: "/Vid/B2.MOV",
    category: "Exterior design and Finishing",
    description: "Commercial building exterior renovation with new cladding"
  },
  {
    id: 3,
    title: "Luxury Apartment Interior",
    beforeVideo: "/videos/before-interior.mp4",
    afterVideo: "/videos/after-interior.mp4",
    category: "Interior design and Finishing",
    description: "Complete interior makeover with custom furniture and lighting"
  },
  {
    id: 4,
    title: "Hotel Lobby Design",
    beforeVideo: "/videos/before-hotel-interior.mp4",
    afterVideo: "/videos/after-hotel-interior.mp4",
    category: "Interior design and Finishing",
    description: "Luxury hotel lobby renovation with premium finishes"
  },
  {
    id: 5,
    title: "Complete House Renovation",
    beforeVideo: "/videos/before-renovation.mp4",
    afterVideo: "/videos/after-renovation.mp4",
    category: "Full Renovation",
    description: "Full structural renovation including interior and exterior"
  },
  {
    id: 6,
    title: "Commercial Space Remodel",
    beforeVideo: "/videos/before-commercial-renovation.mp4",
    afterVideo: "/videos/after-commercial-renovation.mp4",
    category: "Full Renovation",
    description: "Complete commercial space transformation"
  },
];

const BeforeAfter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videoStates, setVideoStates] = useState(
    projects.reduce((acc, project, index) => {
      acc[index] = { before: false, after: false, muted: { before: true, after: true } };
      return acc;
    }, {})
  );

  const videoRefs = useRef({});

  const toggleVideo = (index, type) => {
    const newVideoStates = { ...videoStates };
    newVideoStates[index][type] = !newVideoStates[index][type];
    setVideoStates(newVideoStates);

    const videoKey = `${index}-${type}`;
    if (videoRefs.current[videoKey]) {
      if (newVideoStates[index][type]) {
        videoRefs.current[videoKey].play();
      } else {
        videoRefs.current[videoKey].pause();
      }
    }
  };

  const toggleMute = (index, type) => {
    const newVideoStates = { ...videoStates };
    newVideoStates[index].muted[type] = !newVideoStates[index].muted[type];
    setVideoStates(newVideoStates);

    const videoKey = `${index}-${type}`;
    if (videoRefs.current[videoKey]) {
      videoRefs.current[videoKey].muted = newVideoStates[index].muted[type];
    }
  };

  const categories = ["All", "Exterior design and Finishing", "Interior design and Finishing", "Full Renovation"];
  
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

              {/* Side by Side Videos Container */}
              <div className="videos-container">
                {/* Before Video */}
                <div className="video-column before-column">
                  <div className="video-wrapper">
                    <video
                      ref={el => videoRefs.current[`${index}-before`] = el}
                      className="video-element"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={project.beforeVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay">
                      <div className="video-title">Before</div>
                      <div className="video-controls">
                        <button 
                          className="control-btn play-btn"
                          onClick={() => toggleVideo(index, 'before')}
                          aria-label={videoStates[index]?.before ? "Pause before video" : "Play before video"}
                        >
                          {videoStates[index]?.before ? <MdPause /> : <MdPlayArrow />}
                        </button>
                        <button 
                          className="control-btn volume-btn"
                          onClick={() => toggleMute(index, 'before')}
                          aria-label={videoStates[index]?.muted?.before ? "Unmute before video" : "Mute before video"}
                        >
                          {videoStates[index]?.muted?.before ? <MdVolumeOff /> : <MdVolumeUp />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="vertical-divider">
                  <div className="divider-line"></div>
                  <div className="divider-text">VS</div>
                  <div className="divider-line"></div>
                </div>

                {/* After Video */}
                <div className="video-column after-column">
                  <div className="video-wrapper">
                    <video
                      ref={el => videoRefs.current[`${index}-after`] = el}
                      className="video-element"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={project.afterVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay">
                      <div className="video-title">After</div>
                      <div className="video-controls">
                        <button 
                          className="control-btn play-btn"
                          onClick={() => toggleVideo(index, 'after')}
                          aria-label={videoStates[index]?.after ? "Pause after video" : "Play after video"}
                        >
                          {videoStates[index]?.after ? <MdPause /> : <MdPlayArrow />}
                        </button>
                        <button 
                          className="control-btn volume-btn"
                          onClick={() => toggleMute(index, 'after')}
                          aria-label={videoStates[index]?.muted?.after ? "Unmute after video" : "Mute after video"}
                        >
                          {videoStates[index]?.muted?.after ? <MdVolumeOff /> : <MdVolumeUp />}
                        </button>
                      </div>
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