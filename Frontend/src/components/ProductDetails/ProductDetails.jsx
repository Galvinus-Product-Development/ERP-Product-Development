import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import "./ProductDetails.css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";
import Tabs from "./Tab";
import YouMayAlsoLike from "./YouMayAlsoLike";

const ProductDetails = () => {
  
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
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


  const relatedProducts = [
    {
      id: 1,
      name: "Product 1",
      img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-1-2-430x491.jpg",
      price: "$359",
    },
    {
      id: 2,
      name: "Product 2",
      img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-10-2-430x491.jpg.webp",
      price: "$89",
    },
    {
      id: 3,
      name: "Product 3",
      img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-5-1-430x491.jpg",
      price: "$259",
    },
    {
        id: 4,
        name: "Product 4",
        img: "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/toys10_3-430x490.jpg",
        price: "$199",
      },
  ];

  const youMayAlsoLikeProducts = relatedProducts;

  return (
    <div className="product-details-page">
      <div className="product-container">
        <ProductImages
          images={allImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
           
        />
        <ProductInfo
          product={product}
          productItems={product.productItems}
        />
      </div>

      {/* Tabs Section */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <YouMayAlsoLike products={youMayAlsoLikeProducts} />
      <RelatedProducts products={relatedProducts} />



    </div>

    
    
  
);
  
};




export default ProductDetails;
  

  
      




