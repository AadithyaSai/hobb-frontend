import React, { useState } from "react";
import Alert from "../../common/Alert";
import "../AuthenticationForm.css";

const ResetPassword = ({ email, token, switchToLogin }) => {
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({
    active: false,
    message: "",
    type: "",
  });

  const handleReset = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, new_password: password }),
    })
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
            message: "Password Reset Successful! Please login.",
            type: "success",
          });
          setTimeout(() => {
            switchToLogin();
          }, 2000);
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
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <input type="email" value={email} disabled />
          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
