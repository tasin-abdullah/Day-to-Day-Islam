import React from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "./menuBar";

import tasbihLogo from '/images/tasbih.png'
import salatLogo from '/images/salat2.png'
import calculatorLogo from '/images/calculator2.png'
import quizLogo from '/images/quiz.png'
import galleryLogo from '/images/islamicGallery.jpg'


function HomePage() {

  const navigate = useNavigate();

  const userName = localStorage.getItem("userName")  || "Guest";

  return (<>
    <MenuBar/>
    <div className="main-home-div">
      <h2>Our Services</h2>
      <div className="home-outer-div">
        <div className="home-inner-card">
          <h3>Jikir Tracker</h3>
          <img src={tasbihLogo} className="home-image" />
          <p className="home-card-message">
            Here you can save your daily jikir count of different 
            tasbih. You can also add and delete tasbih.
          </p>
          <button onClick={() => navigate('/jikirTracker',{state : {userName}})} 
                  className="home-button"
          >
            Save Tasbih
          </button>
        </div>

        <div className="home-inner-card">
          <h3>Salat Saver</h3>
          <img src={salatLogo} className="home-image" />
          <p className="home-card-message">
            Here you can save your daily Salat data. You 
            can also save sunnah salat and jamat salat
          </p>
          <button onClick={() => navigate('/salatSaver',{state : {userName}})} 
                  className="home-button"
          >
            Save Salat
          </button>
        </div>

        <div className="home-inner-card">
          <h3>Zakat Calculator</h3>
          <img src={calculatorLogo} className="home-image" />
          <p className="home-card-message">
            Here you can calculate your yearly jakat.
            Money, gold, silver, crops are included.
          </p>
          <button onClick={() => navigate('/zakatCalculator',{state : {userName}})}
                  className="home-button"
          >
            Calculate Zakat
          </button>
        </div>

        <div className="home-inner-card">
          <h3>Islamic Quiz</h3>
          <img src={quizLogo} className="home-image" />
          <p className="home-card-message">
            Here you can play quiz.You can examine your
            your islamic knowledge by playing our quiz
          </p>
          <button className="home-button">
            Play Quiz
          </button>
        </div>

        <div className="home-inner-card">
          <h3>Islamic Gallery</h3>
          <img src={galleryLogo} className="home-image" />
          <p className="home-card-message">
            Here you can see some historic photo related to islamic 
            glory age. Visit to enrich your knowledge.
          </p>
          <button className="home-button">
            Visit Gallery
          </button>
        </div>
      </div>
    </div>
  </>);
}

export default HomePage;
