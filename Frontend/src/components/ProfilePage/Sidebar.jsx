import PropTypes from 'prop-types';
import React from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ setSelectedTab, selectedTab }) => {
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
        },
        {
            heading: '', // No heading for Logout, it's standalone
            items: [
                'LogOut'
            ]
        }
    ];

    return (
        <div className="sidebar">
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
                                onClick={() => setSelectedTab(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
};

export default Sidebar;
