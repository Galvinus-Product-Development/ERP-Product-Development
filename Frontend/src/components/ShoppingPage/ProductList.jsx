import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { fetchAllProducts, fetchProductsByCategory } from "../../services/api";
import ProductCard from "./ProductCard";
import './ProductList.css';

const ProductList = ({ price, color, size, brand, filterStatus, viewMode, sortOption, setSortOption, toggleSidebar, selectedCategory  }) => {
  
  //const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  //const [selectedStatus, setSelectedStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  /* Fetch products from backend on mount
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
  }, []);*/
  useEffect(() => {
    const getProducts = async () => {
      try {
        let data;
        if (selectedCategory && selectedCategory !== "All Categories") {
          data = await fetchProductsByCategory(selectedCategory);
        } else {
          data = await fetchAllProducts();
        }
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, [selectedCategory]);

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

  return (
    <div className="container">


      <div className="product-list">
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
          className={currentPage === index + 1 ? "active" : ""}
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
  selectedCategory: PropTypes.string,
};

export default ProductList;
