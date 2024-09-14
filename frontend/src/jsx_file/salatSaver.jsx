import React, { useEffect, useState } from 'react';

import salatService from '../services/salatService';
import MenuBar from './menuBar';
import SalatExt from './salatExt';

function SalatSaver() {


  const userName = localStorage.getItem("userName")  || "Guest";

  const property = ["P","J","S"]

  const [selectedRow, setSelectedRow] = useState(null);

  const [fajarShow,setFajarShow] = useState(false);
  const [johorShow,setJohorShow] = useState(false);
  const [asorShow,setAsorShow] = useState(false);
  const [magribShow,setMagribShow] = useState(false);
  const [eshaShow,setEshaShow] = useState(false);
  const [render,setRender] = useState(false);

  const [allSalat,setAllSalat] = useState([]);

  const [alert,setAlert] = useState("");
  const [message,setMessage] = useState("");

  const [barShow,setBarShow] = useState(false);  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    const fetchGetSalat = async() => {
      try {
        const result = await salatService.getSalat({userName});
        const temp = result.data.data.allSalat;
        
        const sortedSalat = temp.sort((a, b) => new Date(b.date) - new Date(a.date)); 
        
        setAllSalat(sortedSalat);
      }
      catch (error) {
        console.error("Error fetching Salats: ", error)
      }
    }
    fetchGetSalat();
  },[]);

  const resetSalat = () =>{
    document.querySelector('input[type="date"]').value = null;
    
    setFajarShow(false);
    setJohorShow(false);
    setAsorShow(false);
    setMagribShow(false);
    setEshaShow(false);

    document.querySelector('#fajar-main').checked = false;
    document.querySelector('#johor-main').checked = false;
    document.querySelector('#asor-main').checked = false;
    document.querySelector('#magrib-main').checked = false;
    document.querySelector('#esha-main').checked = false;
    

    setSelectedRow(null);
    setAlert("");

    setTimeout(() => {
      setMessage("");
    }, 2000);
    
  }

  

  const updateDB = async(updatedAllSalat) => {
    const userData = {
      userName: userName,
      allSalat: updatedAllSalat
    }
    try {
      await salatService.updateSalat(userData);
    } 
    catch (error) {
      console.log(error.message);
    }
  } 


  const handleSave = async () => {
    const gotDate = document.querySelector('input[type="date"]').value;
    const foundDate = allSalat.find(daySalat => formatDate(daySalat.date) === gotDate);
    if(!foundDate){
      const salatData = {
        date: gotDate,
        salat: {
          fajar: {
            prayed: fajarShow ? "YES" : "NO",
            jamat: fajarShow && document.querySelector('#fajar-jamat').checked ? "YES" : "NO",
            sunnah: fajarShow && document.querySelector('#fajar-sunnah').checked ? "YES" : "NO",
          },
          johor: {
            prayed: johorShow ? "YES" : "NO",
            jamat: johorShow && document.querySelector('#johor-jamat').checked ? "YES" : "NO",
            sunnah: johorShow && document.querySelector('#johor-sunnah').checked ? "YES" : "NO",
          },
          asor: {
            prayed: asorShow ? "YES" : "NO",
            jamat: asorShow && document.querySelector('#asor-jamat').checked ? "YES" : "NO",
            sunnah: asorShow && document.querySelector('#asor-sunnah').checked ? "YES" : "NO",
          },
          magrib: {
            prayed: magribShow ? "YES" : "NO",
            jamat: magribShow && document.querySelector('#magrib-jamat').checked ? "YES" : "NO",
            sunnah: magribShow && document.querySelector('#magrib-sunnah').checked ? "YES" : "NO",
          },
          esha: {
            prayed: eshaShow ? "YES" : "NO",
            jamat: eshaShow && document.querySelector('#esha-jamat').checked ? "YES" : "NO",
            sunnah: eshaShow && document.querySelector('#esha-sunnah').checked ? "YES" : "NO",
          }
        }
      };
      const updatedAllSalat = ([...allSalat, salatData]).sort((a, b) => new Date(b.date) - new Date(a.date));
      updateDB(updatedAllSalat);
      setAllSalat(updatedAllSalat);
      setMessage("Salat Data Added Successfully.");
    }
    else{
      const salatData = {
        date: gotDate,
        salat: {
          fajar: {
            prayed: fajarShow ? "YES" : "NO",
            jamat: fajarShow && document.querySelector('#fajar-jamat').checked ? "YES" : "NO",
            sunnah: fajarShow && document.querySelector('#fajar-sunnah').checked ? "YES" : "NO",
          },
          johor: {
            prayed: johorShow ? "YES" : "NO",
            jamat: johorShow && document.querySelector('#johor-jamat').checked ? "YES" : "NO",
            sunnah: johorShow && document.querySelector('#johor-sunnah').checked ? "YES" : "NO",
          },
          asor: {
            prayed: asorShow ? "YES" : "NO",
            jamat: asorShow && document.querySelector('#asor-jamat').checked ? "YES" : "NO",
            sunnah: asorShow && document.querySelector('#asor-sunnah').checked ? "YES" : "NO",
          },
          magrib: {
            prayed: magribShow ? "YES" : "NO",
            jamat: magribShow && document.querySelector('#magrib-jamat').checked ? "YES" : "NO",
            sunnah: magribShow && document.querySelector('#magrib-sunnah').checked ? "YES" : "NO",
          },
          esha: {
            prayed: eshaShow ? "YES" : "NO",
            jamat: eshaShow && document.querySelector('#esha-jamat').checked ? "YES" : "NO",
            sunnah: eshaShow && document.querySelector('#esha-sunnah').checked ? "YES" : "NO",
          }
        }
      };
      const updatedAllSalat = ([...allSalat]);
      updatedAllSalat[selectedRow] = salatData;
      setAllSalat(updatedAllSalat);
      updateDB(updatedAllSalat);
      setMessage("Salat Data Edited Successfully.");
    }   
    resetSalat();
  };


  const handleCheckDateToSave = () => {
    const gotDate = document.querySelector('input[type="date"]').value;
    if(gotDate !== ""){
      handleSave();
    }
    else{
      setAlert("Please Input Date.")
    }
  }


  useEffect(() => {
    const showInForm = (daySalat) => {
  
      if(daySalat !== undefined){
        document.querySelector('input[type="date"]').value = formatDate(daySalat.date);
        
        // Fajar Salah
        document.querySelector('#fajar-main').checked = daySalat.salat.fajar.prayed === "YES";
        setFajarShow(document.querySelector('#fajar-main').checked);
        if (document.querySelector('#fajar-main').checked && fajarShow) {
          document.querySelector('#fajar-jamat').checked = daySalat.salat.fajar.jamat === "YES";
          document.querySelector('#fajar-sunnah').checked = daySalat.salat.fajar.sunnah === "YES";
        }setRender(!fajarShow);
    
        // Johor Salah
        document.querySelector('#johor-main').checked = daySalat.salat.johor.prayed === "YES";
        setJohorShow(document.querySelector('#johor-main').checked);
        if (document.querySelector('#johor-main').checked && johorShow) {
          document.querySelector('#johor-jamat').checked = daySalat.salat.johor.jamat === "YES";
          document.querySelector('#johor-sunnah').checked = daySalat.salat.johor.sunnah === "YES";
        }setRender(!johorShow);
    
        // Asor Salah
        document.querySelector('#asor-main').checked = daySalat.salat.asor.prayed === "YES";
        setAsorShow(document.querySelector('#asor-main').checked);
        if (document.querySelector('#asor-main').checked && asorShow) {
          document.querySelector('#asor-jamat').checked = daySalat.salat.asor.jamat === "YES";
          document.querySelector('#asor-sunnah').checked = daySalat.salat.asor.sunnah === "YES";
        }setRender(!asorShow);
    
        // Magrib Salah
        document.querySelector('#magrib-main').checked = daySalat.salat.magrib.prayed === "YES";
        setMagribShow(document.querySelector('#magrib-main').checked);
        if (document.querySelector('#magrib-main').checked && magribShow) {
          document.querySelector('#magrib-jamat').checked = daySalat.salat.magrib.jamat === "YES";
          document.querySelector('#magrib-sunnah').checked = daySalat.salat.magrib.sunnah === "YES";
        }setRender(!magribShow);
    
        // Esha Salah
        document.querySelector('#esha-main').checked = daySalat.salat.esha.prayed === "YES";
        setEshaShow(document.querySelector('#esha-main').checked);
        if (document.querySelector('#esha-main').checked && eshaShow) {
          document.querySelector('#esha-jamat').checked = daySalat.salat.esha.jamat === "YES";
          document.querySelector('#esha-sunnah').checked = daySalat.salat.esha.sunnah === "YES";
        }setRender(!eshaShow);
      }
    }
    
    if(selectedRow !== null) {
      showInForm(allSalat[selectedRow]);
    }

  }, [selectedRow, allSalat,render]);

  const handleRowClick = (_,index) => {
    
    setSelectedRow(index);
    setRender(false);
    setAlert("Data Of This Date Exist. Edit ?")
  }

  const  handleDateChange = (event) => {
    const date = event.target.value;
    let k=0;
    allSalat.map((dailySalat, index) => {
      if (formatDate(dailySalat.date) === date) {
        setSelectedRow(index);
        k=1;
        setAlert("Data Of This Date Exist. Edit ?");
      }
    });
    if(!k)setAlert("");
  }
  
  const handleDelete = (_,idx) => {
    if(window.confirm("Are you sure to delete this salat ?")){
      const confirmation = window.confirm("Are you sure you want to delete this salat ?");
      if (confirmation){
        const updatedAllSalat = allSalat.filter((_,i) =>  i !== idx);
        setAllSalat(updatedAllSalat);
        updateDB(updatedAllSalat);
        setSelectedRow(null);
      }
    }
  }


  return (<>
    <MenuBar/>
    <div className="mainDiv">
      <h1>Save Your Salat</h1>
      <button onClick={() => setBarShow(!barShow)}
              className="bar-show-button"
      >Show Monthly Statistics
      </button>
    </div>
    
    {barShow && <SalatExt onCut={() => setBarShow(!barShow)}/>}
    <div className="two-div-displayer">
      <div className='form-salat-div'>
            <div className="form-container">
              <span>Pick A Date : </span>
              <input type="date" className="date-input"
                    onClick={() => resetSalat()}
                    onChange={(event) => handleDateChange(event)}
              /><br/>
              <nav className="alert-show">{alert}</nav>
              
              <h4>Select The Oakto You Prayed : </h4>

              <table className="form-table">
                <tbody>
                  <tr>
                    <td>
                      <input type="checkBox"
                        id="fajar-main" 
                        className="main-check-box"
                        onChange={() => setFajarShow(!fajarShow)}
                      />
                      <span className="salat-span">Fajar Salat</span>
                    </td>
                    {fajarShow &&
                      <><td>
                        <input type="checkBox" className="additional-check-box" id="fajar-jamat" />
                        With Jamat
                      </td><td>
                        <input type="checkBox" className="additional-check-box" id="fajar-sunnah" />
                        Prayed Sunnah
                      </td></>
                    }
                  </tr>
                  <tr>
                    <td>
                      <input type="checkBox"
                        className="main-check-box"
                        id="johor-main"
                        onChange={() => setJohorShow(!johorShow)}
                      />
                      <span className="salat-span">Johor Salat</span>
                    </td>
                    {johorShow &&
                      <><td>
                        <input type="checkBox" className="additional-check-box" id="johor-jamat" />
                        With Jamat 
                      </td><td> 
                        <input type="checkBox" className="additional-check-box" id="johor-sunnah" />
                        Prayed Sunnah
                      </td></>
                    }
                  </tr>
                  <tr>
                    <td>
                      <input type="checkBox"
                        className="main-check-box"
                        id="asor-main"
                        onChange={() => setAsorShow(!asorShow)}
                      />
                      <span className="salat-span">Asor Salat</span>
                    </td>
                    {asorShow &&
                      <><td>
                        <input type="checkBox" className="additional-check-box" id="asor-jamat" />
                        With Jamat
                      </td><td>  
                        <input type="checkBox" className="additional-check-box" id="asor-sunnah" />
                        Prayed Sunnah
                      </td></>
                    }
                  </tr>
                  <tr>
                    <td>
                      <input type="checkBox"
                        className="main-check-box"
                        id="magrib-main"
                        onChange={() => setMagribShow(!magribShow)}
                      />
                      <span className="salat-span">Magrib Salat</span>
                    </td>
                    {magribShow &&
                      <><td>
                        <input type="checkBox" className="additional-check-box" id="magrib-jamat" />
                        With Jamat
                      </td><td>  
                        <input type="checkBox" className="additional-check-box" id="magrib-sunnah" />
                        Prayed Sunnah
                      </td></>
                    }
                  </tr>
                  <tr>
                    <td>
                      <input type="checkBox"
                        className="main-check-box"
                        id="esha-main"
                        onChange={() => setEshaShow(!eshaShow)}
                      />
                      <span className="salat-span">Esha Salat</span>
                    </td>
                    {eshaShow &&
                      <><td>
                        <input type="checkBox" className="additional-check-box" id="esha-jamat" />
                        With Jamat
                      </td><td> 
                        <input type="checkBox" className="additional-check-box" id="esha-sunnah" />
                        Prayed Sunnah
                      </td></>
                    }
                  </tr>
                </tbody>
              </table>

              <button className="salat-saving-button" onClick={handleCheckDateToSave}>
                Save
              </button>
              <p className="message-para">{message}</p>
            </div>
      </div>

      <div className="full-name-div-container">
            <div className="full-name-div">
              <h2 style={{color:"white",background:"black",padding:"10px"}}>
                Important Notice !!!
              </h2>
              <p>Y = YES</p>
              <p>N = NO</p>
              <br />
              <p>P = Is the Salat prayed or not?</p>
              <p>J = Is Salat prayed with jamat or not?</p>
              <p>S = Is Sunnah Salat is prayed or not?</p>
            </div>
      </div>
    </div>
    

    

    <div className="salat-table-container">
      <table className="salat-table">
        <thead>
          <tr style={{fontSize:"20px"}}>
            <th colSpan="17">
              <p>You Can Edit Your Salat Data By Clicking Any Row</p> 
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th rowSpan={2}>Date<br/>YY-MM-DD</th>
            <th rowSpan={2}>Delete</th>
            <th colSpan={3}>Fajar</th>
            <th colSpan={3}>Johor</th>
            <th colSpan={3}>Asor</th>
            <th colSpan={3}>Magrib</th>
            <th colSpan={3}>Esha</th>
            
          </tr>
          <tr>
            <th>{property[0]}</th><th>{property[1]}</th><th>{property[2]}</th>
            <th>{property[0]}</th><th>{property[1]}</th><th>{property[2]}</th>
            <th>{property[0]}</th><th>{property[1]}</th><th>{property[2]}</th>
            <th>{property[0]}</th><th>{property[1]}</th><th>{property[2]}</th>
            <th>{property[0]}</th><th>{property[1]}</th><th>{property[2]}</th> 
          </tr>
        </thead>
        
        <tbody>
          {allSalat.map((data, index) => (
            <tr key={index}
              style={{
                backgroundColor: selectedRow === index ? "darkblue" : "green"
              }}

              onClick={() => handleRowClick(data,index)}
            >
              <td>{formatDate(data.date)}</td>
              <td>
                <button className="delete-button"
                  onClick={(e) => handleDelete(e,index)} 
                >
                  Delete
                </button>
              </td>
              <td>{data.salat.fajar.prayed[0]}</td>
              <td>{data.salat.fajar.jamat[0]}</td>
              <td>{data.salat.fajar.sunnah[0]}</td>
              <td>{data.salat.johor.prayed[0]}</td>
              <td>{data.salat.johor.jamat[0]}</td>
              <td>{data.salat.johor.sunnah[0]}</td>
              <td>{data.salat.asor.prayed[0]}</td>
              <td>{data.salat.asor.jamat[0]}</td>
              <td>{data.salat.asor.sunnah[0]}</td>
              <td>{data.salat.magrib.prayed[0]}</td>
              <td>{data.salat.magrib.jamat[0]}</td>
              <td>{data.salat.magrib.sunnah[0]}</td>
              <td>{data.salat.esha.prayed[0]}</td>
              <td>{data.salat.esha.jamat[0]}</td>
              <td>{data.salat.esha.sunnah[0]}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    
  </>);
}

export default SalatSaver;

