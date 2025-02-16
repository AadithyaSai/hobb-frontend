import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import "./AuthenticationForm.css";
import logo from "./components/logo.png";
import Orb from "./components/Orb.jsx";

const AuthenticationForm = () => {

  const navigate = useNavigate();  
  const [currentForm, setCurrentForm] = useState("login");
  const switchToLogin = () => setCurrentForm("login");
  const switchToSignup = () => setCurrentForm("signup");
  const switchToForgotPassword = () => setCurrentForm("forgotPassword");

  return (
    <div className="app-container">
      <div className="bg-div"></div>
      <div style={{ width: '100%', height: '700px', position: 'absolute', zIndex: 1 }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      {/* Logo */}
      <div className="logo-container" onClick={() => navigate("/")}>
      <img src={logo} alt="Logo" className="logo-1" />
    </div>

      {/* Form */}
      <div className="form-wrapper">
        {currentForm === "login" && (
          <Login onSwitch={switchToSignup} onForgotPassword={switchToForgotPassword} />
        )}

        {currentForm === "signup" && <Signup onSwitch={switchToLogin} />}
        {currentForm === "forgotPassword" && <ForgotPassword onSwitch={switchToLogin} />}
      </div>
    </div>
  );
};

export default AuthenticationForm;
