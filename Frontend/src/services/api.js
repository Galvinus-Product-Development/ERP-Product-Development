// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";


 //  PRODUCT APIs 
// Fetch all products 
export const fetchAllProducts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`,  { params: filters }); // GET request to your backend
    return response.data.data; // Returns the products array with associations
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data.data; // Extracting 'data' from the response
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw error;
  }
};

//  BRAND APIs 
// Fetch all brands
export const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`);
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  };
  
  // Fetch a single brand by ID
  export const fetchBrandById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching brand:", error);
      return null;
    }
  };
  
  // Fetch all colors
export const fetchColors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/colours`);
      return response.data;
    } catch (error) {
      console.error("Error fetching colors:", error);
      return [];
    }
  };
  export const fetchColourById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/colours/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching color with ID ${id}:`, error.message);
      throw error;
    }
  };
  
 // Fetch size options based on category 
export const fetchSizeOptions = async (categoryId) => {
  try {
    const url = categoryId ? `${API_BASE_URL}/size-options?category_id=${categoryId}` : `${API_BASE_URL}/size-options`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching size options:", error);
    return [];
  }
};
  // Fetch all product statuses
  export const fetchProductStatuses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-statuses`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product statuses:", error);
      return [];
    }
  };
  
  
