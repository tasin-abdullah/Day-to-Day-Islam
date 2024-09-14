import { useState } from 'react';
import menuBarLogo from '/images/menuBar.jpeg';
import { useNavigate } from 'react-router-dom';

import homeLogo from '/images/homeSS.png'
import tasbihLogo from '/images/tasbih.png'
import salatLogo from '/images/salat2.png'
import calculatorLogo from '/images/calculator2.png'
import quizLogo from '/images/quiz.png'
import galleryLogo from '/images/islamicGallery.jpg'
import islamicProfileLogo from '/images/islamicProfile.png'

function MenuBar() {

  const userName = localStorage.getItem("userName")  || "Guest";

  const navigate = useNavigate();

  const [showMenuBar,setShowMenuBar] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null);
  const [menuItem] = useState(["Home","Jikir","Salat", "Jakat","Quiz", "Gallery"]);
  const [image] = useState([homeLogo,tasbihLogo,salatLogo,calculatorLogo,quizLogo,galleryLogo]);

  const handleRowClick = (_, index) => {
    if(index===0)navigate('/',);
    else if(index===1)navigate('/jikirTracker');
    else if(index===2)navigate('/salatSaver');
    else if(index===3)navigate('/zakatCalculator');
    else if(index===5)navigate('/Test',{state : {userName}});
    else if(index===100){
      localStorage.removeItem("userName");
      navigate('/logIn');
    }
  }

  const handleMenuBar = () => {
    setShowMenuBar(!showMenuBar);
  }

  return (
    <>
      <div className="header-container">
        <img className="menu-bar-image" 
              src={menuBarLogo} 
              alt="image" 
              onClick={handleMenuBar}
        />
        <p className='header-message'>Day To Day Islam</p>
        <p className='inline-div'>
        <span>
          {userName}
          <br/>
          <span style={{'cursor':'pointer'}}>
            <u onClick={(e) => handleRowClick(e,100)} className="header-message">
              {userName==="Guest"?"Log In":"Log Out"}
            </u>
          </span>
          
        </span>  
          <img className="menu-bar-image" 
              src={islamicProfileLogo} 
              alt="image" 
          />
        </p>
      </div>
      {showMenuBar &&
        <div className='menu-bar-container'>
          
          <table className='menu-table'>
            <thead></thead>
            <tbody>
              <tr>
              {menuItem.map((item, index) => (
                <td key={index}
                  style={{
                    backgroundColor: selectedRow === index ? "darkblue" : "green",
                    cursor: "pointer" 
                  }}
                  onMouseEnter={() => setSelectedRow(index)}
                  onMouseLeave={() => setSelectedRow(null)}
                  onClick={(event) => handleRowClick(event, index)}
                >
                  <div className="inline-menu-div">
                    <img className='home-logo' src={image[index]}/>
                    <span className="tooltiptext">{item}</span>
                  </div>    
                </td>
              ))}
              </tr>
            </tbody>
          </table>
        </div>
      }   
    </>
  );
}

export default MenuBar;
