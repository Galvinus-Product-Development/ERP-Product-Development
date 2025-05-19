import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutIndex from "./components/AboutUsPage/AboutIndex";
import CartPage from "./components/Cart/CartPage";
import CheckoutPageMain from "./components/Checkout/CheckoutPageMain";
import ContactUs from "./components/ContactUsPage/ContactUs";
import { CartProvider } from "./components/Context/CartContext";
import FAQ from "./components/Faq/FAQ";
import HomePage from "./components/Homepage/HomePage";
import LoginRegister from "./components/LoginAndRegister/LoginRegister";
import PasswordReset from "./components/LoginAndRegister/PasswordReset";
import ResetPassword from "./components/LoginAndRegister/ResetPassword";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import CancelOrderPage from "./components/OrderHistory/CancelOrderPage";
import OrderPage from "./components/OrderHistory/OrderPage";
import TrackOrderPage from "./components/OrderHistory/TrackOrderPage";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ShoppingPageIndex from "./components/ShoppingPage/ShoppingPageIndex";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import Wishlist from "./components/Wishlist/Wishlist";

import { gapi } from "gapi-script";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  return (
    <>
    <CartProvider> 
      <Router>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutIndex />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="my-account" element={<LoginRegister />} />
            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="shopping-page" element={<ShoppingPageIndex />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="cart/:user_id" element={<CartPage />} />
            <Route path="wishlist" element={<Wishlist />} />
           <Route path="/checkout/:user_id" element={<CheckoutPageMain />} />
            <Route path="order-confirmation/:order_id" element={<OrderConfirmation />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="/orders/:orderId/items/:orderItemId/track" element={<TrackOrderPage />} />
            <Route path="/orders/:orderId/items/:orderItemId/cancel" element={<CancelOrderPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
      </CartProvider>
    </>
  );
}

export default App;
