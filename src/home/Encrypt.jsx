import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Link } from "react-router";
import Squares from "./Squares";
import DecryptedText from "./DecryptedText";
import { useNavigate } from "react-router-dom";
import { button } from "framer-motion/client";

const Encrypt = () => {
  const [plainText, setPlainText] = useState("");
  const [img, setImg] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

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
    fetch(import.meta.env.VITE_HOBB_BACKEND_URL + "/encrypt", {
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
    <div className="d-flex justify-content-center align-items-center vh-100 border vw-100">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#008000"
        hoverFillColor="#003000"
        className="position-absolute w-100 h-100"
      />
      <div
        className="encryption-container col-md-8 p-4 rounded shadow text-center m-2"
        style={{ minWidth: "400px" }} // Ensures the box has a minimum width
      >
        <h3>
          <DecryptedText
            text="Encrypt Me"
            style={{
              color: "white",
            }}
          />
        </h3>
        <br></br>
        <form
          onSubmit={handleEncrypt}
          method="post"
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <input
              type="text"
              id="plainText"
              name="plaintext"
              className="form-control"
              value={plainText}
              autoComplete="off"
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Drop your secret message here!!"
            />
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center gap-3 mb-3">
            {/* Secondary Buttons */}
            <label className="btn btn-success m-0">
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
            <button type="submit" className="btn btn-success">
              Encrypt
            </button>
          </div>
        </form>

        <div
          className="bg-light p-3 rounded"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          <div className="mb-3">
            <div className="text-dark">
              {encryptedText || "Here's your secret code !"}
            </div>
          </div>
          {encryptedText && (
            <div>
              <a
                className="btn btn-success p-1 me-2"
                onClick={() => navigator.clipboard.writeText(encryptedText)}
              >
                <MdContentCopy />
              </a>
              <a className="btn btn-success" href={ImgUrl} download="stego.png">
                Download Image
              </a>
            </div>
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
              navigate("/auth");
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
