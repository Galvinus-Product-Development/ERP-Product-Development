import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ setSelectedTab, selectedTab }) => {

    const [isOpen, setIsOpen] = useState(false);
     const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => { 
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
    const menuSections = [
        {
            heading: 'Account Settings',
            items: [
                'Profile Information',
                'Manage Address',
                'Delete Account'
            ]
        },
        {
            heading: 'My Orders',
            items: [
                'Orders & Returns'
            ]
        },
        {
            heading: 'My Items',
            items: [
                'My Reviews & Rating',
                'My Wishlist',
                'My Coupons'
            ]
        },
        {
            heading: 'Payments',
            items: [
                'Saved UPIs',
                'Saved Cards'
            ]
        },
        {
            heading: 'Legal',
            items: [
                'Terms & Conditions'
            ]
        }
    ];

    return (

        <>
         <div className="sidebar-wrapper"  ref={sidebarRef}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
        <div className={`sidebar-profile ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">Hello, User</div>
            <ul className="sidebar-tabs">
                {menuSections.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                        {section.heading && (
                            <li className="sidebar-section-heading">{section.heading}</li>
                        )}
                        {section.items.map((item) => (
                            <li
                                key={item}
                                className={`sidebar-tab ${selectedTab === item ? 'active' : ''}`}
                                onClick={() => {setSelectedTab(item); setIsOpen(false);}}
                            >
                                {item}
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
        </div>
        {isOpen && (
    <div
      className="sidebar-backdrop"
      onClick={() => setIsOpen(false)}
    />
  )}
        </>
    );
};

Sidebar.propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
};

export default Sidebar;
