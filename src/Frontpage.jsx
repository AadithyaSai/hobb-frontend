import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./FrontPage.css"; // Ensure you have styles for layout
import CircularGallery from "./CircularGallery";
import logo from "./logo.png";
import image from "./image.webp"
import sai from "./sai.jpg";
import gopz from "./gopz.jpg";
import ammu from "./ammu.jpg";
import nadim from "./nadim.jpg";
import SplitText from "./SplitText.jsx";
import ShinyText from './ShinyText.jsx';

window.onload = function () {
  var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
  shadowRoot.querySelector("#logo").remove();
};

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
const FrontPage = () => {

  window.onload = () => {
    AOS.init();
  }

  return (
    <div className="front-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </h2>
        <ul className="nav-links">
         <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#contact">Contact</a></li>
          <li><button className="nav-button">Login / Sign Up</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div id = "home" className="hero-container">
        <div className="welcome-section">


        <h1 style={{ fontSize: "3rem" }}><SplitText
        text="Welcome to HOBB"
        className="text-2xl font-semibold text-center"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={handleAnimationComplete}
        /></h1>

<h1 style={{ fontSize: "1.5rem" }}><ShinyText text="Advanced encryption and stealth protection, redefining the standard for secure data exchange." disabled={false} speed={3} className='custom-class' /></h1>

       <button className="cta-button">Let's get started</button>
        </div>
        <div className="hero-section">
          <spline-viewer className="spline-model" url="https://prod.spline.design/ti2zZfnTxAkiwCOE/scene.splinecode"></spline-viewer>
        </div>
      </div>

      {/* Circular Gallery */}
      <h1 style={{ color: "#0072ff" }}>WHY US?</h1>
      <div className="circular-gallery-container">
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>

      {/* About Us Section */}
      <section data-aos="flip-left" data-aos-easing="ease-in-back" data-aos-duration="1000" id = "about" className="about-us">
        <h2 >About Us</h2>
       <p>
       <ShinyText text="At HOBB, we specialize in cutting-edge encryption and secure communication solutions.
          Our mission is to empower individuals and businesses with innovative security tools 
          that ensure privacy and data integrity." disabled={false} speed={3} className='custom-class' />
        </p>
      </section>

{/* Team Section */}
<section data-aos="fade-down" data-aos-easing="ease-in-back" data-aos-duration="1000" id = "team" className="team-section">
  <h2>Meet Our Team</h2>
  <div className="team-container">
    <div className="team-member">
      <img src={sai} alt="Aadithya Sai G Menon" className="team-img" />
      <h3>Aadithya Sai G Menon</h3>
    </div>
    <div className="team-member">
      <img src={ammu} alt="Amala Gopinath" className="team-img" />
      <h3>Amala Gopinath</h3>
    </div>
    <div className="team-member">
      <img src={nadim} alt="Nadim Naisam" className="team-img" />
      <h3>Nadim Naisam</h3>
    </div>
    <div className="team-member">
      <img src={gopz} alt="Gopika Chandran A J" className="team-img" />
      <h3>Gopika Chandran A J</h3>
    </div>
  </div>
  </section>

      {/* Contact Us Section */}
      <section id = "contact" className="contact-us">
        <h2>Contact Us</h2>
        <p>Email: aadithyas0610@gmail.com</p>
        <p>Phone: +91 8075606049</p>
      </section>
    </div>
  );
};

export default FrontPage;
