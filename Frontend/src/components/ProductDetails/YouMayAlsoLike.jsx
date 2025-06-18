import PropTypes from "prop-types";
import React from "react";
import "./YouMayAlsoLike.css";

const YouMayAlsoLike = ({ products }) => {
  return (
    <div className="you-may-also-like">
      <h3 className="section-title">You May Also Like...</h3>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="products-card">
            <div className="products-image">
            <img src={product.img} alt={product.name}  />
            
            </div>
            <div className="product-details">
            <p className="product-name">{product.name}</p>
            <p className="product-category">Acessories, Clock</p>
            <p className="product-price">{product.price}</p>
            <div className="icons-overlay">
                <i className="fas fa-heart"></i>
                <i className="fas fa-search"></i>
                <i className="fas fa-shopping-cart"></i>
              </div>
            
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

YouMayAlsoLike.propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        
      })
    ).isRequired,
  };



export default YouMayAlsoLike;
