import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-links-section">
          <div className="footer-column">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Policies</h4>
            <ul>
              <li>
                <a href="#">T&C</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Cancellation & Return</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Payments</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Get Support</h4>
            <ul>
              <li>
                <a href="#">Help Centre</a>
              </li>
              <li>
                <a href="#">Live Chat</a>
              </li>
              <li>
                <a href="#">Refund</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-right-section">
          <h4>Registered Office Address</h4>
          <p>
            AECS B Block, Wellington Paradise, Begur, Singasandra, Bengaluru,
            Karnataka 560068, India
          </p>

          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2025 Galvinus. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
