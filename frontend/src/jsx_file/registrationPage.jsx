import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import registrationService from "../services/registrationService";
import salatService from "../services/salatService";

function RegistrationPage() {

  const navigate=useNavigate();

  const [userNameMessage,setUserNameMessage] = useState("");
  const [gmailMessage,setGmailMessage] = useState("");
  const [passwordMessage,setPasswordMessage] = useState("");
  const [confirmPasswordMessage,setConfirmPasswordMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validUserName = async(userName) =>{
    try {
      const response = await registrationService.checkUser({userName});      return response.data.success;
    } 
    catch (error) {
      console.log("Error Occured : ",error.message);
      throw(error);
    }
  }

  const handleCreateUser = async(event) => {

    const userName = document.getElementById('userName').value;
    const gmail = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if(password !== confirmPassword){
      setConfirmPasswordMessage("Confirmed Password Doesn't Match");
    }
    else if (!userName){
      setUserNameMessage("Enter User-Name");
    }
    else if (!gmail){
      setGmailMessage("Enter Gmail");
    }
    else if (!password){
      setPasswordMessage("Enter Password");
    }
    else if (!confirmPassword){
      setConfirmPasswordMessage("Enter User-Name");
    }
    else if(await validUserName(userName) === false){
      setUserNameMessage("This User-Name Has Taken.");
    }
    else{
      try {
        await registrationService.createJikir({userName});
      } 
      catch (error) {
        console.log("Error Occured : ",error.message);
        throw(error);
      }
      
      try {
        await salatService.createSalat({userName});
      } 
      catch (error) {
        console.log("Error Occured : ",error.message);
        throw(error);
      }
      
      const formData = {userName,gmail,password}
      try {
        await registrationService.createUser(formData);
        setSuccessMessage("Registration Successfull.");
        setTimeout(() => {
          navigate('/logIn');
        }, 1000);
      } 
      catch (error) {
        console.log("Error Occured : ",error.message);
        throw(error);
      }   
    }
  }

  const resetMessage = () => {
    setUserNameMessage("");
    setGmailMessage("");
    setPasswordMessage("");
    setConfirmPasswordMessage("");
  }

  // left Div Part
  const [text, setText] = useState('');
  const messages = [
    "\"And establish prayer and give Zakah, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing.\" - Quran (2:110)",
    "\"Indeed, those who believe and do righteous deeds and establish prayer and give Zakah will have their reward with their Lord, and there will be no fear concerning them, nor will they grieve.\" - Quran (2:277)", 
    "\"Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [ Allah's blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.\" - Quran (9:103)",
    "\"So remember Me; I will remember you. And be grateful to Me and do not deny Me.\" (Quran 2:152)",
    "\"And the men and the women who remember Allah much with their hearts and tongues. Allah has prepared for them forgiveness and a great reward.\" (Quran 33:35)",
    "\"Recite what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater. And Allah knows that which you do.\" (Quran 29:45)",
    "\"Successful indeed are the believers, those who offer their prayers with all solemnity and full submissiveness.\" (Quran 23:1-2)"
  ];
  const intervalTime = 50; // Adjust speed of animation by changing interval time
  const transitionTime = 10000; // Time to wait before transitioning to the next message

  useEffect(() => {
    let messageIndex = 0;
    let currentIndex = 0;
    let timeout;

    const animateText = () => {
      if (currentIndex <= messages[messageIndex].length) {
        setText(messages[messageIndex].substring(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(animateText, intervalTime);
      } else {
        clearTimeout(timeout);
        setTimeout(() => {
          currentIndex = 0;
          messageIndex = (messageIndex + 1) % messages.length; // Loop back to the first message if it's the last one
          animateText();
        }, transitionTime);
      }
    };

    const initialTimeout = setTimeout(() => {
      animateText();
    }, 0);

    // Clear timeouts when component unmounts
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeout);
    };
  }, []);
  

  return (
    <div>
      <header className="login-header"> {/* css is in login.css  */}
        <h1>
          Day to Day Islam
        </h1>
      </header>
      <br />
      <p className="guest-link"> {/* css is in login.css  */}
        <u style={{cursor:'pointer'}}
          onClick={() => navigate('/')}
          >Visit As A Guest
        </u>
      </p>
      
      <div className="div-container"> {/* css is in login.css  */}
        <div className="first-div">   {/* css is in login.css  */}
          <h1>Islamic Lifestyle & Development Place</h1>
          <br /><br />
          <h2 style={{color:"lightyellow"}}>
            Welcome to our Islamic Prayer Tracker, a digital companion 
            designed to enhance your spiritual journey. Whether you're 
            a seasoned practitioner or just beginning to explore the 
            beauty of Islamic prayer, our platform offers a seamless way 
            to stay connected with your faith. With intuitive features 
            and personalized tools, we aim to empower you in cultivating 
            a consistent and fulfilling prayer routine. Join us as we embark 
            on this meaningful endeavor together, embracing the timeless 
            tradition of prayer in the modern world.
          </h2>
          <br /><br />   
          <button className="join-button"> {/* css is in login.css  */}
            Join Us
          </button>
          <br /><br />
          <h3>Allah Says In Quran</h3>
          <p className="useEffect-text">  {/* css is in login.css  */}
            {text}
          </p>
        </div>
        <div>
          <div className="login-box">  
          <p className="login-box-header">
            Register Here
          </p>
          <input className="login-input" 
                  type="text" required 
                  autoComplete="off"
                  placeholder="Enter Username...."
                  id="userName"
                  onClick={resetMessage}
          />
          <nav className="alert">{userNameMessage}</nav>
          <input className="login-input" 
                  type="email"
                  autoComplete="off"
                  placeholder="Enter Gmail...."
                  id="gmail"
                  onClick={resetMessage}
          /> 
          <nav className="alert">{gmailMessage}</nav>

          <input className="login-input" 
                  type="password"
                  placeholder="Enter Password...."
                  id="password"
                  onClick={resetMessage}
          /> 
          <nav className="alert">{passwordMessage}</nav>

          <input className="login-input" 
                  type="password"
                  placeholder="Confirm Password...."
                  id="confirmPassword"
                  onClick={resetMessage}
          /> 
          <nav className="alert">{confirmPasswordMessage}</nav>
          <br />

          <p className="button-container"> {/* css is in main.css  */}
            <button className="login-button" 
                    onClick={handleCreateUser}
            >Register
            </button>
          </p>
          <p>{successMessage}</p>
          <br /><br /><br />
          <p>
            Already Have An Account ? 
            <u style={{cursor:'pointer',color:"#ff7200"}}
              onClick={() => navigate('/logIn')}
              >_Log In_
            </u>
          </p>
          </div>
        </div>
      </div>
      
    </div>

  )
}

export default RegistrationPage;
