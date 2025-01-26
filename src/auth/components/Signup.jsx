import React, { useState } from "react";
import "../AuthenticationForm.css";
import Alert from "../../common/Alert";

const Signup = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({
    active: false,
    message: "",
    type: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(import.meta.env.VITE_HOBB_BACKEND_URL);
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
          window.location.reload();
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
    <div className="mainbox">
      <Alert
        {...alertData}
        setInactive={() => setAlertData({ active: false })}
      />
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <span onClick={onSwitch}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
