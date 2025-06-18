import { useRef, useState } from "react";
import {
  FaBars,
  FaGlobe,
  FaHeart,
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import logo from "../../../assets/galvinus_logo.jpeg";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const categories = [
    "Electronics",
    "Fashion",
    "Home Appliances",
    "Books",
    "Toys",
  ];

  // Close dropdowns when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowDropdown(false);
  //     }

  //     if (
  //       (mobileDropdownRef.current &&
  //         !mobileDropdownRef.current.contains(event.target)) ||
  //       showDropdown
  //     ) {
  //       setShowMobileDropdown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="GALVINUS" className="logo" />
        <div
          className="categories"
          onClick={() => setShowDropdown((prev) => !prev)}
          ref={dropdownRef}
        >
          <FaBars className="icon" />
          <span>All categories</span>
          {showDropdown && (
            <ul className="dropdown">
              {categories.map((cat, index) => (
                <li key={index}>{cat}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      <div className="header-right">
        <div className="icon-text">
          <FaMapMarkerAlt />
          <span>Location</span>
        </div>
        <div className="icon-text">
          <FaGlobe />
          <span>Language</span>
        </div>
        <div className="icon-text">
          <FaUser />
          <span>Login</span>
        </div>
        <FaShoppingCart className="icon" />
        <FaHeart className="icon" />
        <div
          className="mobile-bars-icon"
          onClick={() => {
            setShowMobileDropdown((prev) => !prev);
          }}
        >
          <FaBars className="barsIcon" />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMobileDropdown && (
        <div className="mobile-dropdown" ref={mobileDropdownRef}>
          <ul className="mobile-categories">
            <div className="search-box mobile-search-box">
              <input type="text" placeholder="Search..." />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
            {categories.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
