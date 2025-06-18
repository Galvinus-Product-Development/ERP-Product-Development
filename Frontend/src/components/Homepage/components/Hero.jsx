import React, { useEffect, useState } from "react";
import "./Hero.css";
import image1 from "../../../assets/picture7.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    image1,
    "https://woodmart.b-cdn.net/wp-content/uploads/2016/07/blog-1-furnit-1.jpg",
    image1,
    "https://img.freepik.com/premium-vector/digital-marketing-concept-shopping-online-mobile-application_68971-366.jpg?semt=ais_hybrid&w=740",
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
    <>
      <div className="hero-container">
        <div className="hero-slider">
          <img
            src={images[currentImageIndex]}
            alt="Hero Image"
            className="hero-image"
          />
        </div>
      </div>

      {/* Dots BELOW the image */}
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentImageIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Hero;
