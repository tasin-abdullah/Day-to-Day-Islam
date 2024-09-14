import React from 'react';


import prfileLogo from '/images/profile.png'
import gmailLogo from '/images/gmail.png'
import whatsappLogo from '/images/whatsapp.png'
import gitHubLogo from '/images/gitHubLogo1.png'
import webLogo from "/images/webLogo.png"


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <img src={webLogo} alt="image" className="web-logo" />
        Islamic Prayer Tracker
      </div>
      <div className="outer-div">
        <div className="footer-left-div">
          <h3>Contact</h3>
          <div className="first-grid">
            <span className="inline-div">
              <img src={gitHubLogo} className="footer-logo" />
              <a href="https://github.com/Sakib-2004043" className="link-holder">
                GitHub
              </a>
            </span>
            <span className="inline-div">
              <img src={gmailLogo} className="footer-logo" />
              <a href="mailto:u2004043@student.cuet.ac.bd" className="link-holder">
                G-mail
              </a>
            </span>
            <span className="inline-div">
              <img src={whatsappLogo} className="footer-logo" />
              <a href="https://wa.me/8801993634837" className="link-holder">
                Whatsapp
              </a>
            </span>
          </div>
          
          </div>
          <div className="footer-inner-div">
            <button className="join-button">
              About Us
            </button>
            <p><a href="#" className="link-holder">Privacy Policy</a></p>
            <p><a href="#" className="link-holder">Terms of Use</a></p>
            <p><a href="#" className="link-holder">Disclaimer</a></p>
            <p><a href="#" className="link-holder">Help Center</a></p>
          </div>
          <div className="footer-inner-div">
            <h3>Advice</h3>
            <p>
              Join our community of believers 
              on our website. Together, 
              we deepen our spiritual connection through 
              prayer. Find support as we strengthen 
              our faith.
            </p>
          </div>
        </div>
        <div>
          <span> &copy; {new Date().getFullYear()} Day To Day Islam</span>
          <br /><br />
          --★★★--
        </div>
      </footer>
  );
};

export default Footer;
