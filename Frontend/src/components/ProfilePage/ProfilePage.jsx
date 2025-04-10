import React, { useState } from 'react';
import CouponsSection from './CouponsSection';
import DeleteAccount from './DeleteAccount';
import ManageAddress from './ManageAddress';
import ProfileInformation from './ProfileInformation';
import './ProfilePage.css'; // Import the new CSS file
import Reviews from './Reviews';
import SavedCards from './SavedCards';
import SavedUPI from './SavedUPI';
import Sidebar from './Sidebar';
import Wishlist from './Wishlist';

const ProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState('Profile Information');

    const renderContent = () => {
        switch (selectedTab) {
            case 'Profile Information':
                return <ProfileInformation />;
                case 'Manage Address':
                    return <ManageAddress />;
                case 'Delete Account':
                    return <DeleteAccount />;
                case 'My Reviews & Rating' :
                     return <Reviews/>;  
                case 'My Coupons':
                    return <CouponsSection/>; 
                case 'Saved Cards':
                    return <SavedCards/>; 
                case 'Saved UPIs':
                     return <SavedUPI/>;
                case 'My Wishlist':
                    return <Wishlist/>;
            // Other cases will be added later
            default:
                return <ProfileInformation />;
        }
    };

    return (
        <div className="profile-page-container">
            <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
            <div className="profile-page-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfilePage;
