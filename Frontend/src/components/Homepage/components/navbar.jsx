import "@fontsource/lato";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-container">
      {/* Main Content Container */}
      <div className="main-content">
        {/* Dropdowns */}
        <div className="language">
          <select className="dropdown">
            <option value="en">ENGLISH</option>
            <option value="es">BENGALI</option>
            <option value="fr">HINDI</option>
          </select>
        </div>
        <div className="country">
          <select className="dropdown">
            <option value="us">COUNTRY</option>
            <option value="us">UNITED STATES</option>
            <option value="uk">UNITED KINGDOM</option>
            <option value="in">INDIA</option>
          </select>
        </div>
        {/* Text and Social Media */}
        <div className="social-container">
          <div>
            <h1 className="title">FREE SHIPPING FOR ALL ORDERS OF $150</h1>
          </div>
          <div>
            <div className="social-icons">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-instagram icon"></i>
              <i className="fab fa-youtube icon"></i>
              <i className="fab fa-skype icon"></i>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="newsletter">
          <div className="envelope">
            <i className="fa-regular fa-envelope"></i>
          </div>
          <a href="/newsletter" className="link">
            NEWSLETTER
          </a>
        </div>
        <div className="contact-us">
          <a href="/contact-us" className="link">
            CONTACT US
          </a>
        </div>
        <div className="FAQ">
          <a href="/faqs" className="link">
            FAQS
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
