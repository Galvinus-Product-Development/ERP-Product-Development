import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchBrands, fetchColors, fetchSizeOptions } from "../../services/api";
import "./FilterSection.css";

const MAX_VISIBLE = 5;

const FilterSection = ({
  onPriceChange,
  onColorChange,
  onSizeChange,
  onBrandChange,
  onRatingChange,
  onDiscountChange,
  toggleSidebar,
  categoryId,
}) => {
  const [price, setPrice] = useState(5000);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [showMore, setShowMore] = useState({
    colors: false,
    sizes: false,
    brands: false,
  });

  useEffect(() => {
    const fetchFilters = async () => {
      const [brandData, colorData, sizeData] = await Promise.all([
        fetchBrands(),
        fetchColors(),
        fetchSizeOptions(categoryId),
      ]);
      setBrands(brandData);
      setColors(colorData);
      setSizes(sizeData);
    };

    fetchFilters();
  }, [categoryId]);

  const handleToggle = (value, selected, setSelected, onChange) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setSelected(newSelected);
    onChange(newSelected);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    onPriceChange(value);
  };

  const handleResetFilters = () => {
    setSelectedColor([]);
    setSelectedSize([]);
    setSelectedBrand([]);
    setSelectedRating([]);
    setSelectedDiscount([]);
    setPrice(5000);

    onColorChange([]);
    onSizeChange([]);
    onBrandChange([]);
    onRatingChange([]);
    onDiscountChange([]);
    onPriceChange(5000);
  };

  const renderCheckboxGroup = (
    items,
    selected,
    setSelected,
    onChange,
    keyName,
    labelKey,
    toggleKey
  ) => {
    const visibleItems = showMore[toggleKey]
      ? items
      : items.slice(0, MAX_VISIBLE);

    return (
      <>
        {visibleItems.map((item) => (
          <label key={item[keyName]}>
            <input
              type="checkbox"
              value={item[labelKey]}
              checked={selected.includes(item[labelKey])}
              onChange={() =>
                handleToggle(item[labelKey], selected, setSelected, onChange)
              }
            />
            {item[labelKey]}
          </label>
        ))}
        {items.length > MAX_VISIBLE && (
          <button
            type="button"
            className="show-more-btn"
            onClick={() =>
              setShowMore((prev) => ({
                ...prev,
                [toggleKey]: !prev[toggleKey],
              }))
            }
          >
            {showMore[toggleKey] ? "Show Less" : "Show More"}
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <div className="filter-header">
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
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
        <h4>Filter by Color</h4>
        {renderCheckboxGroup(
          colors,
          selectedColor,
          setSelectedColor,
          onColorChange,
          "colour_id",
          "colour_name",
          "colors"
        )}
      </div>

      <div className="filter-group">
        <h4>Filter by Size</h4>
        {renderCheckboxGroup(
          sizes,
          selectedSize,
          setSelectedSize,
          onSizeChange,
          "size_id",
          "size_name",
          "sizes"
        )}
      </div>

      <div className="filter-group">
        <h4>Filter by Brand</h4>
        {renderCheckboxGroup(
          brands,
          selectedBrand,
          setSelectedBrand,
          onBrandChange,
          "brand_id",
          "brand_name",
          "brands"
        )}
      </div>

      <div className="filter-group">
        <h4>Filter by Ratings</h4>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating}>
            <input
              type="checkbox"
              value={rating}
              checked={selectedRating.includes(rating)}
              onChange={() =>
                handleToggle(
                  rating,
                  selectedRating,
                  setSelectedRating,
                  onRatingChange
                )
              }
            />
            {"⭐".repeat(rating)}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Filter by Discount</h4>
        {[10, 20, 30, 40, 50].map((discount) => (
          <label key={discount}>
            <input
              type="checkbox"
              value={discount}
              checked={selectedDiscount.includes(discount)}
              onChange={() =>
                handleToggle(
                  discount,
                  selectedDiscount,
                  setSelectedDiscount,
                  onDiscountChange
                )
              }
            />
            {discount}% or more
          </label>
        ))}
      </div>

      <button onClick={handleResetFilters}>Reset Filters</button>
    </>
  );
};

FilterSection.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onDiscountChange: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  categoryId: PropTypes.string,
};

export default FilterSection;
