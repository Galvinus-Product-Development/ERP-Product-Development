// src/components/FeaturedProducts.js
import React, { useEffect, useRef, useState } from "react";
import { getFeaturedProducts } from "../../../services/api"; // Import the API function
import ProductCard from "../../ShoppingPage/ProductCard";
import './ProductStyles.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth; // Scroll by container width
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading Featured Products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="featured-products-container">
      <h2>Featured Products</h2>

      <div className="scroll-row">
        <button className="scroll-btn left" onClick={() => scroll("left")}>&larr;</button>

        <div className="product-list-wrapper" ref={scrollRef}>
      
      <div className="carousel-product-list">
        {featuredProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} isCarousel={true}  />
        ))}
      </div>
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>&rarr;</button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
