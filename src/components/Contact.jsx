import React, { useState, useEffect } from "react";
import "./Contact.css";
import { MdEmail, MdPhone, MdLocationOn, MdSend, MdCheckCircle, MdWarning } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // New phone field
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load submission count from localStorage on component mount
  useEffect(() => {
    const storedCount = localStorage.getItem('contactFormSubmitCount');
    const lastResetDate = localStorage.getItem('contactFormResetDate');
    const today = new Date().toDateString();

    // Reset count if it's a new day
    if (lastResetDate !== today) {
      localStorage.setItem('contactFormSubmitCount', '0');
      localStorage.setItem('contactFormResetDate', today);
      setSubmitCount(0);
      setIsLimitReached(false);
    } else if (storedCount) {
      const count = parseInt(storedCount, 10);
      setSubmitCount(count);
      if (count >= 10) {
        setIsLimitReached(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limit before proceeding
    if (isLimitReached) {
      alert("Daily submission limit reached. Please try again tomorrow.");
      return;
    }

    setIsSending(true);

    try {
      const botToken = "8408802279:AAEJAYhJhwDfpbJcvl2jUd0Sh3rm5E097JI";
      const chatId = "746057611";
      
      const botMessage = `🚨 NEW CONTACT FORM 🚨
-------------------------
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}  {/* Phone added to message */}
💬 *Message:* ${formData.message}
📅 *Date:* ${new Date().toLocaleString()}
-------------------------`;
      
      // Send to Telegram bot
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: botMessage,
          parse_mode: 'Markdown'
        })
      });
      
      // Update submission count
      const newCount = submitCount + 1;
      setSubmitCount(newCount);
      localStorage.setItem('contactFormSubmitCount', newCount.toString());
      
      if (newCount >= 10) {
        setIsLimitReached(true);
      }
      
      // Success
      setIsSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind? We'll respond via Telegram within minutes.
          </p>
          <div className="contact-divider"></div>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-icon">
                <MdEmail size={28} />
              </div>
              <h3>Email Us</h3>
              <p>info@asgorri.com</p>
              <p className="info-note">Response within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <MdPhone size={28} />
              </div>
              <h3>Call Us</h3>
              <p>+251 976 957 649</p>
              <p className="info-note">Mon-Fri, 8AM-6PM</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <MdLocationOn size={28} />
              </div>
              <h3>Visit Us</h3>
              <p>Addis Ababa, Ethiopia</p>
              <p className="info-note">By appointment only</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <h3 className="form-title">Send Message via Telegram</h3>
              
              {/* Success Message */}
              {isSent && (
                <div className="success-message">
                  <MdCheckCircle size={24} />
                  <div>
                    <h4>Message Sent Successfully!</h4>
                    <p>We'll contact you via Telegram shortly.</p>
                  </div>
                </div>
              )}
              
              {/* Rate Limit Warning */}
              {isLimitReached && (
                <div className="limit-warning">
                  <MdWarning size={24} />
                  <div>
                    <h4>Daily Limit Reached</h4>
                    <p>You have submitted 10 messages today. Please try again tomorrow.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 900 000 000"
                    required
                    pattern="^\+?[\d\s\-\(\)]+$" 
                    className="form-input"
                  />
                  <small className="field-note">Include country code (e.g., +251)</small>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="5"
                    required
                    className="form-textarea"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSending || isLimitReached} 
                >
                  {isSending ? (
                    <>
                      <div className="spinner"></div>
                      Sending to Telegram...
                    </>
                  ) : isLimitReached ? (
                    "Daily Limit Reached"
                  ) : (
                    <>
                      <MdSend className="send-icon" />
                      Send via Telegram Bot ({10 - submitCount} left today)
                    </>
                  )}
                </button>
                
                <p className="telegram-note">
                  ⚡ Messages are instantly delivered to our Telegram
                  {submitCount > 0 && ` | ${submitCount}/10 submissions today`}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;