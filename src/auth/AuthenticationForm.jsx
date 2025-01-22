import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import "./AuthenticationForm.css";
import logo from "./components/logo.jpg";
import Waves from "./components/Waves";

    
const AuthenticationForm = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const switchToLogin = () => setCurrentForm("login");
  const switchToSignup = () => setCurrentForm("signup");
  const switchToForgotPassword = () => setCurrentForm("forgotPassword");

  return (

    
    <div className="app-container">

<Waves
lineColor="#fff"
backgroundColor="rgba(255, 255, 255, 0.2)"
waveSpeedX={0.02}
waveSpeedY={0.01}
waveAmpX={40}
waveAmpY={20}
friction={0.9}
tension={0.01}
maxCursorMove={120}
xGap={12}
yGap={36}
/>
      <div className="align-containor">
      <img src={logo} alt="Logo" className="logo" />
      
      {currentForm === "login" && (
         <Login
           onSwitch={switchToSignup}
           onForgotPassword={switchToForgotPassword}
         />
       )}
       {currentForm === "signup" && <Signup onSwitch={switchToLogin} />}
       {currentForm === "forgotPassword" && (
         <ForgotPassword onSwitch={switchToLogin} />
       )}
      </div>
    </div>
  );
};

export default AuthenticationForm;
