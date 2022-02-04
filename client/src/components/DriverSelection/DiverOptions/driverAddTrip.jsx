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
      <IoMdArrowRoundBack onClick={()=>navigate("/driverPortal")} size={30}/>
      {/* <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div> */}
      <div className='siteNavigatorSquare' >
        <h5 className='d-flex justify-content-center'>Find Directions</h5>
        <DriverTripMap />
      </div>
    </div>
  );

}