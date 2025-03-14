import React, { useState } from "react";
import Alert from "../../common/Alert";
import "../AuthenticationForm.css";

const ForgotPassword = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [alertData, setAlertData] = useState({
    active: false,
    message: "",
    type: "",
  });

  const handleReset = (e) => {
    e.preventDefault();
    fetch(
      import.meta.env.VITE_HOBB_BACKEND_URL +
        "/users/forgot-password?email=" +
        email,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (!res.ok) {
          setAlertData({
            active: true,
            message: "Bad credentials! Please try again.",
            type: "danger",
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setAlertData({
            active: true,
            message: "Reset Link Sent! Please check your email.",
            type: "success",
          });
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          console.error("Network error or CORS issue:", error.message);
          setAlertData({
            active: true,
            message: "Network Error! Please try again later.",
            type: "danger",
          });
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div>
      <Alert
        {...alertData}
        setInactive={() => setAlertData({ ...alertData, active: false })}
      />
      <div style={{ marginTop: "50px" }} className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Send Reset Link
          </button>
        </form>
        <p style={{ fontWeight: "500", color: "violet" }}>
          Remember your password?{" "}
          <span onClick={onSwitch} style={{ fontWeight: "bold" }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
