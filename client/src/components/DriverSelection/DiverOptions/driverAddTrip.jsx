import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import DriverTripMap from './driverAddTripMap.jsx'
import { Link } from 'react-router-dom';



export const DriverAddTrip = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  return (
    <div>
      <Link to="/driverPortal"><div>Go To Driver Portal</div></Link>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        This is {currentPage} make it more awesomer!!!
        <DriverTripMap />
      </div>
    </div>
  );

}