import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import Popup from "../../utils/Popup";
// import { GoogleLogin } from "react-google-login";
import "./LoginRegister.css";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deviceId = localStorage.getItem("deviceId") || generateDeviceId();
    const userAgent = navigator.userAgent;

    const url = isLoginPage
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      "x-refresh-token": localStorage.getItem("refreshToken") || "",
      "x-device-id": deviceId, // Send deviceId in headers
      "user-agent": userAgent, // Send user agent in headers
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: !isLoginPage ? formData.username : undefined,
          email: formData.email,
          password: formData.password,
          deviceId: deviceId,
          userAgent: userAgent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          isLoginPage ? "Login successful!" : "Registration successful!"
        );
        if (data.accessToken)
          localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken)
          localStorage.setItem("refreshToken", data.refreshToken);

        //  Redirect to homepage after login
        if (isLoginPage) {
          navigate("/");
        }
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error occurred. Please try again.");
    }
  };

  

  const responseGoogle = async (response) => {
    try {
      if (response.tokenId) {
        // Collect device information
        const deviceInfo = {
          userAgent: navigator.userAgent, // Get user agent from the browser
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          "x-refresh-token": localStorage.getItem("refreshToken") || "",
          "x-device-id": localStorage.getItem("deviceId") || generateDeviceId(), // Send device ID (if available)
          "user-agent": navigator.userAgent,
        };

        // Send the Google token and device info to the backend
        const res = await fetch("http://localhost:5000/api/auth/google-login", {
          method: "POST",
          headers,
          body: JSON.stringify({
            tokenId: response.tokenId,
            deviceInfo, // Send device info with the request
          }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Google login successful!");
          if (data.accessToken)
            localStorage.setItem("accessToken", data.accessToken);
          if (data.refreshToken)
            localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        } else {
          toast.error(data.error || "Google login failed.");
        }
      } else {
        toast.error("Google login did not return a valid token.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Error during Google login. Try again.");
    }
  };
  const generateDeviceId = () => {
    const deviceId = `device-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("deviceId", deviceId);
    return deviceId;
  };


  return (
    <div className="login-register-container">
      
      <div className="form-wrapper">
        <h2 className="form-heading">{isLoginPage ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="form">
          {!isLoginPage && (
            <>
              <label htmlFor="username" className="form-label">
                Username <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label htmlFor="email" className="form-label">
            Email Address <span className="required-asterisk">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="form-label">
            Password <span className="required-asterisk">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="form-footer">
                <a href="/password-reset" className="lost-password">
                  Lost your password?
                </a>
              </div>

          <button type="submit" className="form-btn">
            {isLoginPage ? "Login" : "Register"}
          </button>

          <p className="switch-page-text">
          {isLoginPage
            ? "Haven’t registered yet? "
            : "Already have an account? "}
          <span className="switch-link" onClick={() => setIsLoginPage(!isLoginPage)}>
            {isLoginPage ? "Register first!" : "Login here!"}
          </span>
        </p>

          {isLoginPage && (
            <>
              
              <div className="or-login">
                <p>OR LOGIN WITH</p>
              </div>
              <div className="social-login">
                <GoogleLogin
                  clientId={googleClientId}
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="social-btn google-btn"
                />
              </div>
            </>
          )}
        </form>

        
      </div>
    </div>
  );
};

export default LoginRegister;

  /*return (
    <div className="login-register-container">
      {popup.visible && (
        <Popup message={popup.message} type={popup.type} onClose={closePopup} />
      )}
      <div className="login-register-row">
        <div
          className={`form-column ${
            isLoginPage ? "login-column" : "register-column"
          }`}
        >
          <h2 className="form-heading">{isLoginPage ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLoginPage && (
              <>
                <label htmlFor="username" className="form-label">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="form-btn">
              {isLoginPage ? "Login" : "Register"}
            </button>
            {isLoginPage && (
              <>
                <div className="form-footer">
                  <a href="/password-reset" className="lost-password">
                    Lost your password?
                  </a>
                </div>
                <div className="or-login">
                  <p>OR LOGIN WITH</p>
                </div>
                <div className="social-login">
                  <GoogleLogin
                    clientId={googleClientId}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    className="social-btn google-btn"
                  />
                </div>
              </>
            )}
          </form>
        </div>
        <div
          className={`info-column ${
            isLoginPage ? "login-info-column" : "register-info-column"
          }`}
        >
          <h2>{isLoginPage ? "Register here" : "Login here"}</h2>
          <p className="info-text">
            {isLoginPage
              ? `Registering for this site allows you to access your order status
                and history. Just fill in the fields below, and we’ll get a new
                account set up for you in no time. We will only ask you for
                information necessary to make the purchase process faster and
                easier.`
              : `Login here by filling your username and password or use your
                favorite social network account to enter the site. Site login
                will simplify the purchase process and allows you to manage your
                personal account.`}
          </p>
          <a
            href="#"
            className="switch-page-btn"
            onClick={() => setIsLoginPage((prev) => !prev)}
          >
            {isLoginPage ? "Register here" : "Login here"}
          </a>
          <h4>Or log out if already logged in.</h4>
          <a onClick={handleLogout} className="logout">
            Logout here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

const handleLogout = async () => {
    try {
      // Collect device information
      const deviceInfo = {
        userAgent: navigator.userAgent, // Fetch user agent from the browser
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        "x-refresh-token": localStorage.getItem("refreshToken") || "",
        "x-device-id": localStorage.getItem("deviceId") || "", // Send device ID in headers (same as login)
        "user-agent": navigator.userAgent, // Send user agent in headers
      };

      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers,
        body: JSON.stringify({ deviceInfo }), // Send device info with logout request
      });
      const data = await response.json();


      if (response.ok) {
        // Clear tokens from storage
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logged out successfully!");
      } else {
        toast.error(data.error || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Unexpected error occurred during logout.");
    }
  };
*/
