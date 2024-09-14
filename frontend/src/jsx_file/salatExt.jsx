import React, { useState, useEffect } from 'react';
import salatService from '../services/salatService';
import Statistic from './statistic';

import crossLogo from '/images/cross50.jpg'

const SalatExt = ({onCut}) => {
  const userName = localStorage.getItem("userName") || "Guest";

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [allSalat, setAllSalat] = useState([]);

  const [mainCount,setMainCount]=useState({
    fajar:{jamat:0,prayed:0,sunnah:0},
    johor:{jamat:0,prayed:0,sunnah:0},
    asor:{jamat:0,prayed:0,sunnah:0},
    magrib:{jamat:0,prayed:0,sunnah:0},
    esha:{jamat:0,prayed:0,sunnah:0}
  });

  const handleMonthChange = (e) => setMonth(parseInt(e.target.value, 10));
  const handleYearChange = (e) => setYear(parseInt(e.target.value, 10));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getFormattedDate = () => {
    if (month && year) {
      return `${year}-${monthNames[month - 1]}`;
    }
    return '';
  };

  useEffect(() => {
    const fetchGetSalat = async () => {
      try {
        const result = await salatService.getSalat({ userName });
        const temp = result.data.data.allSalat;

        const sortedSalat = temp.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAllSalat(sortedSalat);
      } catch (error) {
        console.error("Error fetching Salats: ", error);
      }
    };
    fetchGetSalat();
  }, [month, year]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return { month, year };
  };

  const compareTime = (date) => {
    return !(month !== date.month || year !== date.year);
  };

  const makeGroupBarChart = (filteredSalat) =>{
    const countSalat = {
      fajar:{jamat:0,prayed:0,sunnah:0},
      johor:{jamat:0,prayed:0,sunnah:0},
      asor:{jamat:0,prayed:0,sunnah:0},
      magrib:{jamat:0,prayed:0,sunnah:0},
      esha:{jamat:0,prayed:0,sunnah:0}      
    }
    filteredSalat.map((salat,idx) => {
      if(salat.salat.fajar.jamat === "YES")countSalat.fajar.jamat+=1;
      if(salat.salat.fajar.prayed === "YES")countSalat.fajar.prayed+=1;
      if(salat.salat.fajar.sunnah === "YES")countSalat.fajar.sunnah+=1;

      if(salat.salat.johor.jamat === "YES")countSalat.johor.jamat+=1;
      if(salat.salat.johor.prayed === "YES")countSalat.johor.prayed+=1;
      if(salat.salat.johor.sunnah === "YES")countSalat.johor.sunnah+=1;

      if(salat.salat.asor.jamat === "YES")countSalat.asor.jamat+=1;
      if(salat.salat.asor.prayed === "YES")countSalat.asor.prayed+=1;
      if(salat.salat.asor.sunnah === "YES")countSalat.asor.sunnah+=1;

      if(salat.salat.magrib.jamat === "YES")countSalat.magrib.jamat+=1;
      if(salat.salat.magrib.prayed === "YES")countSalat.magrib.prayed+=1;
      if(salat.salat.magrib.sunnah === "YES")countSalat.magrib.sunnah+=1;

      if(salat.salat.esha.jamat === "YES")countSalat.esha.jamat+=1;
      if(salat.salat.esha.prayed === "YES")countSalat.esha.prayed+=1;
      if(salat.salat.esha.sunnah === "YES")countSalat.esha.sunnah+=1;
    })
    setMainCount(countSalat);
  }

  const handleSubmit = () => {
    const filteredSalat = allSalat.filter((salat) => {
      const date = formatDate(salat.date);
      return compareTime(date);
    });
    makeGroupBarChart(filteredSalat);
  };

  const handleCross = () => {
    onCut();
  }


  return (<>
    
    <div className="main-bar-container">
      <div className="cross">
        <img className="image" src={crossLogo} 
            onClick={() => handleCross()}
        />
      </div>
      
      <div className="month-year-picker">
        <div>Select Month of a Year</div>
        <select className="month-select" 
                value={month} 
                onChange={handleMonthChange}
        >
          <option value="">Month</option>
          {monthNames.map((monthName, index) => (
            <option key={index} value={index + 1}>
              {monthName}
            </option>
          ))} 
        </select>
        
        <input
          type="number"
          className="year-input"
          value={year}
          onChange={handleYearChange}
          placeholder="Year"
          min="1900"
          max="2100"
        />

        <div className="selected-date">Selected Date: {getFormattedDate()}</div>

        <button onClick={handleSubmit} className='submit-date-button'>
          Submit
        </button>

        <Statistic className="bar-graph" data={mainCount}/>
        
      </div>
    </div>
  </>);
};

export default SalatExt;
