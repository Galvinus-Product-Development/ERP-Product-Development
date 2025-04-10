import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaTh, FaThList } from 'react-icons/fa'; // Importing Font Awesome icons for grid/list views
import { useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductContext";

const ProductPagination = ({ price, color, size, brand, filterStatus, viewMode, sortOption }) => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const itemsPerView = {
      "grid-2": 2 * 3, // 2 columns, 3 rows
      "grid-3": 3 * 3, // 3 columns, 3 rows
      "grid-4": 4 * 3, // 4 columns, 3 rows
      "list": 6, // List view shows fewer items
    };
    setItemsPerPage(itemsPerView[viewMode] || 6);
    setCurrentPage(1); // Reset to first page when viewMode changes
  }, [viewMode]);

  // Filter products based on props
  const filteredProducts = (products || []).filter((product) => {
    const matchesPrice = product.newPrice ? product.newPrice <= price : product.oldPrice <= price;
    const matchesColor = color ? product.colors.includes(color) : true;
    const matchesSize = size ? product.size === size : true;
    const matchesBrand = brand ? product.brand.toLowerCase().includes(brand.toLowerCase()) : true;
    const matchesStatus = filterStatus === "all" || product.status === filterStatus;

    return matchesPrice && matchesColor && matchesSize && matchesBrand && matchesStatus;
  });

  // Sort the filtered products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "price-asc") {
      return (a.newPrice || a.oldPrice) - (b.newPrice || b.oldPrice);
    } else if (sortOption === "price-desc") {
      return (b.newPrice || b.oldPrice) - (a.newPrice || a.oldPrice);
    } else if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
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

  const handleViewDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  const gridStyle = {
    "list": { display: "block" },
    "grid-2": { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
    "grid-3": { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
    "grid-4": { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" },
  };

  return (
    <div>
      <div className="grid-list-view">
        {viewMode === "list" ? (
          <FaThList size={24} />
        ) : (
          <FaTh size={24} />
        )}
      </div>

      <div style={gridStyle[viewMode]}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <h4>{product.name}</h4>
              <p>
                {product.newPrice ? (
                  <>
                    <span className="old-price">${product.oldPrice}</span>{" "}
                    <span className="new-price">${product.newPrice}</span>
                  </>
                ) : (
                  <span>${product.oldPrice}</span>
                )}
              </p>
              <p style={{ color: product.status === "inStock" ? "green" : "red" }}>
                {product.status === "inStock" ? "In Stock" : "Out of Stock"}
              </p>
              <button className="view-details-button" onClick={() => handleViewDetails(product.id)}>
                View Details
              </button>
            </div>
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
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

ProductPagination.propTypes = {
  price: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  brand: PropTypes.string,
  filterStatus: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
};

export default ProductPagination;
