import React from "react";
import { useCart } from "../Context/CartContext";
import "./Wishlist.css";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const {
    wishlist,
    loading: { wishlistLoading },
    removeWishlistItem,
    moveToCartFromWishlist,
  } = useCart();

  const items = wishlist?.WishlistItems || [];

  if (wishlistLoading) {
    return <div className="wishlist-loader">Loading...</div>;
  }

  return (
    <div className="wishlist-container">
       <h2 className="wishlist-heading">Your Wishlist ❤️</h2>
       {items.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={removeWishlistItem}
              onMoveToCart={moveToCartFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Wishlist;

      