import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Homepage/components/footer";
import Header from "./components/Homepage/components/Header";
import MenuSecond from "./components/Homepage/components/MenuSecond";
import Navbar from "./components/Homepage/components/navbar";
//import MenuSecond from "./components/HomePage/MenuSecond";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      {/* <MenuSecond /> */}
      <Outlet />
      {/*  <Menu/>
      <MenuSecond/>
      */}
      <Footer />
    </>
  );
};

export default Layout;
