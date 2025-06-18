import { useState } from "react";
//import Popup from "../../utils/Popup"; // Assumes you have a reusable Popup component
import { toast } from "react-toastify";
import "./PasswordReset.css"; // Styles

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  //const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/password-reset/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(data.error || "Failed to send reset email.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="password-reset-container">
      
      <form onSubmit={handleSubmit} className="reset-form">
      <h2 className="reset-heading">Reset Your Password</h2>
        <label htmlFor="email" className="reset-label">
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="reset-input"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="reset-btn">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
