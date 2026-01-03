import { useState, useRef, useEffect } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const headerRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Scrollspy effect
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let scrollPos = window.scrollY + 80; // adjust for header height
      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">

        {/* Logo */}
        <div className="logo-container">
          <img
            src="/images/logoc.png"
            alt="ASGORI Finishing and Renovation Logo"
            className="logo"
          />
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className={activeSection === "hero" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
            className={activeSection === "services" ? "active" : ""}
          >
            Services
          </a>
          <a
            href="#solutions"
            onClick={() => setMenuOpen(false)}
            className={activeSection === "solutions" ? "active" : ""}
          >
            Solutions
          </a>
          <a
            href="#before-after"
            onClick={() => setMenuOpen(false)}
            className={activeSection === "before-after" ? "active" : ""}
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          Menu
        </button>

      </div>
    </header>
  );
}

export default Header;
