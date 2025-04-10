import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaTh, FaThLarge, FaThList } from 'react-icons/fa';
//import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../services/api";
import ProductCard from "./ProductCard";
import './ProductList.css';

const ProductList = ({ price, color, size, brand, filterStatus, viewMode, sortOption, setSortOption, toggleSidebar }) => {
  
  //const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  //const [selectedStatus, setSelectedStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentViewMode, setCurrentViewMode] = useState(viewMode || "grid-4");

  // Fetch products from backend on mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, []);
  
  useEffect(() => {
    const itemsPerView = {
      "grid-2": 2 * 3, // 2 columns, 3 rows
      "grid-3": 3 * 3, // 3 columns, 3 rows
      "grid-4": 4 * 3, // 4 columns, 3 rows
      "list": 6, // List view 
    };
    setItemsPerPage(itemsPerView[currentViewMode] || 6);
    setCurrentPage(1); // Reset to first page when viewMode changes
  }, [currentViewMode]);

  // Filter logic based on backend schema
  const filteredProducts = products.filter((product) => {
    const item = product.ProductItems?.[0];

    const matchesPrice = item?.sale_price
      ? item.sale_price <= price
      : item?.original_price <= price;

    const matchesColor = color ? item?.Colour?.colour_name === color : true;
    const matchesSize = size ? item?.Colour?.size_name === size : true;
    const matchesBrand = brand ? product.Brand?.brand_name?.toLowerCase().includes(brand.toLowerCase()) : true;
    //const matchesStatus = filterStatus === "all" || item?.status === filterStatus;
    const isInStock = filterStatus.includes("inStock") ? item.qty_in_stocks > 0 : true;
  const isOnSale = filterStatus.includes("onSale") ? item.discount_applicable : true;


    return matchesPrice && matchesColor && matchesSize && matchesBrand && isInStock && isOnSale;
  });

 
  const sortedProducts = filteredProducts.sort((a, b) => {
    const getPrice = (p) => p.ProductItems?.[0]?.sale_price || p.ProductItems?.[0]?.original_price;
    if (sortOption === "price-asc") {
      return getPrice(a) - getPrice(b);
    } else if (sortOption === "price-desc") {
      return getPrice(b) - getPrice(a);
    } else if (sortOption === "name-asc") {
      return a.product_name.localeCompare(b.product_name);
    } else if (sortOption === "name-desc") {
      return b.product_name.localeCompare(a.product_name);
    }
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const gridStyle = {
    "list": { display: "block" },
    "grid-2": { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
    "grid-3": { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
    "grid-4": { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" },
  };

  return (
    <div className="container">
      <div className="toolbar">
        {/* View Toggle Buttons */}
        <div className="view-toggle">
          <button onClick={() => setCurrentViewMode("list")}>
            <FaThList className="fa-icon" title="List View" />
          </button>
          <button onClick={() => setCurrentViewMode("grid-2")}>
            <FaThLarge className="fa-icon" title="Grid-2" />
          </button>
          <button onClick={() => setCurrentViewMode("grid-3")}>
            <FaTh className="fa-icon" title="Grid-3" />
          </button>
          <button onClick={() => setCurrentViewMode("grid-4")}>
            <FaTh className="fa-icon" title="Grid-4" />
          </button> 
        </div>

        <div className="sorting">
          <label>Sort By: </label>
          <select
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
      </div>

      <div className="product-list" style={gridStyle[currentViewMode]}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{             
              color: currentPage === index + 1 ? "green" : "black",
            }}
          >
            {index + 1}
          </button>
        ))} 
      </div>
    </div>
  );
};

// PropTypes Validation
ProductList.propTypes = {
  price: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  brand: PropTypes.string,
  filterStatus: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default ProductList;
