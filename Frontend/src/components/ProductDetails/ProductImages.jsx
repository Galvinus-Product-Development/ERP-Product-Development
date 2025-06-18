import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { user_id } from "../../services/cartApi";
import { useCart } from "../Context/CartContext";
import "./ProductImages.css";

const ProductImages = ({
  images,
  selectedImage,
  setSelectedImage,
  product,
  selectedVariant,
  isAvailable,
}) => {
  const { addItem, addWishlistItem, removeWishlistItem, wishlist } = useCart();
  const [inWishlist, setInWishlist] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const productItem = product?.ProductItems?.[0];

  useEffect(() => {
    const wishlistItem = wishlist?.WishlistItems?.find(
      (wishlistItem) =>
        wishlistItem.product_item_id === productItem?.product_item_id
    );
    setInWishlist(!!wishlistItem);
  }, [wishlist, productItem]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setImagePosition({ x, y });
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    const wishlistItem = wishlist?.WishlistItems?.find(
      (wishlistItem) =>
        wishlistItem.product_item_id === productItem?.product_item_id
    );
    if (wishlistItem) {
      await removeWishlistItem(wishlistItem.id);
    } else {
      await addWishlistItem(productItem.product_item_id, product?.product_id);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!selectedVariant || selectedVariant.qty_in_stocks === 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }
    try {
      await addItem(selectedVariant.product_item_id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = async () => {
    if (selectedVariant) {
      await addItem(selectedVariant.product_item_id, 1);
      navigate(`/checkout/${user_id}`);
    }
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex(
      (img) => img.image_url === selectedImage
    );
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex].image_url);
  };

  const handlePreviousImage = () => {
    const currentIndex = images.findIndex(
      (img) => img.image_url === selectedImage
    );
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex].image_url);
  };

  return (
    <div className="product-images">
      <div className="thumbnail-column">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${
              selectedImage === image.image_url ? "active" : ""
            }`}
            onClick={() => setSelectedImage(image.image_url)}
          />
        ))}
      </div>

      <div className="main-image-section">
        <div
          className="main-image-container"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <FaHeart
            className={`wishlist-icon ${inWishlist ? "added" : ""}`}
            onClick={handleWishlist}
            title="Add to Wishlist"
          />
          <img src={selectedImage} alt="Selected" className="main-image" />
          <button
            className="slider-button previous"
            onClick={handlePreviousImage}
          >
            &#10094;
          </button>
          <button className="slider-button next" onClick={handleNextImage}>
            &#10095;
          </button>
        </div>

        {isZoomed && (
          <div className="zoom-preview">
            <div
              className="zoomed-image"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
              }}
            />
          </div>
        )}

        <div className="action-buttons">
          <button
            className="add-to-cart-button"
            disabled={false}
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="icon" /> Add to Cart
          </button>

          <button
            className="buy-now-button"
            disabled={false}
            onClick={handleBuyNow}
          >
            <FaBolt className="icon" /> Buy Now
          </button>
        </div>
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
  product: PropTypes.shape({
    product_id: PropTypes.number,
    ProductItems: PropTypes.arrayOf(
      PropTypes.shape({
        product_item_id: PropTypes.number.isRequired,
        qty_in_stocks: PropTypes.number,
      })
    ),
  }).isRequired,
  selectedVariant: PropTypes.object.isRequired,
  isAvailable: PropTypes.bool.isRequired,
};

export default ProductImages;
