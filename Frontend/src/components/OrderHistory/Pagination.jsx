import PropTypes from "prop-types";
import React from "react";
import './Pagination.css';

const Pagination = ({ totalOrders, ordersPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
    totalOrders: PropTypes.number.isRequired,
  ordersPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
