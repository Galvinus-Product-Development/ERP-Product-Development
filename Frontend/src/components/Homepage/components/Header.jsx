import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchSubcategories } from "../../../services/api";
import { user_id } from '../../../services/cartApi';
import { useCart } from '../../Context/CartContext';
import "./Header.css";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const dropdownTimeoutRef = useRef(null); 
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  const handleSearch = () => {
    console.log("Search Text: ", searchText);
    console.log("Selected Category: ", category);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
    // Navigate to shopping page with query param
  navigate(`/shopping-page?category=${encodeURIComponent(selectedCategory)}`);
  };
  const handleCartClick = () => {
    //const userId = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; // static for now
    navigate(`/cart/${user_id}`);
  };

  

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const fetchedCategories = await fetchCategories();  // Fetch categories from API
        setCategories(fetchedCategories);

        // Fetch subcategories for each category
        const subcategoriesData = {};
        for (const category of fetchedCategories) {
          const subcats = await fetchSubcategories(category.product_category_id);
          subcategoriesData[category.product_category_id] = subcats;
        }
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryData();

    const handleScroll = () => {
      const menuElement = document.querySelector(".header-container");
      if (menuElement) {
        setIsScrolled(window.scrollY > menuElement.offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  

  return (
    <header className={`header-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-main-content">
        {/* Logo Section */}
        <div className="logo-container" onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}>
          <img
            src="https://galvinus.com/wp-content/uploads/2023/07/Galvinus_logo.001-e1690357187933.jpeg"
            alt="Logo"
            className="logo"
          />
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
    <div
            className="custom-dropdown"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
              }
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              dropdownTimeoutRef.current = setTimeout(() => {
                setDropdownOpen(false);
              }, 300); // 300ms delay
            }}
          >
                <div className="dropdown-selected">{category}</div>
            <FaCaretDown />
            {dropdownOpen && (
          <ul
            className="dropdown-options">
              <li onClick={() => handleCategorySelect("All Categories")}>
                 All Categories
              </li>

       {categories.map((categoryItem) => (
      <li
        key={categoryItem.product_category_id}
        className="category-item"
      >
        <span
          onClick={() => handleCategorySelect(categoryItem.category_name)}
        >
          {categoryItem.category_name}
        </span>

        {subcategories[categoryItem.product_category_id] && (
          <ul
            className="subcategories-list">
            {subcategories[categoryItem.product_category_id].map((subcat) => (
              <li key={subcat.product_category_id}>
                 <span onClick={() => handleCategorySelect(subcat.category_name)}>
                  {subcat.category_name}
                </span>
              </li>
            ))}
          </ul>
            )}
          </li>
        ))}
      </ul>
    )}
</div>

          <button className="search-btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <div className="profile-cart-container">
          
            <div className="profile-wrapper"
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
            >
            <button className="profile-btn">
            👤 Profile
          </button>

          {profileHover && (<div className="profile-dropdown-container">
      <ProfileDropdown />
    </div>)}
          </div>
          <button className="cart-button" onClick={handleCartClick}>
        🛒 Cart
        {cartItemCount > 0 && (
          <span className="cart-count-badge">{cartItemCount}</span>
        )}
      </button>
        </div>
      </div>
    </header>
  );
};

export default Header;