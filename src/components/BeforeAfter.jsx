import React, { useState, useRef, useEffect } from "react";
import "./BeforeAfter.css";
import { 
  MdCompare, 
  MdPlayArrow, 
  MdPause, 
  MdVolumeUp, 
  MdVolumeOff,
  MdHome,
  MdDesignServices,
  MdBuild,
  MdError,
  MdVideocam
} from "react-icons/md";

const projects = [
  {
    id: 1,
    title: "Modern Villa Exterior Transformation",
    beforeVideo: "/Vid/A1.MOV",
    afterVideo: "/Vid/A2.MOV",
    category: "Exterior Design & Finishing",
    description: "Complete exterior transformation with modern facade design",
    isLandscape: true // Set based on your video orientation
  },
  {
    id: 2,
    title: "Office Building Facade Renovation",
    beforeVideo: "/Vid/B1.MOV",
    afterVideo: "/Vid/B2.MOV",
    category: "Exterior Design & Finishing",
    description: "Commercial building exterior renovation with new cladding",
    isLandscape: true
  },
  {
    id: 3,
    title: "Luxury Apartment Interior Makeover",
    beforeVideo: "/Vid/C1.MOV",
    afterVideo: "/Vid/C2.MOV",
    category: "Interior Design & Finishing",
    description: "Complete interior transformation with custom furniture",
    isLandscape: false // Portrait mode
  },
  {
    id: 4,
    title: "Hotel Lobby Design Transformation",
    beforeVideo: "/Vid/D1.MOV",
    afterVideo: "/Vid/D2.MOV",
    category: "Interior Design & Finishing",
    description: "Luxury hotel lobby renovation with premium finishes",
    isLandscape: false
  },
  {
    id: 5,
    title: "Complete House Structural Renovation",
    beforeVideo: "/Vid/E1.MOV",
    afterVideo: "/Vid/E2.MOV",
    category: "Full Renovation",
    description: "Full structural renovation including interior and exterior",
    isLandscape: true
  },
];

