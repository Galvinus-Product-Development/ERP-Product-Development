// src/components/SuggestedProducts.js
import React, { useEffect, useRef, useState } from "react";
import { getSuggestedProducts } from "../../../services/api"; // Import the API function
import ProductCard from "../../ShoppingPage/ProductCard";
import './ProductStyles.css';


const SuggestedProducts = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const data = await getSuggestedProducts();
        setSuggestedProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch suggested products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth; // Scroll by container width
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading Suggested Products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="suggested-products-container">
      <h2>Suggested Products</h2>

      <div className="scroll-row">
      <button className="scroll-btn left" onClick={() => scroll("left")}>&larr;</button>
      <div className="product-list-wrapper" ref={scrollRef}>
      
      <div className="carousel-product-list">
        {suggestedProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} isCarousel={true} />
        ))}
      </div>
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>&rarr;</button>
      </div>
    </div>
  );
};

export default SuggestedProducts;
