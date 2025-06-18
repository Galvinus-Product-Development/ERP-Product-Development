// src/contexts/CartContext.js
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { addToCart, addToWishlist, clearCart, fetchCart, fetchWishlist, moveWishlistItemToCart, removeCartItem, removeFromWishlist, updateCartItem, user_id } from '../../services/cartApi';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ CartItems: [] });
  const [wishlist, setWishlist] = useState({ WishlistItems: [] });
  const [cartLoading, setCartLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  
  //const storedUserId = localStorage.getItem("user_id");

  const loadCart = async () => {
    setCartLoading(true);
    try {
      const data = await fetchCart(user_id);
      setCart(data || { CartItems: [] });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Cart not found — that's fine, probably a new user.
        console.info("Cart not found yet. It will be created when user adds something.");
        setCart({ CartItems: [] }); // Or null or {} based on how your app expects it
      } else {
        // For other errors, show toast
        console.error("Failed to fetch cart:", error);
        toast.error("Failed to load cart. Please try again.");
      } 
    }
    finally {
      setCartLoading(false);
    }
  };
  const loadWishlist = async () => {
    setWishlistLoading(true);
    try {
      const data = await fetchWishlist();
      console.log("Fetched wishlist data:", data);
      setWishlist(data || { WishlistItems: [] });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      toast.error('Failed to load wishlist ❌');
    }
    finally {
      setWishlistLoading(false); // ✅ END loading
    }
  };

  useEffect(() => {
    loadCart();
    loadWishlist();
  }, []);

  const addItem = async ( product_item_id, quantity) => {
    try {
      const updated = await addToCart(user_id, product_item_id, quantity);
      setCart(updated || { CartItems: [] });
      toast.success('Item added to cart ✅');
    } catch (error) {
      toast.error('Failed to add item to cart ❌');
      console.error('Failed to add item to cart:', error);
    }
  };

  const updateItem = async (cart_items_id, quantity) => {
    try {
      const updated = await updateCartItem(user_id, cart_items_id, quantity);
      setCart(updated || { CartItems: [] });
      toast.info('Cart updated 🔄');
    } catch (error) {
      toast.error('Failed to update item ❌');
      console.error('Failed to update cart item:', error);
    }
  };
  const removeItem = async ( cart_items_id) => {
    try {
      const updated = await removeCartItem(user_id, cart_items_id);
      setCart(updated || { CartItems: [] });
      toast.warn('Item removed from cart 🗑️');
    } catch (error) {
      toast.error('Failed to remove item ❌');
      console.error('Failed to remove cart item:', error);
    }
  };
  const clear = async () => {
    try {
      const updated = await clearCart(user_id);
      setCart(updated || { CartItems: [] });
      toast.warn('Cart cleared 🧹');
    } catch (error) {
      toast.error('Failed to clear cart ❌');
      console.error('Failed to clear cart:', error);
    }
  };

  const addWishlistItem = async (product_item_id, product_id) => {
    try {
      const updated = await addToWishlist(product_item_id, product_id);
      setWishlist(updated || { WishlistItems: [] });
      toast.success('Added to wishlist ❤️');
    } catch (error) {
      toast.error('Failed to add to wishlist ❌');
      console.error('Add to wishlist failed:', error);
    }
  };
  
  const removeWishlistItem = async (wishlist_item_id) => {
    try {
      const updated = await removeFromWishlist(wishlist_item_id);
      setWishlist(updated || { WishlistItems: [] });
      toast.warn('Removed from wishlist 🗑️');
    } catch (error) {
      toast.error('Failed to remove wishlist item ❌');
      console.error('Remove from wishlist failed:', error);
    }
  };
  
  const moveToCartFromWishlist = async (wishlist_item_id) => {
    try {
      const updated = await moveWishlistItemToCart(wishlist_item_id);
      setCart(updated.cart || { CartItems: [] });
      setWishlist(updated.wishlist || { WishlistItems: [] });
      toast.info('Moved to cart 🛒');
    } catch (error) {
      toast.error('Failed to move to cart ❌');
      console.error('Move to cart failed:', error);
    }
  };
  

  const refreshCart = loadCart;

  const isCartEmpty = !cart || (cart.CartItems || []).length === 0;

  const cartItemCount = useMemo(() => {
    return (cart?.CartItems || []).reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  const wishlistItemCount = useMemo(() => {
    return (wishlist?.WishlistItems || []).length;
  }, [wishlist]);
  
  

  return (
    <CartContext.Provider value={{ 
      cart,
      wishlist,
      loading: { cartLoading, wishlistLoading },
      cartItemCount,
      addItem,
      updateItem,
      removeItem,
      clear,
      refreshCart,
      isCartEmpty,
      //cartItemCount,
      addWishlistItem,
      removeWishlistItem,
      moveToCartFromWishlist,
      wishlistItemCount,
      refreshWishlist: loadWishlist
       }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useCart = () => useContext(CartContext);
