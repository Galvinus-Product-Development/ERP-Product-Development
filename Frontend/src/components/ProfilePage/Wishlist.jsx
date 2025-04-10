import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Smart Watches Wood Edition",
      category: "Accessories, Clocks",
      price: "$599.00",
      image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp",
    },
    {
      id: 2,
      name: "Penatibus Parturient Orc Morbi",
      category: "Toys",
      price: "$444.00",
      image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    alert(`Moved item ${id} to cart`);
    removeFromWishlist(id);
  };

  return (
    <div className="wishlist-container">
      {wishlist.map((item) => (
        <div className="wishlist-item" key={item.id}>
          {/* Remove from Wishlist (X button) */}
          <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
            <FaTimes />
          </button>

          {/* Product Image */}
          <div className="wishlist-img-wrapper">
            <img src={item.image} alt={item.name} className="wishlist-img" />
          </div>

          {/* Wishlist Info */}
          <div className="wishlist-info">
            {/* Heart Icon */}
            

            {/* Product Details */}
            <p className="wishlist-name">{item.name}</p>
            <p className="wishlist-category">{item.category}</p>
            <p className="wishlist-price">{item.price}</p>

            {/* Move to Cart Button */}
            <div className="wishlist-actions">
            <button className="wishlist-heart-btn"><FaHeart className="cart-icon" /></button>
            
            <button className="move-to-cart" onClick={() => moveToCart(item.id)}>
              <FaShoppingCart className="cart-icon" /> 
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
