import EmptyCartImage from "./EMPTYCART.png";
import "./emptyCartMessage.css";

const EmptyCartMessage = () => {
  return (
    <div className="empty-cart">
      <img src={EmptyCartImage} alt="Empty Cart" />
      <h2>Your cart is currently empty.</h2>
      <div className="wd-empty-page-text">
				Before proceed to checkout you must add some products to your shopping cart.
        <br /> 
        You will find a lot of interesting products on our &quot;Shop&quot; page.		
    </div>
      <p className="return-to-shop">
      <button onClick={() => (window.location.href = "/shopping-page")}>
        Return to Shop
      </button>
      </p>
      
    </div>
  );
};

export default EmptyCartMessage;
