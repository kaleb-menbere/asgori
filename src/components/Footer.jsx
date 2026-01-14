import React from "react";
import "./Footer.css";
import { 
  MdPhone, 
  MdEmail, 
  MdLocationOn, 
  MdArrowUpward,
  MdAccessTime,
  MdSecurity,
  MdVerified,
  MdPayment,
  MdPhotoCamera,
  MdShare,
  MdBusiness,
  MdSchedule,
  MdGroups,
  MdDesignServices,
  MdHomeRepairService,
  MdConstruction
} from "react-icons/md";
import { 
  FaFacebook, 
  FaTiktok, 
  FaInstagram, 
  FaLinkedin, 
  FaTelegram,
  FaYoutube
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Back to Top */}
      <div className="footer-top">
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <MdArrowUpward size={20} />
          <span>Back to Top</span>
        </button>
      </div>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/images/logoc.png" 
                alt="ASGORRI Finishing and Renovation" 
                className="logo-footer"
              />
              <div className="logo-text">
                <h3>ASGORRI</h3>
                <p>Finishing & Renovation</p>
              </div>
            </div>
            <p className="company-description">
              Premium finishing and renovation services across Ethiopia. 
              Transforming spaces with innovative design and superior craftsmanship since 2013.
            </p>
            
            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <div>
                  <span className="contact-label">Call Us</span>
                  <div className="contact-values">
                    <a href="tel:+251925476368" className="contact-value">+251 925 476 368</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <div>
                  <span className="contact-label">Email Us</span>
                  <div className="contact-values">
                    <a href="mailto:info@asgorri.com" className="contact-value">info@asgorri.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <MdLocationOn className="contact-icon" />
                <div>
                  <span className="contact-label">Our Offices</span>
                  <div className="contact-values">
                    <span className="contact-value">Main Office: Bole, Addis Ababa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#before-after">Project Gallery</a></li>
              <li><a href="#testimonials">Client Reviews</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="section-title">Our Services</h4>
            <ul className="footer-links">
              <li><a href="#services"><MdDesignServices /> Interior Design and Finishing</a></li>
              <li><a href="#services"><MdBusiness /> Exterior Design and Finishing</a></li>
              <li><a href="#services"><MdConstruction /> Complete Renovation</a></li>
            </ul>
          </div>

          {/* Business Hours & Newsletter */}
          <div className="footer-section">
            <h4 className="section-title">Business Hours</h4>
            <div className="business-hours">
              <div className="hours-item">
                <span className="days">Mon - Fri</span>
                <span className="time">8:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="days">Saturday</span>
                <span className="time">9:00 AM - 4:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="days">Sunday</span>
                <span className="time">By Appointment</span>
              </div>
              <div className="hours-item">
                <span className="days">Emergency</span>
                <span className="time">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} ASGORRI Finishing and Renovation PLC. 
              All rights reserved. 
            </p>
          </div>
          
          <div className="footer-bottom-right">
            {/* Social Links - Using proper social media icons */}
            <div className="social-links">
              <span className="social-label">Connect With Us:</span>
              <div className="social-icons">
                <a 
                  href="https://facebook.com/asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a 
                  href="https://tiktok.com/@asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="TikTok"
                >
                  <FaTiktok size={18} />
                </a>
                <a 
                  href="https://instagram.com/asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://linkedin.com/company/asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a 
                  href="https://telegram.me/asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Telegram"
                >
                  <FaTelegram size={18} />
                </a>
                <a 
                  href="https://youtube.com/@asgori" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="YouTube"
                >
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;