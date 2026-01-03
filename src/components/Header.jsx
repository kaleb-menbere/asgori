import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { MdMenu, MdClose, MdPhone } from "react-icons/md";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const headerRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scrollspy
      const sections = document.querySelectorAll("section");
      let scrollPos = window.scrollY + 100;
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#solutions", label: "Solutions" },
    { href: "#before-after", label: "Gallery" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header 
      className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} 
      ref={headerRef}
    >
      <div className="header-container">
        {/* Logo - Just image */}
        <div className="logo-container">
          <a href="#home" className="logo-link">
            <img
              src="/images/logoc.png"
              alt="ASGORI Finishing and Renovation"
              className="logo"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`nav-link ${activeSection === item.href.replace('#', '') ? "active" : ""}`}
            >
              {item.label}
              <span className="nav-indicator"></span>
            </a>
          ))}
          
          {/* Mobile contact button */}
          <div className="mobile-contact">
            <a href="tel:+251976957649" className="mobile-cta" onClick={() => setMenuOpen(false)}>
              <MdPhone className="phone-icon" />
              <span>Call Now</span>
            </a>
          </div>
        </nav>

        {/* Desktop contact button */}
        <div className="desktop-contact">
          <a href="tel:+251976957649" className="contact-phone">
            <MdPhone className="phone-icon" />
            <span>+251 976 957 649</span>
          </a>
          <a href="#contact" className="cta-button">
            Get Quote
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Header;