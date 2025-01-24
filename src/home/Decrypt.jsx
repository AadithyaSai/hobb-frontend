import React, { useState } from "react";
import { Link } from "react-router";
import Squares from "./Squares";

const Decrypt = () => {
  const [cipherInput, setCipherInput] = useState("");
  const [stegoImg, setStegoImg] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleDecrypt = (event) => {
    event.preventDefault();
    if (!stegoImg) {
      alert("Please upload stego image");
      return;
    }
    const formData = new FormData(event.target);
    console.log(...formData);
    fetch("http://localhost:8000/decrypt", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setDecryptedText(data.plaintext);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
        className="position-absolute w-100 h-100"
      />
      <div
        className="encryption-container col-md-8 border p-4 rounded shadow text-center m-2"
        style={{ minWidth: "400px" }} // Ensures the box has a minimum width
      >
        <h3>Decryption</h3>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleDecrypt}
        >
          <div className="mb-3">
            <label htmlFor="cipherInput" className="form-label">
              Enter Cipher Text
            </label>
            <input
              type="text"
              id="cipherInput"
              name="ciphertext"
              className="form-control"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="Enter cipher text"
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="btn btn-primary">
              {stegoImg ? stegoImg.name : "Upload Image"}
              <input
                type="file"
                name="stego_image"
                accept="image/*"
                className="form-control required d-none"
                onChange={(e) => setStegoImg(e.target.files[0])}
              />
            </label>
            <button type="submit" className="btn btn-primary mt-4 btn-lg">
              Decrypt
            </button>
          </div>
        </form>
        <div className="d-flex flex-column align-items-center mb-3"></div>
        <div className="bg-light p-3 rounded">
          <h5>Decrypted Text:</h5>
          {decryptedText || "Your decrypted text will appear here."}
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          <Link to="/home/" className="btn btn-success mt-3">
            Go to Encryption
          </Link>
          <a
            className="btn btn-danger mt-3"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Decrypt;
