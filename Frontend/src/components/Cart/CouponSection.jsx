import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { fetchAvailableCoupons, user_id } from "../../services/couponApi";
import "./couponSection.css";

const CouponSection = ({ onApplyCoupon, appliedCoupon, onEditCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    const loadCoupons = async () => {
      const data = await fetchAvailableCoupons(user_id); // use imported mock user_id
      setCoupons(data);
    };
    loadCoupons();
  }, []);

  const handleApply = (coupon) => {
    onApplyCoupon(coupon);
    setShowList(false);
  };

  return (
    <div className="coupon-summary">
       {appliedCoupon ? (
        <>
          <p><strong>1 Coupon Applied</strong> - You saved ₹{appliedCoupon.discount}</p>
          <button className="edit-coupon-btn" onClick={onEditCoupon}>EDIT</button>
        </>
      ) : (
        <>
          <h3>Coupons for you</h3>
          <div className="apply-coupon" onClick={() => setShowList(true)}>
            <span className="coupon-icon">🏷️</span>
            <span className="coupon-text">Apply Coupons</span>
            <button className="apply-btn">Apply</button>
          </div>
        </>
      )}
      {showList && (
        <div className="coupon-modal-overlay">
          <div className="coupon-modal">
            <div className="coupon-modal-header">
              <h2>Available Coupons</h2>
              <button className="close-modal" onClick={() => setShowList(false)}>✖</button>
            </div>
            <ul className="coupon-list">
              {coupons.map((coupon) => (
                <li key={coupon.id}>
                  <span>{coupon.code} - ₹{coupon.discount}</span>
                  <button onClick={() => handleApply(coupon)}>Use</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

CouponSection.propTypes = {
  onApplyCoupon: PropTypes.func.isRequired,
  appliedCoupon: PropTypes.shape({
    discount: PropTypes.number.isRequired,
  }),
  onEditCoupon: PropTypes.func.isRequired,
};


export default CouponSection;
