import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const Encrypt = () => {
  const [plainText, setPlainText] = useState("");
  const [img, setImg] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [ImgUrl, setImgUrl] = useState("");

  const handleEncrypt = (event) => {
    event.preventDefault();
    if (!plainText) {
      alert("Please enter some text to encrypt.");
      return;
    }

    if (!img) {
      alert("Please upload an image to encrypt the text.");
      return;
    }
    const formData = new FormData(event.target);
    console.log(...formData);
    fetch("http://localhost:8000/encrypt", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setEncryptedText(data.ciphertext);
        setImgUrl("data:image/png;base64," + data.stego_image);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div
          className="col-md-8 border p-4 rounded shadow text-center m-2 bg-light"
          style={{ minWidth: "400px" }} // Ensures the box has a minimum width
        >
          <h3>Encryption</h3>
          <form
            onSubmit={handleEncrypt}
            method="post"
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="plainText" className="form-label">
                Enter Plain Text
              </label>
              <input
                type="text"
                id="plainText"
                name="plaintext"
                className="form-control"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text"
              />
            </div>
            <div className="d-flex flex-column align-items-center mb-3">
              {/* Secondary Buttons */}
              <div className="d-flex justify-content-center gap-2">
                <label className="btn btn-primary mt-2">
                  {img ? img.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="form-control required d-none"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
                {/* Encrypt Button */}
                <button type="submit" className="btn btn-primary mt-2">
                  Encrypt
                </button>
              </div>
            </div>
          </form>

          <div className="bg-light p-3 rounded">
            <div className="mb-3">
              <h5>Encrypted Text:</h5>
              <div className="text-break">
                {encryptedText || "Your encrypted text will appear here."}
              </div>
            </div>
            {encryptedText && (
              <a className="btn btn-primary" href={ImgUrl} download="stego.png">
                Download Image
              </a>
            )}
          </div>
          <div className="d-flex flex-column align-items-center">
            <Link to="/home/decrypt" className="btn btn-success mt-3">
              Go to Decryption
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
    </div>
  );
};

export default Encrypt;
