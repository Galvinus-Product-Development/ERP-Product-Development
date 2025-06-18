import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

 const ProductContext = createContext();

 export const ProductProvider = ({ children }) => {

 /* const [products, setProducts] = useState([
    { id: 1, name: "Product 1",oldPrice: 599, newPrice: 299, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", 
    images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], 
      status: "onSale", colors: ["black", "brown"]},
    { id: 2, name: "Product 2",oldPrice: 599, newPrice: 399, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-18-2-430x490.jpg.webp", 
      images:["https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-18-2-430x490.jpg.webp", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "outOfStock", colors: ["black", "brown"]},
    { id: 3, name: "Product 3",oldPrice: 599, newPrice: 199, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-1-2-430x491.jpg",images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-1-2-430x491.jpg","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "outOfStock", colors: ["black", "brown"]},
    { id: 4, name: "Product 4",oldPrice: 599, newPrice: 599, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-1-5-430x490.jpg.webp",images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-1-5-430x490.jpg.webp", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 5, name: "Product 5",oldPrice: 599, newPrice: 399, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-19-430x491.jpg", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-19-430x491.jpg","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "onSale", colors: ["black", "brown"]  },
    { id: 6, name: "Product 6", oldPrice: 599,newPrice: 799, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3-430x491.jpg",images:["https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3-430x491.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock",colors: ["black", "brown"] },
    { id: 7, name: "Product 7", oldPrice: 599,newPrice: 499, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-3-2-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-3-2-430x490.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "onSale", colors: ["black", "brown"] },
    { id: 8, name: "Product 8",oldPrice: 599, newPrice: 399, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp", images:["https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 9, name: "Product 9",oldPrice: 599, newPrice: 699, img: "https://woodmart.b-cdn.net/wp-content/uploads/2017/03/light8_2-opt-430x491.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2017/03/light8_2-opt-430x491.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],  status: "outOfStock", colors: ["black", "brown"] },
    { id: 10, name: "Product 10",oldPrice: 599, newPrice: 2199, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-10-430x491.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-10-430x491.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 11, name: "Product 11", oldPrice: 599,newPrice: 2359, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-8-430x490.jpg.webp", images:["https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-8-430x490.jpg.webp", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "onSale", colors: ["black", "brown"] },
    { id: 12, name: "Product 12",oldPrice: 599, newPrice: 1299, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-15-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-15-430x490.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 13, name: "Product 13",oldPrice: 599, newPrice: 2299, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "outOfStock", colors: ["black", "brown"]},
    { id: 14, name: "Product 14",oldPrice: 599, newPrice: 3299, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-18-2-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "inStock", colors: ["black", "brown"] },
    { id: 15, name: "Product 15",oldPrice: 599, newPrice: 3199, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-1-2-430x491.jpg", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-1-2-430x491.jpg","https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "onSale", colors: ["black", "brown"] },
    { id: 16, name: "Product 16", oldPrice: 599,newPrice: 2599, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-1-5-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 17, name: "Product 17",oldPrice: 599, newPrice: 1399, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-19-430x491.jpg", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "onSale", colors: ["black", "brown"]  },
    { id: 18, name: "Product 18",oldPrice: 599, newPrice: 1799, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3-430x491.jpg", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "inStock", colors: ["black", "brown"] },
    { id: 19, name: "Product 19",oldPrice: 599, newPrice: 1499, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-3-2-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "onSale", colors: ["black", "brown"] },
    { id: 20, name: "Product 20",oldPrice: 599, newPrice: 2399, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "outOfStock", colors: ["black", "brown"] },
    { id: 21, name: "Product 21",oldPrice: 599, newPrice: 2699, img: "https://woodmart.b-cdn.net/wp-content/uploads/2017/03/light8_2-opt-430x491.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "onSale", colors: ["black", "brown"] },
    { id: 22, name: "Product 22", oldPrice: 599,newPrice: 2919, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-10-430x491.jpg.webp",images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
    { id: 23, name: "Product 23",oldPrice: 599, newPrice: 3519, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-8-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"],status: "onSale", colors: ["black", "brown"] },
    { id: 24, name: "Product 24",oldPrice: 599, newPrice: 2919, img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-furniture-15-430x490.jpg.webp", images:[ "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-3.jpg", "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-430x490.jpg.webp",
      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-furniture-11-2.jpg"], status: "inStock", colors: ["black", "brown"] },
  ]);
*/
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { productId, quantity:1}];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  

  return (
    <ProductContext.Provider value={{ 
    
      cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
       }}>
      {children}
    </ProductContext.Provider>
  );

  
};

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useProducts = () => useContext(ProductContext);