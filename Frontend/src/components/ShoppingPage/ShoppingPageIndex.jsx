import queryString from "query-string";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import FilterSection from "./FilterSection";
import ProductList from "./ProductList";
import "./ShoppingPageIndex.css";

const ShoppingPageIndex = () => {
  const [selectedPrice, setSelectedPrice] = useState(5000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid-3");
  const [sortOption, setSortOption] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { category: selectedCategory } = queryString.parse(location.search);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="pageContainer">
      <div className={`filterSection ${isSidebarOpen ? "active" : ""}`}>
        <FilterSection
          onPriceChange={setSelectedPrice}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
          onBrandChange={setSelectedBrand}
          onStatusChange={setFilterStatus}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
        {/* <div className="toolbar">
      {!isSidebarOpen && (
        <button className="showSidebarButton" onClick={toggleSidebar}>
          <FaBars /> Show Sidebar
        </button>
      )}

        <div className="sorting">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="dropdown"
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div> */}

        <ProductList
          price={selectedPrice}
          color={selectedColor}
          size={selectedSize}
          brand={selectedBrand}
          filterStatus={filterStatus}
          viewMode={viewMode}
          sortOption={sortOption}
          setSortOption={setSortOption}
          toggleSidebar={toggleSidebar}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default ShoppingPageIndex;
