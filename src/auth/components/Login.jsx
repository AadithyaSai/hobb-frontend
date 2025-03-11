import React, { useState } from "react";
import "../AuthenticationForm.css";
import { useNavigate } from "react-router-dom";
import Alert from "../../common/Alert";

const Login = ({ onSwitch, onForgotPassword }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [alertData, setAlertData] = useState({
    active: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = new URLSearchParams(formData).toString();
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: user,
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
          console.log(data);
          localStorage.setItem("token", data.access_token);
          navigate("/home");
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
    <div className="mc">
      <Alert
        {...alertData}
        setInactive={() => setAlertData({ ...alertData, active: false })}
      />
      <div className="form-container">
        <br></br>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {/* <label htmlFor="username">Email</label> */}
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={onFormChange}
            required
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onFormChange}
            required
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p>
          <span
            onClick={onForgotPassword}
            style={{ fontWeight: "500", color: "red", cursor: "pointer" }}
          >
            Forgot Password?
          </span>
        </p>
        <p style={{ fontWeight: "500", color: "violet" }}>
          Don't have an account?{" "}
          <span onClick={onSwitch} style={{ fontWeight: "bold" }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
