import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import "./OrderHistoryPage.css";
import OrderList from "./OrderList";
import Pagination from "./Pagination";
const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const mockOrders = [
      { id: 1, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-15", total: 499.99, status: "Delivered", items: 3 },
      { id: 2, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-10", total: 299.99, status: "In Transit", items: 1 },
      { id: 3, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-08", total: 99.99, status: "Pending", items: 2 },
      { id: 4, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-05", total: 199.99, status: "Delivered", items: 1 },
      { id: 5, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-02", total: 49.99, status: "Cancelled", items: 1 },
      { id: 6, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2024-12-25", total: 129.99, status: "Delivered", items: 4 },
      { id: 7, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp",  date: "2025-01-15", total: 599.99, status: "Delivered", items: 3 },
      { id: 8, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-10", total: 399.99, status: "In Transit", items: 1 },
      { id: 9, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-08", total: 919.99, status: "Pending", items: 2 },
      { id: 10, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-05", total: 199.99, status: "Delivered", items: 1 },
      { id: 11, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2025-01-02", total: 419.99, status: "Cancelled", items: 1 },
      { id: 12, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", date: "2024-12-25", total: 169.99, status: "Delivered", items: 4 },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  const applyFilters = (filters) => {
    let updatedOrders = orders;

    if (filters.status) {
      updatedOrders = updatedOrders.filter((order) => order.status === filters.status);
    }

    if (filters.startDate && filters.endDate) {
      updatedOrders = updatedOrders.filter(
        (order) =>
          new Date(order.date) >= new Date(filters.startDate) &&
          new Date(order.date) <= new Date(filters.endDate)
      );
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1); // Reset to first page
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="order-history-page">
      <h1>Order History</h1>
      <Filters applyFilters={applyFilters} />
      <OrderList orders={currentOrders} />
      <Pagination
        totalOrders={filteredOrders.length}
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrderHistoryPage;