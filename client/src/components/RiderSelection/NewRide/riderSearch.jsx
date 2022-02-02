import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js';
import { Link } from 'react-router-dom';



export const RiderSearch = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);
  const [riderSearchDetails, setRiderSearchDetails] = useState({
    startingLocation: "",
    destination: "",
    time: ""
  });
  

  const handleClick = () => {
      console.log("clicked");
  }

  const handleChange = (e) => {
    const selected = e.target.name;
    setRiderSearchDetails({...riderSearchDetails, [selected]:e.target.value})
  }

  const handleAvailableRideClick = () => {
    setCurrentPage('saveMeASeat');
  }

  return (

    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        <h2>New Ride</h2>
        <form>
          <label>
            Starting Location
            <input
              name="startingLocation"
              type="text"
              onChange={handleChange} />
          </label>
          <br />
          <label>
            Destination
            <input
              name="destination"
              type="text"
              onChange={handleChange} />
          </label>
          <br />
          <label>
            Time
            <input
              name="time"
              type="text"
              onChange={handleChange} />
          </label>
        </form>
        <Link to=''>
        <button onClick={handleClick}>Submit</button>
        </Link>
        
      </div>
      <div>
        <h2>Available Rides</h2>
        {/* map through matching queries  onClick={handleAvailableRideClick}*/}
        <button>Ride 1</button>
        <button>Ride 2</button>
      </div>
    </div>
  );

}