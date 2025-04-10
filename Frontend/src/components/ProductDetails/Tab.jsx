// Tabs.jsx
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './Tab.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "description", label: "Description", content: (
      <div>
        
        <p>
          Cubilia vestibulum interdum nisl a parturient a auctor vestibulum taciti vel bibendum tempor adipiscing suspendisse posuere libero penatibus lorem at interdum tristique iaculis redosan condimentum a ac rutrum mollis consectetur.
        </p>
        <p>
          Netus nisi volutpat donec condimentum nunc eu sem odio condimentum hendrerit nisl mollis scelerisque ad vitae a eu.
        </p>
        <p>Cubilia vestibulum interdum nisl a parturient a auctor vestibulum taciti vel bibendum tempor adipiscing suspendisse posuere libero penatibus lorem at interdum tristique iaculis redosan condimentum a ac rutrum mollis consectetur. 
          Aenean nascetur vehicula egestas a adipiscing a est egestas suspendisse parturient diam adipiscing mattis elementum velit pulvinar suscipit sagittis facilisis facilisi tortor morbi at aliquam. Netus nisi volutpat donec condimentum nunc eu sem odio 
          condimentum hendrerit nisl mollis scelerisque ad vitae a eu. Etiam dictumst congue a non class risus sed a. Diam adipiscing a condimentum in a nisl a maecenas libero pharetra tincidunt phasellus justo molestie bibendum. Vestibulum penatibus vestibulum lobortis vehicula 
          euismod a platea taciti a eget in nec cum eget curabitur justo id enim mi velit at cum. Eu amet ut elit a sociis himenaeos eros nunc at pharetra magna suscipit.
          </p>

      </div>
    ) },
    { id: "additionalInfo", label: "Additional Information", content: (
      <div>
        
        <ul>
          <li>Color: Beige, Black</li>
          <li>Brand: Eva Solo</li>
          <li>Thickness: 0.39</li>
          <li>Diameter: 1.58</li>
          <li>Strap Size: Unisex</li>
        </ul>
      </div>
    )  },
    { id: "reviews", label: "Reviews", content: (
      <div>
       
        <p>No reviews yet. Be the first to write one!</p>
      </div>
    )  },
    { id: "aboutBrand", label: "About Brand" , content: (
      <div>
      
        <p>Information about the brand, its history, and mission.</p>
      </div>
    ) },
    { id: "shipping", label: "Shipping & Delivery" , content: (
      <div>
        
        <p>Details about shipping timelines and policies.</p>
      </div>
    ) },
  ];

  const [openTab, setOpenTab] = useState(null);

  useEffect(() => {
    // Ensure default desktop tab is 'Description'
    const handleResize = () => {
    if (window.innerWidth > 1024) {
      setActiveTab("description");
      setOpenTab(null);
    }
  };
  handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },  [setActiveTab]);

  const handleToggle = (id) => {
    setOpenTab(prevOpen => (prevOpen === id ? null : id)); // Toggle tab open/close
  };



  return (
    <div className="tabs">
      {/* Tab Headers */}
      <ul className="tab-list">
        {tabs.map((tab) => (
         
          <li
            key={tab.id}
            className={`tab-item ${ activeTab === tab.id ? "active" : "" }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => {
              if (window.innerWidth <= 1024) {
                // Mobile/Tablet behavior
                handleToggle(tab.id);
              } else {
                // Laptop/Desktop behavior
                setActiveTab(tab.id);
              }
            }}
          >
            <div className="tab-header">
              <span>{tab.label}</span>
              {window.innerWidth <= 1024 && (
                <span
                  className={`arrow ${openTab === tab.id ? "up" : "down" }`}
                />
              )}
            </div>
            </li>
            ))}
            </ul>
            {/* Tab Contents */}
          <div className="tab-content-container">
          {tabs.map(
            (tab) =>
          (window.innerWidth > 1024 && activeTab === tab.id) ||
            (window.innerWidth <= 1024 && openTab === tab.id) ? (
              <div key={tab.id} className="tab-content">{tab.content}</div>
            ) : null)}
        
        </div>

    </div>
  );
};

Tabs.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    
  };

export default Tabs;

  /*const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div>
            <h3>Vestibulum Tempus Metus</h3>
            <p>Cubilia vestibulum interdum nisl a parturient a auctor vestibulum taciti vel bibendum tempor adipiscing suspendisse posuere libero penatibus lorem at interdum tristique iaculis redosan condimentum a ac rutrum mollis consectetur. Aenean nascetur vehicula egestas a adipiscing a est egestas suspendisse parturient diam adipiscing mattis elementum velit pulvinar suscipit sagittis facilisis facilisi tortor morbi at aliquam.</p>
<br/><p>Netus nisi volutpat donec condimentum nunc eu sem odio condimentum hendrerit nisl mollis scelerisque ad vitae a eu.</p>
<br/><p>Etiam dictumst congue a non class risus sed a. Diam adipiscing a condimentum in a nisl a maecenas libero pharetra tincidunt phasellus justo molestie bibendum. Vestibulum penatibus vestibulum lobortis vehicula euismod a platea taciti a eget in nec cum eget curabitur justo id enim mi velit at cum. Eu amet ut elit a sociis himenaeos eros nunc at pharetra magna suscipit.</p>
          </div>
        );
      case "additionalInfo":
        return (
          <div>
            <h3>Additional Information</h3>
            <ul>
                <li>Color: Beige, Black</li>
                <li>Brand: Eva Solo</li>
                <li>Thickness: 0.39</li>
                <li>Diameter: 1.58</li>
                <li>Strap Size: Unisex</li>
            </ul>
          </div>
        );
      case "reviews":
        return (
          <div>
            <h3>Customer Reviews</h3>
            <p>No reviews yet. Be the first to write one!</p>
          </div>
        );
      case "aboutBrand":
        return (
          <div>
            <h3>About the Brand</h3>
            <p>Information about the brand, its history, and mission.</p>
          </div>
        );
      case "shipping":
        return (
          <div>
            <h3>Shipping & Delivery</h3>
            <p>Details about shipping timelines and policies.</p>
          </div>
        );
      default:
        return null;
    }
  }; */
