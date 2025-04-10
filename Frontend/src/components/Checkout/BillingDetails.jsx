import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import './billingDetails.css';

const BillingDetails = ({ onBillingDetailsChange, isBillingValid }) => {  
    const [billingInfo, setBillingInfo] = useState({  
        firstName: "",  
        lastName: "",    
        country: "",  
        streetAddress: "",  
        townCity: "",  
        state: "",  
        pinCode: "",  
        phone: "",  
        email: "",  
    });  


    const fieldsConfig = [
        { id: "firstName", label: "First Name", type: "text" },
        { id: "lastName", label: "Last Name", type: "text" },
        { id: "streetAddress", label: "Street Address", type: "text" },
        { id: "townCity", label: "Town/City", type: "text" },
        {
            id: "country",
            label: "Country/Region",
            type: "dropdown",
            options: ["India", "United States", "Canada", "Australia"],
        },
        {
            id: "state",
            label: "State",
            type: "dropdown",
            options: ["Assam", "Bihar", "Delhi", "Goa"],
        },
        { id: "pinCode", label: "PIN Code", type: "text" },
        { id: "phone", label: "Phone", type: "text" },
        { id: "email", label: "Email", type: "email" },
    ];

    // Effect to notify parent about changes whenever billingInfo is updated  
    useEffect(() => {  

        onBillingDetailsChange(billingInfo);  
        
    }, [billingInfo, onBillingDetailsChange]);  

    const handleChange = (e) => {  
        const { id, value } = e.target;  
        setBillingInfo((prev) => ({ ...prev, [id]: value }));  
    };  



    return (
        <div className="billing-details">
            <h2>Billing Details</h2>
            <form>
            {fieldsConfig.map(({ id, label, type, options }) => (
                    <div 
                        key={id} 
                        className={`form-field ${isBillingValid[id] ? "" : "invalid-field"}`}
                        >
                        <label htmlFor={id}>{label} *</label>
                        {type === "dropdown" ? (
                            <select 
                                id={id} 
                                onChange={handleChange} 
                                value={billingInfo[id] || ""}>
                                <option value="">Select an option...</option>
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input 
                                type={type} 
                                id={id} 
                                onChange={handleChange} 
                                value={billingInfo[id] || ""} />
                        )}

                    </div>
                ))}
                </form>
            
        </div>
    );
};

BillingDetails.propTypes = {  
    onBillingDetailsChange: PropTypes.func.isRequired, 
    isBillingValid: PropTypes.object.isRequired,
};  

export default BillingDetails;

/* <div key={field} className={isBillingValid[field] ? '' : 'invalid-field'}>
                <label htmlFor="first-name">First Name *</label>
                <input type="text" id="first-name" required onChange={handleChange}/>
</div>
                <label htmlFor="last-name">Last Name *</label>
                <input type="text" id="last-name" required onChange={handleChange}/>

                <label htmlFor="country-region">Country/Region *</label>
                <select id="country-region" required onChange={(e) => handleChange({ target: { id: 'country', value: e.target.value } })}>
                    <option value="India">India</option>
                </select>

                <label htmlFor="street-address">Street Address *</label>
                <input type="text" id="street-address" required onChange={handleChange} />
                <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    onChange={handleChange}
                />

                <label htmlFor="town-city">Town/City *</label>
                <input type="text" id="town-city" required onChange={handleChange}/>

                <label htmlFor="state">State *</label>
                <select id="state" required onChange={(e) => handleChange({ target: { id: 'state', value: e.target.value } })}>
                    <option value="">Select an option...</option>
                    <option value="Assam">Assam</option>
                </select>

                <label htmlFor="pin-code">PIN Code *</label>
                <input type="text" id="pin-code" required onChange={handleChange}/>

                <label htmlFor="phone">Phone *</label>
                <input type="text" id="phone" required onChange={handleChange}/>

                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" required onChange={handleChange}/>
            
*/