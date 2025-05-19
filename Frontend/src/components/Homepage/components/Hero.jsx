import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://img.freepik.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_hybrid&w=740",
    "https://img.freepik.com/premium-vector/digital-marketing-concept-shopping-online-mobile-application_68971-366.jpg?semt=ais_hybrid&w=740",
     //"https://woodmart.b-cdn.net/wp-content/uploads/2016/07/blog-1-furnit-1.jpg",
    "https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?semt=ais_hybrid&w=740"
  ];

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-slider">
        <img
          src={images[currentImageIndex]}
          alt="Hero Image"
          className="hero-image"
        />
      </div>

      {/* Dots for Image Navigation */}
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentImageIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
