import axios from "axios";

const API_BASE_URL = "http://localhost:5004/api/v1/shipping";


  //  Fetch shipping tracking details for an order item
  export const fetchShippingTracking = async (orderId, itemId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tracking/${orderId}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tracking info for order ${orderId} item ${itemId}:`, error.message);
      throw error;
    }
  };
  