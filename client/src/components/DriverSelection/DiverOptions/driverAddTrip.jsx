import React from 'react';
import DriverTripMap from './driverAddTripMap.jsx'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

export const DriverAddTrip = () => {
  const navigate = useNavigate();

  return (
    <div style={{justifyContent:'center'}}>
      <IoMdArrowRoundBack className="backArrow" onClick={()=>navigate("/driverPortal")}/>
      <div className='siteNavigatorSquare' >
        <h1 className='d-flex justify-content-center'>Find Directions</h1>
        <DriverTripMap />
      </div>
    </div>
  );
}