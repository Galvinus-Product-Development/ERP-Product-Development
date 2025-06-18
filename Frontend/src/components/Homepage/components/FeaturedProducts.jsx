import React, { useRef } from "react";
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./FeaturedProducts.css";
import image1 from "../../../assets/Picture1.webp";
import image2 from "../../../assets/Picture2.webp";
import image3 from "../../../assets/Picture3.webp";
import image4 from "../../../assets/Picture4.webp";
import image5 from "../../../assets/Picture5.webp";
import image6 from "../../../assets/Picture6.jpg";

const FeaturedProducts = () => {
  const scrollRef = useRef(null);

  const featuredProducts = [
    {
      product_id: "1",
      title: "The North Coat",
      image: image1,
      price: 260,
      originalPrice: 360,
      rating: 5,
    },
    {
      product_id: "2",
      title: "Gucci Duffle Bag",
      image: image2,
      price: 960,
      originalPrice: 1160,
      rating: 5,
    },
    {
      product_id: "3",
      title: "RGB Liquid CPU Cooler",
      image: image3,
      price: 160,
      originalPrice: 170,
      rating: 4,
    },
    {
      product_id: "4",
      title: "Small BookShelf",
      image: image4,
      price: 360,
      originalPrice: 450,
      rating: 4,
    },
    {
      product_id: "5",
      title: "Wireless Headphones",
      image: image5,
      price: 180,
      originalPrice: 250,
      rating: 4,
    },
    {
      product_id: "6",
      title: "Smart Watch Pro",
      image: image6,
      price: 99,
      originalPrice: 149,
      rating: 3,
    },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = (container.offsetWidth / 5) * 1.1; // one card's width + margin
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="featured-products-wrapper">
      <h2 className="section-title1">Featured Products</h2>

      <div className="scroll-row">
        <button className="arrow-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="product-scroll-container" ref={scrollRef}>
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.product_id}>
              <img src={product.image} alt={product.title} />

              <div className="card-title">
                <h4>{product.title}</h4>
                <FaHeart className="wishlist-icon1" size={15} />
              </div>

              <div>
                <span className="price">${product.price}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>

              <div className="rating">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < product.rating ? "#f5a623" : "#ddd"}
                    />
                  ))}
                <span style={{ marginLeft: "5px", color: "#777" }}>(65)</span>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
