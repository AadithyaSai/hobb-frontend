import React, { useState } from "react";
import "../AuthenticationForm.css";
import { data } from "react-router";

const Login = ({ onSwitch, onForgotPassword }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

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
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          localStorage.setItem("token", data.access_token);
          window.location.reload();
        }
      });
  };

  return (
    <div className="mc">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={onFormChange}
            required
          />
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
            style={{ color: "red", cursor: "pointer" }}
          >
            Forgot Password?
          </span>
        </p>
        <p>
          Don't have an account? <span onClick={onSwitch}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
