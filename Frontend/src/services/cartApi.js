// src/api/cartApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5002/api/v1/cart'; 
export const user_id = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; // TEMP user ID

// Fetch cart by user ID
export const fetchCart = async (user_id) => {
  const response = await axios.get(`${BASE_URL}/${user_id}`);
  return response.data;
};

// Add item to cart
export const addToCart = async (user_id, product_item_id, quantity) => {
  const response = await axios.post(`${BASE_URL}/${user_id}/items`, {
    product_item_id,
    quantity
  });
  return response.data;
};

// Update item quantity
export const updateCartItem = async (user_id, cart_items_id, quantity) => {
  const response = await axios.put(`${BASE_URL}/${user_id}/items/${cart_items_id}`, {
    
    quantity
  });
  return response.data;
};

// Remove item from cart
export const removeCartItem = async (user_id, cart_items_id) => {
  const response = await axios.delete(`${BASE_URL}/${user_id}/items/${cart_items_id}`, {
  });
  return response.data;
};

// Clear entire cart
export const clearCart = async (user_id) => {
  const response = await axios.delete(`${BASE_URL}/${user_id}`);
  return response.data;
};
