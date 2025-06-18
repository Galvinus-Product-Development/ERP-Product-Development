import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import image1 from "../../assets/Picture1.webp";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({
  price,
  color,
  size,
  brand,
  filterStatus,
  viewMode,
  sortOption,
  setSortOption,
  toggleSidebar,
  selectedCategory,
}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const dummyProducts = [
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 2,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Biba" },
      ProductItems: [
        {
          sale_price: 799,
          original_price: 999,
          qty_in_stocks: 0,
          discount_applicable: false,
          Colour: { colour_name: "Red", size_name: "L" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    {
      product_id: 1,
      product_name: "Men's Casual Shirt",
      Brand: { brand_name: "Zara" },
      ProductItems: [
        {
          sale_price: 999,
          original_price: 1499,
          qty_in_stocks: 12,
          discount_applicable: true,
          Colour: { colour_name: "Blue", size_name: "M" },
          ProductImages: [{ image_url: image1 }],
        },
      ],
    },
    // Add more dummy products as needed
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        // simulate API call delay
        // const data = await fetchAllProducts();
        const data = dummyProducts;
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    getProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const item = product.ProductItems?.[0];

    const matchesPrice = item?.sale_price
      ? item.sale_price <= price
      : item?.original_price <= price;

    const matchesColor = color ? item?.Colour?.colour_name === color : true;
    const matchesSize = size ? item?.Colour?.size_name === size : true;
    const matchesBrand = brand
      ? product.Brand?.brand_name?.toLowerCase().includes(brand.toLowerCase())
      : true;
    const isInStock = filterStatus.includes("inStock")
      ? item.qty_in_stocks > 0
      : true;
    const isOnSale = filterStatus.includes("onSale")
      ? item.discount_applicable
      : true;

    return (
      matchesPrice &&
      matchesColor &&
      matchesSize &&
      matchesBrand &&
      isInStock &&
      isOnSale
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const getPrice = (p) =>
      p.ProductItems?.[0]?.sale_price || p.ProductItems?.[0]?.original_price;
    if (sortOption === "price-asc") {
      return getPrice(a) - getPrice(b);
    } else if (sortOption === "price-desc") {
      return getPrice(b) - getPrice(a);
    } else if (sortOption === "name-asc") {
      return a.product_name.localeCompare(b.product_name);
    } else if (sortOption === "name-desc") {
      return b.product_name.localeCompare(a.product_name);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <nav className="breadcrumb">
        <span>
          <a href="/">Home</a> &gt;{" "}
        </span>
        <span>
          <a href="/categories">Categories</a> &gt;{" "}
        </span>
        <span>Mobiles</span>
      </nav>
      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  price: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  brand: PropTypes.string,
  filterStatus: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default ProductList;
