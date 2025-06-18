import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./WishlistCard.css";

const WishlistCard = ({ item, onRemove, onMoveToCart }) => {
  const navigate = useNavigate();
  const product = item.product_info?.product;
  const productItem = item.product_info?.productItems?.[0];

  if (!product || !productItem) {
    console.warn("Product or ProductItem missing in wishlist item:", item);
    return <div className="wishlist-card">Product data not available</div>;
  }
  const image = productItem?.ProductImages?.[0]?.image_url;
  const stock = productItem?.qty_in_stocks || 0;

  return (
    <div
      className={`wishlist-card ${stock === 0 ? "out-of-stock" : ""}`}
      onClick={() => navigate(`/product-details/${product.product_id}`)}
    >
      {/* Remove Button - Top Right */}
      <button
        className="wishlist-remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        title="Remove from Wishlist"
      >
        <FaTimes />
      </button>

      {/* Product Image */}
      <div className="wishlist-card-image">
        {image ? (
          <img src={image} alt={product.product_name} />
        ) : (
          <span>No Image</span>
        )}
      </div>

      {/* Product Info */}
      <div className="wishlist-card-info">
        <h4>{product.product_name}</h4>
        <p className="wishlist-brand">{product.Brand?.brand_name}</p>
        <p className="wishlist-category">
          {product.ProductCategory?.category_name}
        </p>
        <div className="price-section">
          <span className="original-price">₹{productItem?.original_price}</span>
          <span className="sale-price">₹{productItem?.sale_price}</span>
        </div>
        {/* <div
          className={`stock-status ${stock > 0 ? "in-stock" : "out-of-stock"}`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </div> */}
      </div>

      {/* Bottom Icons */}
      <div className="wishlist-card-bottom-icons">
        <button
          className="move-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onMoveToCart(item.id);
          }}
          title="Move to Cart"
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
};

WishlistCard.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveToCart: PropTypes.func.isRequired,
};

export default WishlistCard;
