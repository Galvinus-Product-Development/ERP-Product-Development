import PropTypes from "prop-types";
import { useState } from "react";
import './Filters.css';

const Filters = ({ applyFilters }) => {
  const [status, setStatus] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilters = () => {
    applyFilters({
      status: status === "ALL" ? "" : status, 
      startDate,
      endDate,
    });
  };
  const handleResetFilters = () => {
    setStatus("ALL");
    setStartDate("");
    setEndDate("");
    applyFilters({
      status: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="filters">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="ALL">All Status</option>
        <option value="CONFIRMED">Pending</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="REFUNDED">Refunded</option>
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
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
};

Filters.propTypes = {
  applyFilters: PropTypes.func.isRequired,
};

export default Filters;