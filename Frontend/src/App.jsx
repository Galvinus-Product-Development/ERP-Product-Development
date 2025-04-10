import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutIndex from "./components/AboutUsPage/AboutIndex";
import CartPage from "./components/Cart/CartPage";
import CheckoutPageMain from "./components/Checkout/CheckoutPageMain";
import ContactIndex from "./components/ContactUsPage/ContactIndex";
import { CartProvider } from "./components/Context/CartContext";
import FAQ from "./components/Faq/FAQ";
import HomePageIndex from "./components/HomePage/HomePageIndex";
import LoginRegister from "./components/LoginAndRegister/LoginRegister";
import PasswordReset from "./components/LoginAndRegister/PasswordReset";
import ResetPassword from "./components/LoginAndRegister/ResetPassword";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import OrderHistoryPage from "./components/OrderHistory/OrderHistoryPage";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ShoppingPageIndex from "./components/ShoppingPage/ShoppingPageIndex";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";

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
            <Route index element={<HomePageIndex />} />
            <Route path="about" element={<AboutIndex />} />
            <Route path="contact" element={<ContactIndex />} />
            <Route path="my-account" element={<LoginRegister />} />
            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="shopping-page" element={<ShoppingPageIndex />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="cart/:user_id" element={<CartPage />} />
           <Route path="/checkout/:user_id" element={<CheckoutPageMain />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="order-history" element={<OrderHistoryPage />} />
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
