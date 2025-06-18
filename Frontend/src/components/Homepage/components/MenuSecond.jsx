import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchSubcategories } from "../../../services/api";
import "./MenuSecond.css";

const MenuSecond = () => {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();


  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };


  const handleMouseEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(dropdown);
  };
  
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
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
  }, []);


  return (
    <div className="menu--container">
      <div className="second-menu-container">
        {/* Browse Categories and Hamburger Menu */}
        <div className="browse-categories-container">
          
          <div
              className="custom-dropdown"
              onMouseEnter={() => handleMouseEnter("categories")}
              onMouseLeave={handleMouseLeave}
            >
             <button className="dropdown-trigger" onClick={() => toggleDropdown("categories")}>
                <FaBars className="hamburger-icon" />
                <span>BROWSE CATEGORIES</span>
                <FaCaretDown />
              </button>
              {openDropdown === "categories" && (
                <ul className="dropdown-options">
                  {categories.map((category) => (
                    <li
                    key={category.product_category_id}
                    onClick={() => {
                      navigate(
                        `/shopping-page?category=${encodeURIComponent(category.category_name)}`
                      );
                      setOpenDropdown(null); // just close dropdown
                    }}
                  >
                    <span>{category.category_name}</span>
                  
                    {subcategories[category.product_category_id] && (
                      <ul className="subcategories-list">
                        {subcategories[category.product_category_id].map((subcat) => (
                          <li key={subcat.product_category_id} onClick={(e) => {
                            e.stopPropagation(); // prevent parent category click
                            navigate(
                              `/shopping-page?category=${encodeURIComponent(subcat.category_name)}`
                            );
                            setOpenDropdown(null);
                          }
                          }>
                            {subcat.category_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
                  )}
            </div>

          </div>


        <div className="dropdowns-container">
        {["HOME", "SHOPS"].map((item) => (
          <div
            className="dropdown-item"
            key={item}
            onClick={() => {
              if (item === "HOME") navigate("/");
              else if (item === "SHOPS") navigate("/shopping-page");
            }}
          >
            {item}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSecond;
