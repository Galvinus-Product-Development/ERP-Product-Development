import React, { useState } from "react";
import "./applyCouponSidebar.css";

const coupons = [
  { code: "SAVE200", description: "Save ₹200 on orders above ₹1000" },
  { code: "FREESHIP", description: "Free shipping on your order" },
];

const ApplyCouponSidebar = () => {
  const [search, setSearch] = useState("");

  const filteredCoupons = coupons.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="apply-coupon-sidebar">
      <h4>Apply Coupons</h4>
      <input
        type="text"
        placeholder="Search coupons"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredCoupons.map((coupon) => (
          <li key={coupon.code}>
            <p><strong>{coupon.code}</strong>: {coupon.description}</p>
            <button>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplyCouponSidebar;
