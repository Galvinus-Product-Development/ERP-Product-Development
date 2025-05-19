import PropTypes from "prop-types";
import React, { useState } from "react";
import './Filters.css';

const Filters = ({ applyFilters }) => {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilters = () => {
    applyFilters({ status, startDate, endDate });
  };

  return (
    <div className="filters">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="Delivered">Delivered</option>
        <option value="In Transit">In Transit</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

Filters.propTypes = {
  applyFilters: PropTypes.func.isRequired,
};

export default Filters;