import React, { useState } from "react";
import { Link } from "react-router";
import Squares from "./Squares";
import DecryptedText from "./DecryptedText";
import { useNavigate } from "react-router-dom";

const Decrypt = () => {
  const [cipherInput, setCipherInput] = useState("");
  const [stegoImg, setStegoImg] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const navigate = useNavigate();

  const handleDecrypt = (event) => {
    event.preventDefault();
    if (!stegoImg) {
      alert("Please upload stego image");
      return;
    }
    const formData = new FormData(event.target);
    console.log(...formData);
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/decrypt", {
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
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#0000FF"
        hoverFillColor="#000040"
        className="position-absolute w-100 h-100"
      />
      <div className="decryption-container row w-100 justify-content-center">
        <div
          className="col-md-8 border p-4 rounded text-center m-2 "
          style={{ minWidth: "400px" }} // Ensures the box has a minimum width
        >
          <h3>
            <DecryptedText
              text="Decrypt Me"
              style={{
                color: "white",
              }}
            />
          </h3>
          <br></br>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleDecrypt}
          >
            <div className="mb-3">
              <input
                type="text"
                id="cipherInput"
                name="ciphertext"
                className="form-control"
                value={cipherInput}
                onChange={(e) => setCipherInput(e.target.value)}
                placeholder="Enter your secret code"
              />
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center gap-3 mb-3">
              <label className="btn btn-primary mb-0">
                {stegoImg ? stegoImg.name : "Upload Image"}
                <input
                  type="file"
                  name="stego_image"
                  accept="image/*"
                  className="form-control required d-none"
                  onChange={(e) => setStegoImg(e.target.files[0])}
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Decrypt
              </button>
            </div>
          </form>
          <div className="d-flex flex-column align-items-center mb-3"></div>
          <div className="bg-light text-dark p-3 rounded">
            {decryptedText || "Here's your message"}
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <Link to="/home/" className="btn btn-primary mt-3">
              Go to Encryption
            </Link>
            <a
              className="btn btn-danger mt-3"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decrypt;
