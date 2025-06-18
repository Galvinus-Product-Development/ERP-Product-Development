/*import React, { useCallback, useState } from "react";
import BillingDetails from "./BillingDetails";
import "./CheckoutPage.css";
import YourOrder from "./YourOrder";

const CheckoutPage = () => {
    const [billingDetails, setBillingDetails] = useState({}); 
    const [isBillingValid, setIsBillingValid] = useState({
        firstName: false,
        lastName: false,
        country: false,
        streetAddress: false,
        townCity: false,
        state: false,
        pinCode: false,
        phone: false,
        email: false,  
       /* isBillingValid: true,  // Assume all fields are valid initially
    });  

    const [isOrderValid, setIsOrderValid] = useState(false);

    const handleBillingDetailsChange = useCallback((details) => {  
        setBillingDetails(details);  
        validateBillingDetails(details);  
    }, []);  

    const validateBillingDetails = (details) => {  
        const requiredFields = Object.keys(isBillingValid);
        /* [
            'firstName', 
            'lastName', 
            'country', 
            'streetAddress', 
            'townCity', 
            'state', 
            'pinCode', 
            'phone', 
            'email',
        ];  
        const validationState = {};
        requiredFields.forEach((field) => {
            validationState[field] = Boolean(details[field] && details[field].trim());
        });
        setIsBillingValid(validationState);
    };
  
    const handleOrderValidationChange = (isValid) => {
        setIsOrderValid(isValid);
    };

    const handlePlaceOrder = () => { 

        const isFormValid = Object.values(isBillingValid).every(Boolean); 
        if (!isFormValid) {  
            alert("Please fill in all required billing details.");  
            return;  
        }  
        if (!isOrderValid) {
            alert("Please select a payment method and agree to the terms and conditions.");
            return;
        }
        
        // If valid, proceed with placing the order 
        alert(`Order placed successfully!`);  
    };  


    return (
        <div className="checkout-page">
            <div className="billing-section">         
            <BillingDetails 
                onBillingDetailsChange={handleBillingDetailsChange}
                isBillingValid={isBillingValid}
                />
            </div>
            <div className="order-section">
            <YourOrder onValidationChange={handleOrderValidationChange}/>
            <button  
                type="button"  
                className="place-order-button"  
                onClick={handlePlaceOrder}  
                disabled={
                    !Object.values(isBillingValid).every(Boolean) || !isOrderValid
                }  
            >  
                Place Order  
            </button>
            </div>
             
        </div>
    );
};

export default CheckoutPage;*/