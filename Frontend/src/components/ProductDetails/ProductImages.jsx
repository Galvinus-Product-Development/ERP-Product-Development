import PropTypes from "prop-types";
import { useState } from "react";
import "./ProductImages.css";
const ProductImages = ({ images, selectedImage, setSelectedImage }) => {

  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Slider navigation logic
  const handleNextImage = () => {
    const currentIndex = images.findIndex(img => img.image_url === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex].image_url);
  };

  const handlePreviousImage = () => {
    const currentIndex = images.findIndex(img => img.image_url === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex].image_url);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const imageContainer = e.currentTarget;
    const { left, top, width, height } = imageContainer.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setImagePosition({ x, y });
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="product-images">
      <div className="thumbnail-column">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === image.image_url ? "active" : ""}`}
            onClick={() => setSelectedImage(image.image_url)}
          />
        ))}
      </div>
      <div className="main-image-container"  
        onMouseEnter={handleZoom}  // Activate zoom on hover
        onMouseLeave={handleZoom}  // Deactivate zoom on leave
        onMouseMove={handleMouseMove}  // Move image with the mouse
        >
        <img src={selectedImage} alt="Selected Product" className={`main-image ${isZoomed ? "zoomed" : ""}`}
          style={{
            transform: isZoomed
            ? `scale(1.2) translate(-${imagePosition.x}%, -${imagePosition.y}%)`
            : "scale(1)" ,
          }} />
          {/* Navigation buttons */}
        <button className="slider-button previous" onClick={handlePreviousImage}>
          &#10094;
        </button>
        <button className="slider-button next" onClick={handleNextImage}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

ProductImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
    selectedImage: PropTypes.string.isRequired,
    setSelectedImage: PropTypes.func.isRequired,
    
  };

export default ProductImages;
