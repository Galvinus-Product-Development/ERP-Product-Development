import React, { useState } from "react";
import { FaBars } from 'react-icons/fa';
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
  

  const toggleSidebar = () => {setIsSidebarOpen((prevState) => !prevState);};


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
      <div className="header-container">
        <button className="showSidebarButton" onClick={toggleSidebar}>
        <FaBars />Show Sidebar
      </button>
      </div>
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
        />
     
    </div>
    </div>
  );
};


export default ShoppingPageIndex;
