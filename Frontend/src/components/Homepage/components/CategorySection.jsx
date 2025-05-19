import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProductsByCategory } from "../../../services/api";
import ProductCard from "../../ShoppingPage/ProductCard";
import "./CategorySection.css"; // for styling

const CATEGORY_IMAGES = {
    "Laptops": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "Computers": "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    "Fashion": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RkFTSElPTnxlbnwwfHwwfHx8MA%3D%3D",
    "Heels": "https://plus.unsplash.com/premium_photo-1676234844384-82e1830af724?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SEVFTFN8ZW58MHx8MHx8fDA%3D",
    "Home Appliances": "https://media.istockphoto.com/id/2096316448/photo/stoves-and-washing-machines-for-sale-in-a-department-store-or-showroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=xS-pdjJLwNLVPA0_AfEQy8pPA5q2dYEbQy0oyPnr4gg=",
    "Appliances": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QVBQTElBTkNFU3xlbnwwfHwwfHx8MA%3D%3D",
    "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RUxFQ1RST05JQ1N8ZW58MHx8MHx8fDA%3D",
    "Home & Furniture": "https://plus.unsplash.com/premium_photo-1670076513880-f58e3c377903?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RlVSTklUVVJFfGVufDB8fDB8fHww",
    "Women's Footwear": "https://images.unsplash.com/photo-1655095690206-2ff62cbd5235?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZPT1RXQVJFfGVufDB8fDB8fHww",
    "Women's Fashion": "https://media.istockphoto.com/id/908676008/photo/portrait-of-beautiful-indian-girl-dressed-in-a-traditional-national-suit-and-gilded-hand-made.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jzp0BL3EGIYwNdY0S0Bn2VGyhso4bOsMxoKVCVgH1qA=",
    "Sports Shoes": "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    "Men's Footwear": "https://images.unsplash.com/photo-1621996659546-b0dd8b7e57af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZPT1RXQVJFfGVufDB8fDB8fHww",
    "Men's Fashion": "https://images.unsplash.com/photo-1609195994377-dbffba3a4eb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TUVOJTIwRkFTSElPTnxlbnwwfHwwfHx8MA%3D%3D",
    "Kids' Footwear": "https://images.unsplash.com/photo-1678192568444-78b428b7cd1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S0lEUyUyMEZPT1RXQVJFfGVufDB8fDB8fHww",
    "Health & Wellness": "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    "Kitchen Appliances": "https://plus.unsplash.com/premium_photo-1678375722686-c7ea507c3003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S0lUQ0hFTnxlbnwwfHwwfHx8MA%3D%3D",
    "Kids' Fashion": "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    "Mobile Phones": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "TABLEe": "https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VEFCTEV8ZW58MHx8MHx8fDA%3D",
    "Grocery & Essentials": "https://plus.unsplash.com/premium_photo-1664391960037-8aefeab6482b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R1JPQ0VSWXxlbnwwfHwwfHx8MA%3D%3D",
    "Footwear": "https://images.unsplash.com/photo-1580570424315-b309019a033e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Rk9PVFdBUkV8ZW58MHx8MHx8fDA%3D"
  
};

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    loadCategories();
  }, []);

  const scrollGrid = (direction) => {
    const grid = document.getElementById("categoryGrid");
    const card = grid.querySelector(".category-card");
  
    if (card) {
      const cardWidth = card.offsetWidth + 16; // width + gap (adjust if your gap is different)
      const visibleCards = 5;
      const scrollAmount = cardWidth * visibleCards;
  
      if (direction === "left") {
        grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    try {
      const data = await fetchProductsByCategory(categoryName);
      setCategoryProducts(data);
    } catch (err) {
      console.error("Error fetching products for category", err);
    }
  };

  return (
    <div className="category-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-scroll-container">
  <button className="scroll-btn left" onClick={() => scrollGrid("left")}>&lt;</button>

  <div className="category-grid" id="categoryGrid">
    {categories.map((cat) => (
      <div
        key={cat.product_category_id}
        className="category-card"
        onClick={() => handleCategoryClick(cat.category_name)}
      >
        <img
          src={CATEGORY_IMAGES[cat.category_name] || "https://via.placeholder.com/150"}
          alt={cat.category_name}
          className="category-image"
        />
        <p className="category-name">{cat.category_name}</p>
      </div>
    ))}
  </div>

  <button className="scroll-btn right" onClick={() => scrollGrid("right")}>&gt;</button>
</div>


{selectedCategory && (
  <div className="category-products">
    <h3 className="category-header">{selectedCategory} Products</h3>
    <div className="product-grid">
      {categoryProducts.length > 0 ? (
        categoryProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default CategorySection;