const BeforeAfter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videoStates, setVideoStates] = useState(
    projects.reduce((acc, project, index) => {
      acc[index] = { 
        before: false, 
        after: false, 
        muted: { before: true, after: true },
        loading: { before: true, after: true },
        error: { before: false, after: false }
      };
      return acc;
    }, {})
  );

  const videoRefs = useRef({});

  // Pause all videos except the current one
  const toggleVideo = (index, type) => {
    const newVideoStates = { ...videoStates };
    
    // Pause all videos first
    Object.keys(newVideoStates).forEach(i => {
      newVideoStates[i].before = false;
      newVideoStates[i].after = false;
      Object.keys(videoRefs.current).forEach(key => {
        if (videoRefs.current[key]) {
          videoRefs.current[key].pause();
        }
      });
    });
    
    // Now play the clicked video if it was paused
    if (!videoStates[index][type]) {
      newVideoStates[index][type] = true;
      const videoKey = `${index}-${type}`;
      if (videoRefs.current[videoKey]) {
        videoRefs.current[videoKey].play().catch(err => {
          console.error("Error playing video:", err);
          newVideoStates[index].error[type] = true;
          setVideoStates(newVideoStates);
        });
      }
    }
    
    setVideoStates(newVideoStates);
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

  const handleVideoLoaded = (index, type) => {
    const newVideoStates = { ...videoStates };
    newVideoStates[index].loading[type] = false;
    
    // Check video dimensions to determine orientation
    const videoKey = `${index}-${type}`;
    const video = videoRefs.current[videoKey];
    if (video) {
      const isLandscape = video.videoWidth > video.videoHeight;
      console.log(`Video ${type} dimensions: ${video.videoWidth}x${video.videoHeight}, Landscape: ${isLandscape}`);
    }
    
    setVideoStates(newVideoStates);
  };

  const handleVideoError = (index, type) => {
    const newVideoStates = { ...videoStates };
    newVideoStates[index].loading[type] = false;
    newVideoStates[index].error[type] = true;
    setVideoStates(newVideoStates);
  };

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

  const categories = [
    { name: "All", icon: <MdCompare />, count: projects.length },
    { name: "Exterior Design & Finishing", icon: <MdHome />, count: projects.filter(p => p.category === "Exterior Design & Finishing").length },
    { name: "Interior Design & Finishing", icon: <MdDesignServices />, count: projects.filter(p => p.category === "Interior Design & Finishing").length },
    { name: "Full Renovation", icon: <MdBuild />, count: projects.filter(p => p.category === "Full Renovation").length }
  ];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.keys(videoRefs.current).forEach(key => {
        if (videoRefs.current[key]) {
          videoRefs.current[key].pause();
        }
      });
    };
  }, []);

  return (
    <section className="before-after" id="before-after">
      <div className="ba-container">
        <div className="ba-header">
          <div className="section-subtitles">Our Transformations</div>
          <h2 className="section-titles">Before & After Gallery</h2>
          <p className="section-descriptions">
            Witness our remarkable transformations. Each project showcases our expertise in renovation and design.
          </p>
          <div className="section-divider"></div>
          <p className="video-aspect-note">
            <MdVideocam /> Videos captured on mobile devices for authentic documentation
          </p>
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

        <div className="ba-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="ba-card">
              <div className="card-header">
                <div className="project-category">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="videos-container">
                {/* Before Video */}
                <div className={`video-column before-column ${project.isLandscape ? 'landscape-video' : ''}`}>
                  <div className="video-wrapper">
                    <div className="video-label">
                      <span className="label-text">Before</span>
                      <span className="label-subtext">Original State</span>
                    </div>
                    
                    {/* Video Loading Spinner */}
                    {videoStates[index]?.loading?.before && !videoStates[index]?.error?.before && (
                      <div className="loading-spinner"></div>
                    )}
                    
                    {/* Video Error Message */}
                    {videoStates[index]?.error?.before && (
                      <div className="video-error">
                        <MdError size={40} />
                        <p>Video failed to load</p>
                        <small>Path: {project.beforeVideo}</small>
                      </div>
                    )}
                    
                    <video
                      ref={el => videoRefs.current[`${index}-before`] = el}
                      className="video-element"
                      loop
                      muted={videoStates[index]?.muted?.before}
                      playsInline
                      preload="auto"
                      onLoadedData={() => handleVideoLoaded(index, 'before')}
                      onError={() => handleVideoError(index, 'before')}
                    >
                      <source src={project.beforeVideo} type="video/mp4" />
                      <source src={project.beforeVideo} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <div className="video-overlay">
                      <div className="video-controls">
                        <button 
                          className={`control-btn play-btn ${videoStates[index]?.before ? 'playing' : ''}`}
                          onClick={() => toggleVideo(index, 'before')}
                          aria-label={videoStates[index]?.before ? "Pause before video" : "Play before video"}
                          disabled={videoStates[index]?.error?.before}
                        >
                          {videoStates[index]?.before ? <MdPause /> : <MdPlayArrow />}
                        </button>
                        <button 
                          className="control-btn volume-btn"
                          onClick={() => toggleMute(index, 'before')}
                          aria-label={videoStates[index]?.muted?.before ? "Unmute before video" : "Mute before video"}
                          disabled={videoStates[index]?.error?.before}
                        >
                          {videoStates[index]?.muted?.before ? <MdVolumeOff /> : <MdVolumeUp />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="vertical-divider">
                  <div className="divider-icon">
                    <MdCompare />
                  </div>
                  <div className="divider-text">TRANSFORMATION</div>
                </div>

                {/* After Video */}
                <div className={`video-column after-column ${project.isLandscape ? 'landscape-video' : ''}`}>
                  <div className="video-wrapper">
                    <div className="video-label">
                      <span className="label-text">After</span>
                      <span className="label-subtext">Our Work</span>
                    </div>
                    
                    {/* Video Loading Spinner */}
                    {videoStates[index]?.loading?.after && !videoStates[index]?.error?.after && (
                      <div className="loading-spinner"></div>
                    )}
                    
                    {/* Video Error Message */}
                    {videoStates[index]?.error?.after && (
                      <div className="video-error">
                        <MdError size={40} />
                        <p>Video failed to load</p>
                        <small>Path: {project.afterVideo}</small>
                      </div>
                    )}
                    
                    <video
                      ref={el => videoRefs.current[`${index}-after`] = el}
                      className="video-element"
                      loop
                      muted={videoStates[index]?.muted?.after}
                      playsInline
                      preload="auto"
                      onLoadedData={() => handleVideoLoaded(index, 'after')}
                      onError={() => handleVideoError(index, 'after')}
                    >
                      <source src={project.afterVideo} type="video/mp4" />
                      <source src={project.afterVideo} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <div className="video-overlay">
                      <div className="video-controls">
                        <button 
                          className={`control-btn play-btn ${videoStates[index]?.after ? 'playing' : ''}`}
                          onClick={() => toggleVideo(index, 'after')}
                          aria-label={videoStates[index]?.after ? "Pause after video" : "Play after video"}
                          disabled={videoStates[index]?.error?.after}
                        >
                          {videoStates[index]?.after ? <MdPause /> : <MdPlayArrow />}
                        </button>
                        <button 
                          className="control-btn volume-btn"
                          onClick={() => toggleMute(index, 'after')}
                          aria-label={videoStates[index]?.muted?.after ? "Unmute after video" : "Mute after video"}
                          disabled={videoStates[index]?.error?.after}
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