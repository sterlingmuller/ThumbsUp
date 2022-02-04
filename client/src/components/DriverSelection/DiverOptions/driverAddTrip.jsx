import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import DriverTripMap from './driverAddTripMap.jsx'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


export const DriverAddTrip = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div style={{justifyContent:'center'}}>
      <IoMdArrowRoundBack className="backArrow" onClick={()=>navigate("/driverPortal")}/>
      {/* <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div> */}
      <div className='siteNavigatorSquare' >
        <h1 className='d-flex justify-content-center'>Find Directions</h1>
        <DriverTripMap />
      </div>
    </div>
  );

}