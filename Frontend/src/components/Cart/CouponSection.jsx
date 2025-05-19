import React from "react";
import "./couponSection.css";

const CouponSection = () => {
  return (
    <div className="coupon-summary">
      <p><strong>1 Coupon Applied</strong> - You saved ₹200</p>
      <button className="edit-coupon-btn">EDIT</button>
    </div>
  );
};

export default CouponSection;
