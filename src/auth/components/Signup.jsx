import React, { useState } from "react";
import "../AuthenticationForm.css";

const Signup = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // const user = { name, email, password };
    const user = { email, password };
    console.log(import.meta.env.VITE_HOBB_BACKEND_URL);
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <div className="mainbox">
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
