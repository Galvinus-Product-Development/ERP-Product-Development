import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user_id } from '../../services/cartApi';
import { useCart } from "../Context/CartContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, productItems }) => {

  const navigate = useNavigate(); 
  const { addItem } = useCart();  // Access addToCart function from context
  const [quantity, setQuantity] = useState(1); 
  const [selectedColor, setSelectedColor] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [selectedVariant, setSelectedVariant] = useState(null);
const [isAdding, setIsAdding] = useState(false);

// Build variant availability map
const availabilityMap = {};
productItems.forEach(item => {
  const colour = item.Colour?.colour_name;
  const size = item.SizeOption?.size_name;
  if (!colour || !size) return;

  if (!availabilityMap[colour]) {
    availabilityMap[colour] = new Set();
  }
  availabilityMap[colour].add(size);
});

// Extract all unique colours and sizes
const colors = [...new Set(productItems.map(item => item.Colour?.colour_name).filter(Boolean))];
const sizes = [...new Set(productItems.map(item => item.SizeOption?.size_name).filter(Boolean))];



  useEffect(() => {
    if (selectedColor && selectedSize) {
      const match = productItems.find(
        (item) =>
          item.Colour?.colour_name === selectedColor &&
          item.SizeOption?.size_name === selectedSize
      );
      setSelectedVariant(match|| null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedColor, selectedSize, productItems]);
  
  
   const handleQuantityChange = (type) => {
    setQuantity((prev) =>{
      if (type === "increment") {
        if (selectedVariant && prev >= selectedVariant.qty_in_stocks) {
          return prev; // Don't exceed stock
        }
        return prev + 1;
      } else {
        return Math.max(prev - 1, 1);
      }
    });
  };

  const handleAddToCartAndNavigate = async () => {
    if (!selectedVariant) {
      alert("Please select a color and size first.");
      return;
    }
  
    try {
      console.log("Adding item to cart...");
      await addItem(selectedVariant.product_item_id, quantity);
      console.log("Item added. Navigating...");
      navigate(`/cart/${user_id}`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const displayVariant = selectedVariant || productItems?.[0];
  const newPrice = displayVariant?.sale_price;
  const oldPrice = displayVariant?.original_price;
  const isAvailable = product.status === "available" && displayVariant?.qty_in_stocks > 0;
 

  

  return (
    <div className="product-info">
      <h1 className="product-title">{product.product_name}</h1>
      <div className="product-rating">
        <span className="rating-stars">★★★★☆</span> {/* Star Rating */}
        <span className="rating-count">(50 Reviews)</span>
      </div>
      <div className="price-section">
        {newPrice && newPrice !== oldPrice ?(
          <>
            <span className="old-price">${oldPrice}</span>
            <span className="new-price">${newPrice}</span>
          </>
        ) : (
          <span className="new-price">${oldPrice}</span>
        )}
      </div>
      <p className={`stock-status ${isAvailable ? "in-stock" : "out-of-stock"}`}>
  {isAvailable ? "In Stock" : "Out of Stock"}
</p>
<div className="variant-selectors">
        {/* ✅ Color Selection */}
        <div className="color-options">
          <h4>Colors:</h4>
          {colors.map((color, index) => {
            const isDisabled =
              selectedSize &&
              !productItems.some(
                item =>
                  item.Colour?.colour_name === color &&
                  item.SizeOption?.size_name === selectedSize
              );

            const isSelected = selectedColor === color;

            const handleColorClick = () => {
              if (isDisabled) return;

              if (isSelected) {
                setSelectedColor(null);
                setSelectedSize(null);
              } else {
                setSelectedColor(color);
                if (selectedSize && !availabilityMap[color]?.has(selectedSize)) {
                  setSelectedSize(null);
                }
              }
            };

            return (
              <span
                key={index}
                className={`color-box ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                style={{ backgroundColor: color }}
                onClick={handleColorClick}
                title={isDisabled ? "Not available in selected size" : color}
              />
            );
          })}
        </div>

        {/* ✅ Size Selection */}
        <div className="size-options">
          <h4>Sizes:</h4>
          {sizes.map((size, index) => {
            const isDisabled =
              selectedColor && !availabilityMap[selectedColor]?.has(size);

            const isSelected = selectedSize === size;

            const handleSizeClick = () => {
              if (isDisabled) return;

              if (isSelected) {
                setSelectedSize(null);
                setSelectedColor(null);
              } else {
                setSelectedSize(size);

                const isColorValid = productItems.some(
                  item =>
                    item.Colour?.colour_name === selectedColor &&
                    item.SizeOption?.size_name === size
                );
                if (selectedColor && !isColorValid) {
                  setSelectedColor(null);
                }
              }
            };

            return (
              <span
                key={index}
                className={`size-box ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                onClick={handleSizeClick}
                title={isDisabled ? "Not available in selected color" : size}
              >
                {size}
              </span>
            );
          })}
        </div>
      </div>


      <div className="quantity-sector">
      <div className="product-actions">
        <button className="action-button">
          <i className="fas fa-heart"></i> Add to Wishlist
        </button>

      </div>
        <button onClick={() => handleQuantityChange("decrement")}  className="quantity-button" disabled={quantity <= 1}>-</button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={() => handleQuantityChange("increment")}  className="quantity-button" disabled={
    !selectedVariant || quantity >= selectedVariant.qty_in_stocks}>+</button>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCartAndNavigate}
          disabled={!selectedVariant  || !isAvailable} >
        {isAdding ? "ADDING..." : "ADD TO CART"}
      </button>
      </div>
     

      {/*!-- Compare, Wishlist, Size Guide --*/}
 
  {/*!-- SKU and Categories --*/}
  <div className="product-meta">
    <p><strong>Brand:</strong> {product.Brand?.brand_name}</p>
    <p><strong>Category:</strong> {product.ProductCategory?.category_name}</p>
  </div>

  {/*!-- Share Section --*/}
  <div className="share-section">
  <p><strong>Share:</strong></p>
    <a href="#" className="share-icon"><i className="fab fa-facebook"></i></a>
    <a href="#" className="share-icon"><i className="fab fa-twitter"></i></a>
    <a href="#" className="share-icon"><i className="fab fa-linkedin"></i></a>
    <a href="#" className="share-icon"><i className="fab fa-pinterest"></i></a>
  </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    Brand: PropTypes.shape({
      brand_name: PropTypes.string,
    }),
    ProductCategory: PropTypes.shape({
      category_name: PropTypes.string,
    }),
  }).isRequired,
  productItems: PropTypes.arrayOf(
    PropTypes.shape({
      product_item_id: PropTypes.string,
      sale_price: PropTypes.string,
      original_price: PropTypes.string,
      qty_in_stocks: PropTypes.number,
      Colour: PropTypes.shape({
        colour_name: PropTypes.string,
      }),
      SizeOption: PropTypes.shape({
        size_name: PropTypes.string,
      }),
    })
  ).isRequired,

  };

export default ProductInfo;
