import React from "react";
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaStar, FaTags, FaUser } from "react-icons/fa"; // Importing FontAwesome icons
import { useNavigate } from "react-router-dom";
import { user_id } from '../../../services/cartApi';
import "./ProfileDropdown.css";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    switch (page) {
      case "profile":
        navigate("/profile");
        break;
      case "orders":
        navigate(`/orders?user_id=${user_id}`); // Using user_id from OrderConfirmation
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
      case "coupons":
        navigate("/coupons");
        break;
      case "reviews":
        navigate("/reviews");
        break;
      case "logout":
        // Handle logout logic
        break;
      default:
        break;
    }
  };

  return (
    <div className="profile-dropdown">
    <ul>
      <li onClick={() => handleNavigation("profile")}>
        <FaUser /> My Profile
      </li>
      <li onClick={() => handleNavigation("orders")}>
        <FaShoppingCart /> My Orders
      </li>
      <li onClick={() => handleNavigation("wishlist")}>
        <FaHeart /> My Wishlist
      </li>
      <li onClick={() => handleNavigation("coupons")}>
        <FaTags /> My Coupons
      </li>
      <li onClick={() => handleNavigation("reviews")}>
        <FaStar /> My Reviews and Ratings
      </li>
      <li onClick={() => handleNavigation("logout")}>
        <FaSignOutAlt /> Logout
      </li>
    </ul>
  </div>
);
};

export default ProfileDropdown;
