import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import DriverTripMap from './driverAddTripMap.jsx'
import { Link } from 'react-router-dom';



export const DriverAddTrip = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  return (
    <div style={{justifyContent:'center'}}>
      <Link to="/driverPortal"><div>Go To Driver Portal</div></Link>
      {/* <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div> */}
      <div className='siteNavigatorSquare' >
        <h2>Find Directions</h2>
        <DriverTripMap />
      </div>
    </div>
  );

}