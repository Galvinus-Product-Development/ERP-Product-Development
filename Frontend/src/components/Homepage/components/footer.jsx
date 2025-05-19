import React from "react";
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo-section">
          <img src="https://galvinus.com/wp-content/uploads/2023/07/Galvinus_logo.001-e1690357187933.jpeg" alt="Galvinus Logo" className="footer-logo" />
          <p className="footer-description">
            Galvinus is a global consulting and IT services company, delivering innovative solutions in SAP, Salesforce, and digital transformation.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.linkedin.com/company/galvinus" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/galvinus" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="footer-links-section">
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="/services/system-implementation">System Implementation</a></li>
              <li><a href="/services/web-development">Web Development</a></li>
              <li><a href="/services/digital-marketing">Digital Marketing</a></li>
              <li><a href="/services/e-learning">E-Learning</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <p><FaMapMarkerAlt /> 451 Wall Street, London, UK</p>
            <p><FaPhoneAlt /> +44 20 7946 0958</p>
            <p><FaEnvelope /> info@galvinus.com</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Galvinus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
