import PropTypes from "prop-types";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const item = product.ProductItems?.[0];

  return (
    
    <div className="product-card">
      <img
        src={
          item?.ProductImages?.[0]?.image_url ||
          "https://via.placeholder.com/200"
        }
        alt={product.product_name}
        className="product-image"
      />
      <h2 className="products-title">{product.product_name}</h2>
      <p className="products-price">
        ₹{item?.sale_price || item?.original_price}
        {item?.sale_price &&
          item?.original_price &&
          item.sale_price < item.original_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
      </p>
      <p
        className={`stock-statuss ${
          item?.qty_in_stocks > 0 ? "in-stock" : "out-of-stock"
        }`}
      >
        {item?.qty_in_stocks > 0 ? "In Stock" : "Out of Stock"}
      </p>
      </div >
 
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    ProductItems: PropTypes.arrayOf(
      PropTypes.shape({
        sale_price: PropTypes.number,
        original_price: PropTypes.number,
        qty_in_stocks: PropTypes.number,
        ProductImages: PropTypes.arrayOf(
          PropTypes.shape({
            image_url: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};

export default ProductCard;
