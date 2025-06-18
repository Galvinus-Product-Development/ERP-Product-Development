import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrackOrderPage.css';

const TrackOrderPage = () => {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Can be 'COD' or 'Online'

  useEffect(() => {
    const loadTrackingData = async () => {
      try {
        // Mock data based on your images
        const mockData = {
          product: {
            name: 'Shirt',
            size: 'M',
            image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp",
            unit_price: 500,
            quantity: 1,
            item_total: 500
          },
          orderDate: "28th Sep '24",
          shippingDetails: {
            name: "FIRST NAME, LAST NAME",
            address: "ADDRESS, STATE",
            pincode: "PINCODE",
            phone: "PHONE NUMBER"
          },
          cartDetails: {
            totalPrice: 2000,
            discountPrice: 1000,
            couponDiscount: 100,
            shippingPrice: 0,
            finalPrice: 900
          },
          trackingEvents: [
            {
              status: 'Order Confirmed',
              date: "Sat, 28th Sep '24",
              details: [
                "Your order has been placed - 29 Sep 24 12:00 PM",
                "Seller has proceed your order - 29 Sep 24 12:00 PM"
              ],
              completed: true
            },
            {
              status: 'Shipped',
              date: "Sat, 30th Sep '24",
              details: ["Your item has been shipped - 31 Sep 24 12:00 PM"],
              completed: true
            },
            {
              status: 'Out for Delivery',
              date: "01 Oct '24",
              details: ["Your item is out for delivery - 01 OCT 24 12:00 PM"],
              completed: true
            },
            {
              status: 'Delivered',
              date: "02 Oct '24",
              details: ["Your item has been Delivered - 01 OCT 24 12:00 PM"],
              completed: true
            }
          ],
          paymentMethod: paymentMethod, // 'COD' or 'Online'
          isCancelled: false,
          isReturned: false,
          refundStatus: null
        };

        // Randomly determine if order is delivered or not for demo purposes
        const isDelivered = Math.random() > 0.5;
        if (!isDelivered) {
          // Remove delivered status if order isn't delivered
          mockData.trackingEvents = mockData.trackingEvents.filter(
            event => event.status !== 'Delivered'
          );
          // Add "Cancelled" status for some orders
          if (Math.random() > 0.7) {
            mockData.trackingEvents.push({
              status: 'Cancelled',
              date: "03 Oct '24",
              details: ["Your order has been cancelled"],
              completed: true
            });
            mockData.isCancelled = true;
          }
        } else {
          // Add "Return" and "Refund" status for some delivered orders
          if (Math.random() > 0.5) {
            mockData.trackingEvents.push({
              status: 'Return',
              date: "03 Oct '24",
              details: ["Your return has been initiated"],
              completed: true
            });
            mockData.trackingEvents.push({
              status: 'Refund',
              date: "04 Oct '24",
              details: ["Your refund has been processed"],
              completed: true
            });
            mockData.isReturned = true;
            mockData.refundStatus = 'Completed';
          }
        }

        setTrackingData(mockData);
      } catch (err) {
        setError('Unable to load tracking information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrackingData();
  }, [orderId, itemId]);

  const handleCancelReturn = () => {
    const isDelivered = trackingData?.trackingEvents.some(
      event => event.status === 'Delivered'
    );
    
    navigate('/order-cancel', {
      state: {
        orderStatus: isDelivered ? 'Delivered' : 'Confirmed',
        paymentMethod: trackingData.paymentMethod
      }
    });
  };

  const handleRateProduct = () => {
    // Navigate to rating page
    alert('Redirecting to product rating page');
  };

  if (loading) return <p>Loading tracking info...</p>;
  if (error) return <p>{error}</p>;
  if (!trackingData) return <p>No tracking data found.</p>;

  const { product, trackingEvents, shippingDetails, cartDetails, isCancelled, isReturned, refundStatus } = trackingData;
  const isDelivered = trackingEvents.some(event => event.status === 'Delivered');
  const isConfirmed = trackingEvents.some(event => event.status === 'Order Confirmed') && !isDelivered && !isCancelled;

  return (
    <div className="track-order-container">
      <div className="product-header">
        <div className="product-info">
          <img src={product.image} alt={product.name} />
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-size">Size: {product.size}</p>
            <p className="product-price">${product.unit_price}</p>
          </div>
        </div>
        <button className="contact-button">Contact Us</button>
      </div>

      <div className="timeline">
        {trackingEvents.map((event, index) => (
          <div className={`timeline-item ${event.completed ? 'completed' : ''}`} key={index}>
            <div className="timeline-marker-container">
              <div className="timeline-marker" />
              {index < trackingEvents.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <strong>{event.status} {event.date && `(${event.date})`}</strong>
              {event.details.map((detail, idx) => (
                <p key={idx}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {isDelivered && !isReturned && (
          <button className="return-button" onClick={handleCancelReturn}>
            RETURN
          </button>
        )}
        {isConfirmed && !isCancelled && (
          <button className="cancel-button" onClick={handleCancelReturn}>
            CANCEL ORDER
          </button>
        )}
        {isDelivered && (
          <button className="rate-button" onClick={handleRateProduct}>
            RATE THE PRODUCT
          </button>
        )}
      </div>

      {/* Shipping Details */}
      <div className="shipping-details">
        <h3>Shipping Details</h3>
        <p>{shippingDetails.name}, {shippingDetails.pincode}</p>
        <p>{shippingDetails.address}</p>
        <p>{shippingDetails.phone}</p>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Details ({product.quantity})</h3>
        <div className="price-details">
          <div className="price-row">
            <span>Total Price</span>
            <span>${cartDetails.totalPrice}</span>
          </div>
          <div className="price-row">
            <span>Discount Price</span>
            <span>${cartDetails.discountPrice}</span>
          </div>
          <div className="price-row">
            <span>Coupon Discount</span>
            <span>${cartDetails.couponDiscount}</span>
          </div>
          <div className="price-row">
            <span>Shipping Price</span>
            <span>{cartDetails.shippingPrice === 0 ? 'FREE' : `$${cartDetails.shippingPrice}`}</span>
          </div>
          <div className="price-row total">
            <span>TOTAL PRICE</span>
            <span>${cartDetails.finalPrice}</span>
          </div>
          <div className="payment-method">
            <span>Paid via:</span>
            <span>{paymentMethod === 'COD' ? 'Cash on Delivery' : 'Net Banking'}</span>
          </div>
        </div>
      </div>

      {/* Refund Status */}
      {isReturned && refundStatus && (
        <div className="refund-status">
          <h3>Refund Status</h3>
          <div className="refund-details">
            <span>Refund Amount:</span>
            <span>${product.unit_price}</span>
          </div>
          <div className="refund-details">
            <span>Status:</span>
            <span className={`status-${refundStatus.toLowerCase()}`}>{refundStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './TrackOrderPage.css';



// const TrackOrderPage = () => {
//   const { orderId, itemId } = useParams(); // Assuming you're using React Router
//   const [trackingData, setTrackingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadTrackingData = async () => {
//       try {
//       //  const data = await fetchShippingTracking(orderId, itemId);
//        // setTrackingData(data);
//         const mockData = {
//           product: {
//             name: 'Mock Running Shoes',
//             size: '42',
//             image: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp",
//             unit_price: 59.99,
//             quantity: 1,
//             item_total: 59.99
//           },
//           trackingEvents: [
//             {
//               status: 'Order Placed',
//               date: '2025-05-18',
//               details: ['Order confirmed and being processed']
//             },
//             {
//               status: 'Shipped',
//               date: '2025-05-19',
//               details: ['Package departed from warehouse']
//             },
//             {
//               status: 'In Transit',
//               date: '2025-05-20',
//               details: ['Arrived at local distribution center']
//             },
//             {
//               status: 'Out for Delivery',
//               date: '2025-05-21',
//               details: ['Courier is on the way']
//             },
//             {
//               status: 'Delivered',
//               date: '2025-05-21',
//               details: ['Package delivered to your address', 'Left at front door']
//             }           
//           ]
//         };

//         // Uncomment below line when real API is ready:
//         // const data = await fetchShippingTracking(orderId, itemId);

//         setTrackingData(mockData); // ← use mockData here
//       } catch (err) {
//         setError('Unable to load tracking information.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTrackingData();
//   }, [orderId, itemId]);

//   if (loading) return <p>Loading tracking info...</p>;
//   if (error) return <p>{error}</p>;
//   if (!trackingData) return <p>No tracking data found.</p>;

//   const { product, trackingEvents } = trackingData;

//   return (
//     <div className="track-order-container">
//       <div className="product-info">
//         <img src={product.image !== 'No image available' ? product.image : '/path/to/default/image.jpg'}
//         alt={product.name} />
//         <div>
//           <p className="product-name">{product.name}</p>
//           <p className="product-size">Size: {product.size}</p>
//           <p className="product-price">${product.unit_price || 0}</p>
//           <p className="product-quantity">Quantity: {product.quantity || 1}</p>
//           <p className="product-total">Total: ${product.item_total || 0}</p>

//         </div>
//       </div>

//       <div className="timeline">
//   {trackingEvents.map((event, index) => (
//     <div className="timeline-item" key={index}>
//       <div className="timeline-marker-container">
//         <div className="timeline-marker" />
//         {index < trackingEvents.length - 1 && <div className="timeline-line" />}
//       </div>
//       <div className="timeline-content">
//         <strong>{event.status} {event.date && `(${event.date})`}</strong>
//         {event.details.map((detail, idx) => (
//           <p key={idx}>{detail}</p>
//         ))}
//       </div>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default TrackOrderPage;
// /*const mockOrderTrackingData = {
//   product: {
//     name: "Shirt",
//     size: "M",
//     price: 500,
//     imageUrl: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
//   },
//   trackingEvents: [
//     {
//       status: "Order Confirmed",
//       date: "28th Sep '24",
//       details: [
//         "Your order has been placed - 29 Sep 24 12:00 PM",
//         "Seller has processed your order - 29 Sep 24 12:00 PM"
//       ]
//     },
//     {
//       status: "Shipped",
//       date: "30th Sep '24",
//       details: ["Your item has been shipped - 31 Sep 24 12:00 PM"]
//     },
//     {
//       status: "Out for Delivery",
//       date: "01 Oct '24",
//       details: ["Your item is out for delivery - 01 Oct 24 12:00 PM"]
//     },
//     {
//       status: "Delivered",
//       date: "02 Oct '24",
//       details: ["Your item has been delivered - 01 Oct 24 12:00 PM"]
//     }
//   ]
// };*/