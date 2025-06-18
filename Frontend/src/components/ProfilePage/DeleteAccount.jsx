import { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import './DeleteAccount.css';

const DeleteAccount = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [showFinalConfirmModal, setShowFinalConfirmModal] = useState(false);

    const handleDeleteClick = () => {
        if (!isChecked) {
            setShowValidationModal(true);
            return;
        }
        setShowFinalConfirmModal(true);
    };

    const confirmDelete = () => {
        setShowFinalConfirmModal(false);
        toast.success("Your account has been deleted.");
    };

    return (
        <div className="delete-account-container">
            <h2>Important Information Before You Delete Your Account</h2>

            <div className="delete-account-info">
                <p>If you wish to proceed with an account deletion request, please make sure you have read and understood the following:</p>
                <ol>
                    <li><strong>Pending Transactions:</strong> Ensure there are no pending orders, cancellations, returns, refunds, or other requests. Please wait for them to be completed before submitting your deletion request.</li>
                    <li><strong>Subscriptions and Memberships:</strong> All active subscriptions and memberships, along with benefits and rewards, will be lost upon deletion.</li>
                    <li><strong>Reward Points:</strong> Any unused reward points, gift cards, SuperCoins, or balances will be lost upon deletion.</li>
                    <li><strong>Data Access:</strong> Once deleted, you will lose access to:
                        <ul>
                            <li>Order history</li>
                            <li>Profile details</li>
                            <li>Wishlists</li>
                            <li>Saved addresses</li>
                            <li>Previous orders and invoices</li>
                            <li>Saved payment methods</li>
                            <li>Uploaded content or images</li>
                        </ul>
                    </li>
                    <li><strong>Legal Disputes:</strong> If there are any ongoing disputes, the platform may refuse your deletion request.</li>
                    <li><strong>Data Retention:</strong> Some data may be retained for legal reasons like fraud prevention, compliance, and regulatory purposes.</li>
                    <li><strong>New Account Creation:</strong> After deletion, logging in with the same phone/email will create a new account with no old data.</li>
                    <li><strong>Notifications:</strong> To stop receiving notifications, uninstall the app after account deletion.</li>
                </ol>

                <p>By proceeding, you acknowledge and agree to the above points. If you’re certain about deleting your account, please proceed with the request.</p>

                 <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="confirmCheckbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="confirmCheckbox">I have read and understood the information provided above.</label>
                </div>
            </div>

            <div className="delete-account-actions">
                {/*    <button className="cancel-btn" onClick={() => window.history.back()}>Keep Account</button>*/}
                <button className="delete-btn" onClick={handleDeleteClick}>Delete Account</button>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={showValidationModal}
                title="Confirmation Required"
                message="Please confirm that you have read and understood all the points before deleting your account."
                onConfirm={() => setShowValidationModal(false)}
                onCancel={() => setShowValidationModal(false)}
            />

            <ConfirmModal
                isOpen={showFinalConfirmModal}
                title="Delete Account?"
                message="Are you sure you want to delete your account? This action is irreversible."
                onConfirm={confirmDelete}
                onCancel={() => setShowFinalConfirmModal(false)}
            />
        </div>
    );
};

export default DeleteAccount;
