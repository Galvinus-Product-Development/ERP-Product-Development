// src/components/YouMayAlsoLikeProducts.js
import { useEffect, useRef, useState } from "react";
import { getYouMayAlsoLikeProducts } from "../../../services/api"; // Import the API function
import ProductCard from "../../ShoppingPage/ProductCard";
import './ProductStyles.css';


const YouMayAlsoLikeProducts = () => {
  const [youMayAlsoLikeProducts, setYouMayAlsoLikeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchYouMayAlsoLikeProducts = async () => {
      try {
        const data = await getYouMayAlsoLikeProducts();
        setYouMayAlsoLikeProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch 'You may also like' products.");
      } finally {
        setLoading(false);
      }
    };

    fetchYouMayAlsoLikeProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth; // Scroll by container width
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading &apos;You May Also Like&apos; Products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="you-may-also-like-products-container">
        <div className="product-list-container">
      <h2>You May Also Like</h2>

      <div className="scroll-row">
      <button className="scroll-btn left" onClick={() => scroll("left")}>&larr;</button>
      <div className="product-list-wrapper" ref={scrollRef}>
      <div className="carousel-product-list">
        {youMayAlsoLikeProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} isCarousel={true} />
        ))}
      </div>
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>&rarr;</button>
      </div>
      </div>
    </div>
  );
};

export default YouMayAlsoLikeProducts;
