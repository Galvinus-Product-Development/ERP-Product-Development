import { useEffect, useState } from "react";
import { fetchOrdersForUser } from "../../services/orders";
import Filters from "./Filters";
import OrderCard from "./OrderCard";
import "./OrderPage.css";
import Pagination from "./Pagination";
const OrderPage = () => {
  const user_id = "6f94aefc-36a1-4e7d-8c7f-2a81bbffb002";
  const [orderItems, setOrderItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrdersForUser(user_id)
      .then((response) => {
        console.log("Response:", response); 
        const orders = Array.isArray(response) ? response : [];
        const flattenedItems = orders.flatMap((order) =>
          order.OrderItems.map((item) => ({
            ...item,
            order_id: order.order_id,
            status: item.status, // more accurate to use item status
            product_name: item.product_details?.name || "",
            size: item.product_details?.size || "",
            image_url: item.product_details?.image || null,
            order_date: order.created_at
          }))
        );
        setOrderItems(flattenedItems);
        setFilteredItems(flattenedItems);
      })
      .catch((err) => console.error("Fetch orders error:", err));
  }, []);
  
  

  const applyFilters = (filters) => {
    let updatedItems = [...orderItems];

    if (filters.status) {
      updatedItems = updatedItems.filter(
        (item) => item.status === filters.status
      );
    }

    if (filters.startDate && filters.endDate) {
      updatedItems = updatedItems.filter(
        (item) =>
          new Date(item.order_date) >= new Date(filters.startDate) &&
          new Date(item.order_date) <= new Date(filters.endDate)
      );
    }

    setFilteredItems(updatedItems);
    setCurrentPage(1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredItems.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="orders-page">
       <h1 className="orders-title">All Orders</h1>
      <Filters applyFilters={applyFilters} />
      {currentOrders.map((item, index) => (
  <OrderCard key={index} order={item} />
))}

      <Pagination
        totalOrders={filteredItems.length}
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrderPage;