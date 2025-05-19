import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import SuggestedProducts from "../Homepage/components/SuggestedProducts";
import YouMayAlsoLikeProducts from "../Homepage/components/YouMayAlsoLikeProducts";
import "./ProductDetails.css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import Tabs from "./Tab";

const ProductDetails = () => {
  
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);  // Define the setter
  const [selectedImage, setSelectedImage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);  // Define the setter
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        const combinedData = {
          ...data.product,            // flatten product fields
          productItems: data.productItems || []  // attach productItems
        };
  
        setProduct(combinedData);   // ✅ Now product_name, etc. will work
        setLoading(false);
  
        // Set default image
        const allImgs = combinedData.productItems?.flatMap(item =>
          item.ProductImages?.map(img => img.image_url)
        ).filter(Boolean);
        if (allImgs?.length) setSelectedImage(allImgs[0]);
  
  
      } catch (error) {
        console.error("Failed to load product:", error);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // When product changes, set the default selected image
useEffect(() => {
  if (!product) return;

  const allImgs = product?.productItems?.flatMap(item =>
    item.ProductImages?.map(img => img.image_url)
  ).filter(Boolean);

  if (allImgs?.length) {
    setSelectedImage(allImgs[0]);
  }
}, [product]);

console.log("loading:", loading);
console.log("product:", product);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p className="not-found">Product not found!</p>;
 // Get all images from productItems (aligned with backend)
const allImages = product?.productItems?.flatMap((item) =>
  item.ProductImages?.map((img) => ({ image_url: img.image_url }))
).filter(Boolean) || [];


  return (
    <div className="product-details-page">
      <div className="product-container">
        <div className="breadcrumb-product-container">
       <div className="breadcrumb-container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li><span>&gt;</span></li>
            <li><Link to="/shopping-page">Shopping Page</Link></li>
            <li><span>&gt;</span></li>
            <li>
              <Link to={`/product-details/${product.product_id}`}>
                {product.product_name}
              </Link>
            </li>
          </ol>
        </nav>
      </div>

        <ProductImages
          images={allImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          product={product}
          selectedVariant={selectedVariant}  // Pass selected variant
          isAvailable={isAvailable}  // Pass availability status
           
        />
        </div>
        <ProductInfo
          product={product}
          productItems={product.productItems}
          setSelectedVariant={setSelectedVariant}  // Update the variant in the parent component
          setIsAvailable={setIsAvailable} 
          selectedVariant={selectedVariant}
        />
      </div>

      {/* Tabs Section */}
      <Tabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        productId={id} 
        product={product} 
      />

      <YouMayAlsoLikeProducts />
      <SuggestedProducts />



    </div>

         );
  };
export default ProductDetails;
  

  
      




