import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import Popup from "../../utils/Popup"; // Assumes you have a reusable Popup component
import { toast } from "react-toastify";
import "./ResetPassword.css"; // Styles

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/password-reset/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully.");
        setTimeout(() => {
          navigate("/my-account"); // change "/login" to your actual login route
        }, 1500);
      } else {
        toast.error(data.error || "Failed to reset password.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      
      <form onSubmit={handleSubmit} className="reset-form">
      <h2 className="reset-heading">Set Your New Password</h2>
        <label htmlFor="password" className="reset-label">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="reset-input"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password" className="reset-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          className="reset-input"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
