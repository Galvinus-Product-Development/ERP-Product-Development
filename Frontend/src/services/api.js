// src/services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

//  PRODUCT APIs
// Fetch all products
export const fetchAllProducts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: filters,
    }); // GET request to your backend
    return response.data.data; // Returns the products array with associations
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/${id}`
    );
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
    const url = categoryId
      ? `${API_BASE_URL}/size-options?category_id=${categoryId}`
      : `${API_BASE_URL}/size-options`;
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

//  CATEGORY APIs
// Fetch all categories (including subcategories)
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product-categories`);
    return response.data; // This would include both categories and subcategories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch all parent categories (no subcategories)
export const fetchParentCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product-categories/parents`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching parent categories:", error);
    throw error;
  }
};

// Fetch subcategories for a specific category
export const fetchSubcategories = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product-categories/${categoryId}/subcategories`
    );
    return response.data; // This would be the subcategories for the specific category
  } catch (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}:`,
      error
    );
    throw error;
  }
};
export const fetchProductsByCategory = async (categoryName) => {
  const response = await fetch(
    `${API_BASE_URL}/products/by-category/${categoryName}`
  );
  const data = await response.json();
  return data.data;
};

// FEATURED PRODUCTS API
export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/featured`);
    return response.data; // Extracting 'data' from the response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

// RECOMMENDED PRODUCTS API
export const getRecommendedProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/recommended`);
    return response.data; // Extracting 'data' from the response
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    throw error;
  }
};

// SUGGESTED PRODUCTS API
export const getSuggestedProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/suggested`);
    return response.data; // Extracting 'data' from the response
  } catch (error) {
    console.error("Error fetching suggested products:", error);
    throw error;
  }
};

// YOU MAY ALSO LIKE PRODUCTS API
export const getYouMayAlsoLikeProducts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/homepage/you-may-also-like`
    );
    return response.data; // Extracting 'data' from the response
  } catch (error) {
    console.error("Error fetching 'You May Also Like' products:", error);
    throw error;
  }
};
