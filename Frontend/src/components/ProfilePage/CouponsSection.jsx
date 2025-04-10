import React, { useState } from "react";
import "./CouponsSection.css"; // Import CSS for styling

const CouponsSection = () => {
    // Dummy data for coupons
    const [coupons, setCoupons] = useState([
        { id: 1, title: "EXTRA 10% off on Men's Cloth", code: "2023MD", expiry: "31 Mar 2025", category: "Men's Fashion" , applied: false},
        { id: 2, title: "EXTRA 5% off on Men's Cloth", code: "2023M5", expiry: "7 Jul 2025", category: "Men's Fashion", applied: false },
        { id: 3, title: "EXTRA 30% off on Women's Cloth", code: "2023WD", expiry: "31 Jul 2025", category: "Women's Fashion", applied: false },
        { id: 4, title: "EXTRA 75% off on Sandals", code: "2023SD", expiry: "7 Jul 2025", category: "Footwear", applied: false }
    ]);
    // Function to handle coupon application
    const applyCoupon = (id) => {
        setCoupons(coupons.map(coupon => 
            coupon.id === id ? { ...coupon, applied: !coupon.applied } : coupon
        ));
    };

    return (
        <div className="coupons-container">
            <h2>Available Coupons</h2>
            <div className="coupons-grid">
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <div className="coupon-card" key={coupon.id}>
                            <h3>{coupon.title}</h3>
                            <p><strong>Code:</strong> {coupon.code}</p>
                            <p><strong>Expiry:</strong> {coupon.expiry}</p>
                            <p className="coupon-category"><strong>Category:</strong> {coupon.category}</p>
                            <button 
                                className={`apply-button ${coupon.applied ? "applied" : ""}`} 
                                onClick={() => applyCoupon(coupon.id)}
                                disabled={coupon.applied}
                            >
                                {coupon.applied ? "Applied ✅" : "Apply"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No coupons available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default CouponsSection;