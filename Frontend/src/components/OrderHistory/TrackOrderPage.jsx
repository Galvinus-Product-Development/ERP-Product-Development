import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShippingTracking } from '../../services/shippingApi';
import './TrackOrderPage.css';



const TrackOrderPage = () => {
  const { orderId, itemId } = useParams(); // Assuming you're using React Router
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrackingData = async () => {
      try {
        const data = await fetchShippingTracking(orderId, itemId);
        setTrackingData(data);
      } catch (err) {
        setError('Unable to load tracking information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrackingData();
  }, [orderId, itemId]);

  if (loading) return <p>Loading tracking info...</p>;
  if (error) return <p>{error}</p>;
  if (!trackingData) return <p>No tracking data found.</p>;

  const { product, trackingEvents } = trackingData;

  return (
    <div className="track-order-container">
      <div className="product-info">
        <img src={product.image !== 'No image available' ? product.image : '/path/to/default/image.jpg'}
        alt={product.name} />
        <div>
          <p className="product-name">{product.name}</p>
          <p className="product-size">Size: {product.size}</p>
          <p className="product-price">${product.unit_price || 0}</p>
          <p className="product-quantity">Quantity: {product.quantity || 1}</p>
          <p className="product-total">Total: ${product.item_total || 0}</p>

        </div>
      </div>

      <div className="timeline">
  {trackingEvents.map((event, index) => (
    <div className="timeline-item" key={index}>
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

    </div>
  );
};

export default TrackOrderPage;
/*const mockOrderTrackingData = {
  product: {
    name: "Shirt",
    size: "M",
    price: 500,
    imageUrl: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
  },
  trackingEvents: [
    {
      status: "Order Confirmed",
      date: "28th Sep '24",
      details: [
        "Your order has been placed - 29 Sep 24 12:00 PM",
        "Seller has processed your order - 29 Sep 24 12:00 PM"
      ]
    },
    {
      status: "Shipped",
      date: "30th Sep '24",
      details: ["Your item has been shipped - 31 Sep 24 12:00 PM"]
    },
    {
      status: "Out for Delivery",
      date: "01 Oct '24",
      details: ["Your item is out for delivery - 01 Oct 24 12:00 PM"]
    },
    {
      status: "Delivered",
      date: "02 Oct '24",
      details: ["Your item has been delivered - 01 Oct 24 12:00 PM"]
    }
  ]
};*/