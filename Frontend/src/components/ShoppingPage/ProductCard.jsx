import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product , isCarousel = false}) => {
  const navigate = useNavigate();
  const { addItem, addWishlistItem, removeWishlistItem, wishlist } = useCart();
  const item = product.ProductItems?.[0];
  const image = item?.ProductImages?.[0]?.image_url;
  const stock = item?.qty_in_stocks || 0;
  const [inWishlist, setInWishlist] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (stock === 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }
  
    try {
      await addItem(item.product_item_id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    const wishlistItem = wishlist?.WishlistItems?.find(
      (wishlistItem) => wishlistItem.product_item_id === item.product_item_id
    );
  
    if (wishlistItem) {
      // Product is already in wishlist — remove using the actual wishlist_item_id
      await removeWishlistItem(wishlistItem.id);
    } else {
      // Product not in wishlist — add it
      await addWishlistItem(item.product_item_id, product.product_id);
    }
  };
  
  
  useEffect(() => {
    const exists = wishlist?.WishlistItems?.some(
      (wishlistItem) => wishlistItem.product_item_id === item.product_item_id
    );
    setInWishlist(exists);
  }, [wishlist, item.product_item_id]);

  console.log("Selected item:", item);


  return (
    <div
      className={`product-card  ${isCarousel ? "carousel-card" : ""} ${stock === 0 ? "out-of-stock" : ""}`}
      onClick={() => navigate(`/product-details/${product.product_id}`)}
    >
      <div className="product-image">
        {image ? (
          <img src={image} alt={product.product_name} />
        ) : (
          <span>No Image</span>
        )}

        
       
      </div>

      <div className="product-info">
        <h4>{product.product_name}</h4>
        <div className="price-section">
          <span className="original-price">₹{item?.original_price}</span>
          <span className="sale-price">₹{item?.sale_price}</span>
        </div>
        <div className={`stock-status ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </div>
        <div className="icon-overlay">
        <button className="icon-btn" onClick={handleWishlist}>
        <FaHeart className={`wishlist-icon ${inWishlist ? "added" : ""}`} />

            </button>
            <button className="select-options-btn">Select Options</button>
            <button className="icon-btn" onClick={handleAddToCart}>
              <FaShoppingCart className="add-cart-icon" />
            </button>
        </div>
          
          
        </div>
      </div>
    
  );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      product_name: PropTypes.string.isRequired,
      ProductItems: PropTypes.arrayOf(
        PropTypes.shape({
          qty_in_stocks: PropTypes.number,
          original_price: PropTypes.number,
          sale_price: PropTypes.number,
          ProductImages: PropTypes.arrayOf(
            PropTypes.shape({
              image_url: PropTypes.string,
            })
          ),
        })
      ),
    }).isRequired,
    isCarousel: PropTypes.bool,
  };
  

export default ProductCard;
