import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import DriverTripMap from './driverAddTripMap.jsx'
import { Link } from 'react-router-dom';



export const DriverAddTrip = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        This is {currentPage} make it more awesomer!!!
        <DriverTripMap />
      </div>
    </div>
  );

}