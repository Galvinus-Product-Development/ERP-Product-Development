import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchBrands, fetchColors, fetchSizeOptions } from "../../services/api";
import "./FilterSection.css";

const FilterSection = ({ onPriceChange, onColorChange, onSizeChange, onBrandChange, onStatusChange,toggleSidebar, categoryId}) => {
  
  const [price, setPrice] = useState(5000);
 
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandInput, setBrandInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  

  //const stock = item?.qty_in_stocks || 0;

// Fetch all filter data from backend
useEffect(() => {
  const fetchFilters = async () => {
    const [brandData, colorData, sizeData] = await Promise.all([
      fetchBrands(),
      fetchColors(),
      fetchSizeOptions(categoryId), // Optional: pass category_id if needed
    ]);

    setBrands(brandData);
    setColors(colorData);
    setSizes(sizeData);
  };

  fetchFilters();
}, [categoryId]);

 // Handler functions
 const handlePriceChange = (value) => {
  setPrice(value);
  onPriceChange(value);
};

const handleColorChange = (color) => {
  const newColor = selectedColor === color ? null : color;
  setSelectedColor(newColor);
  onColorChange(newColor);
};

const handleSizeChange = (size) => {
  const newSize = selectedSize === size ? null : size;
  setSelectedSize(newSize);
  onSizeChange(newSize);
};

const handleBrandInputChange = (value) => {
  setBrandInput(value);
  setSelectedBrand(value); // optional if you want selectedBrand for UI purposes
  onBrandChange(value);    // let parent know brand filter is applied
};

const handleStatusChange = (e) => {
  const value = e.target.value;
  const isChecked = e.target.checked;

  if (isChecked) {
    setSelectedStatus((prev) => [...prev, value]);
  } else {
    setSelectedStatus((prev) => prev.filter((status) => status !== value));
  }

  onStatusChange(
    isChecked
      ? [...selectedStatus, value]
      : selectedStatus.filter((status) => status !== value)
  );
};
const handleResetFilters = () => {
  setSelectedColor(null);
  setSelectedSize(null);
  setSelectedBrand(null);

  setBrandInput("");
  setSelectedStatus([]);
  setPrice(5000);

  // Call callbacks to reset filters in parent
  onColorChange(null);
  onSizeChange(null);
  onBrandChange(null);
  onStatusChange([]);
  onPriceChange(5000);
};

  return (
    <>
    <div className="filter-header">
      <button className="close-btn" onClick={toggleSidebar}>&times;</button>
      </div>
      
     <div className="filter-group">
        <h4>Filter by Price</h4>
        <input 
          type="range" 
          min="0" 
          max="5000" 
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)} 
        />
        <p className="price-label">Price: $0 — ${price}</p>
      </div>
     



      <div className="filter-group">
        <h4>Filter by color</h4>
        <div className="scroll-container">
          {colors.map((color) => (
            <div
              key={color.colour_id}
              className={`scroll-item ${selectedColor === color.colour_name ? "selected" : ""}`}
              onClick={() => handleColorChange(color.colour_name)}
            >
              <div 
                className={`color-circle ${selectedColor === color.colour_name ? "selected" : ""}`} 
                style={{ backgroundColor: color.colour_name || "#ccc" }}
              ></div>
              {color.colour_name}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Filter by Size</h4>
        <div className="scroll-container">
          {sizes.map((size) => (
            <div
              key={size.size_id}
              className={`scroll-item ${selectedSize === size.size_name  ? "selected" : ""}`}
              onClick={() => handleSizeChange(size.size_name )}
            >
              {size.size_name }
            </div>
          ))}
        </div>
        </div>

      <div className="filter-group">
        <h4>Filter by Brand</h4>
        <input 
        type="text" 
        placeholder="Find a Brand" 
        value={brandInput}
        onChange={(e) => handleBrandInputChange(e.target.value)} 
        className="text-input"
        list="brand-list"
        />
        <datalist id="brand-list">
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_name} />
          ))}
        </datalist>
      </div>

      <div className="filter-group">
        <h4>Filter by Product Status</h4>

      <label>
        <input
          type="checkbox"
          value="inStock"
          checked={selectedStatus.includes("inStock")}
          onChange={(e) => handleStatusChange(e)}
        />
        In Stock
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          value="onSale"
          checked={selectedStatus.includes("onSale")}
          onChange={(e) => handleStatusChange(e)}
        />
        On Sale
      </label>
       
      </div>

      <button onClick={handleResetFilters}>Reset Filters</button>

    
    </>
  );
};

// PropTypes Validation
FilterSection.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  categoryId: PropTypes.string,
};

export default FilterSection;