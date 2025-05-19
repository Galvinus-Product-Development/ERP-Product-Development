
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5003/api/v1/orders'; 
export const userId = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; 
  // Fetch all orders for a specific user
  export const fetchOrdersForUser = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        params: { user_id: userId },
      });
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error.message);
      throw error;
    }
  };