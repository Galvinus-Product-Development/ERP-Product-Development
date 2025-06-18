import { useEffect, useState } from "react";
//import { fetchOrdersForUser } from "../../services/orders";
import Filters from "./Filters";
import OrderCard from "./OrderCard";
import "./OrderPage.css";
import Pagination from "./Pagination";
const OrderPage = () => {
  //const user_id = "6f94aefc-36a1-4e7d-8c7f-2a81bbffb002";
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 1;

  useEffect(() => {
    const mockOrders = [
      {
        order_id: "ORD123",
        payment_method: "COD",
        created_at: "2025-05-20",
        OrderItems: [
          {
            order_item_id: "ITEM001",
            status: "Delivered",
            total_price: 129.99,
            product_details: {
              name: "Wireless Headphones",
              size: "Standard",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          },
          {
            order_item_id: "ITEM002",
            status: "Shipped",
            total_price: 79.99,
            product_details: {
              name: "Smart Watch",
              size: "M",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          },
          {
            order_item_id: "ITEM004",
            status: "Confirmed",
            total_price: 35.5,
            product_details: {
              name: "Wireless Mouse",
              size: "One Size",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          }
        ]
      },
      {
        order_id: "ORD124",
        payment_method: "ONLINE",
        created_at: "2025-05-18",
        OrderItems: [
          {
            order_item_id: "ITEM003",
            status: "Cancelled",
            total_price: 49.99,
            product_details: {
              name: "Bluetooth Speaker",
              size: "Small",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          },
          {
            order_item_id: "ITEM005",
            status: "Delivered",
            total_price: 22.0,
            product_details: {
              name: "Phone Case",
              size: "XL",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          }
        ]
      },
      {
        order_id: "ORD125",
        payment_method: "ONLINE",
        created_at: "2025-05-22",
        OrderItems: [
          {
            order_item_id: "ITEM006",
            status: "Shipped",
            total_price: 199.99,
            product_details: {
              name: "Gaming Keyboard",
              size: "Standard",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          },
          {
            order_item_id: "ITEM007",
            status: "Confirmed",
            total_price: 59.99,
            product_details: {
              name: "USB-C Cable",
              size: "1m",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          },
          {
            order_item_id: "ITEM008",
            status: "Delivered",
            total_price: 99.99,
            product_details: {
              name: "External Hard Drive",
              size: "1TB",
              image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            }
          }
        ]
      }
    ];
    

    // // Flatten order items like before
    // const flattenedItems = mockOrders.flatMap((order) =>
    //   order.OrderItems.map((item) => ({
    //     ...item,
    //     order_id: order.order_id,
    //     status: item.status,
    //     product_name: item.product_details?.name || "",
    //     size: item.product_details?.size || "",
    //     image_url: item.product_details?.image || null,
    //     order_date: order.created_at
    //   }))
    // );

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);
   // Filters on orders by checking if any OrderItems match filter conditions
   const applyFilters = (filters) => {
    let updatedOrders = [...orders];

    if (filters.status) {
      updatedOrders = updatedOrders.filter(order =>
        order.OrderItems.some(item => item.status === filters.status)
      );
    }

    if (filters.startDate && filters.endDate) {
      updatedOrders = updatedOrders.filter(order =>
        new Date(order.created_at) >= new Date(filters.startDate) &&
        new Date(order.created_at) <= new Date(filters.endDate)
      );
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1);
  };
   
  

  // const applyFilters = (filters) => {
  //   let updatedItems = [...orderItems];

  //   if (filters.status) {
  //     updatedItems = updatedItems.filter(
  //       (item) => item.status === filters.status
  //     );
  //   }

  //   if (filters.startDate && filters.endDate) {
  //     updatedItems = updatedItems.filter(
  //       (item) =>
  //         new Date(item.order_date) >= new Date(filters.startDate) &&
  //         new Date(item.order_date) <= new Date(filters.endDate)
  //     );
  //   }

  //   setFilteredItems(updatedItems);
  //   setCurrentPage(1);
  // };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="orders-page">
       <h1 className="orders-title">All Orders</h1>
      <Filters applyFilters={applyFilters} />
      {currentOrders.map((order) => (
        <div key={order.order_id} className="order-block">
          <h2 className="order-heading">Order ID: {order.order_id} (Order placed at: {order.created_at})</h2>
          {order.OrderItems.map((item) => (
            <OrderCard
              key={item.order_item_id}
              orderItem={item}
              orderCreatedAt={order.created_at}
              paymentMethod={order.payment_method}/>
          ))}
        </div>
      ))}
      {/* {currentOrders.map((item, index) => (
  <OrderCard key={index} order={item} />
))} */}

      <Pagination
        totalOrders={filteredOrders.length}
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrderPage;

/* fetchOrdersForUser(user_id)
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
  }, []);*/
  