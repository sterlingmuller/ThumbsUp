import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js'



export const RiderTripDetails = ({ trip }) => {
  const { setCurrentPage } = useContext(MainContext);
  const { start_address, end_address, start_time } = trip;

  return (
    <li className='siteNavigatorSquare' onClick={() => setCurrentPage('driverTripSelection')}>
      <span>{start_address} -</span>
      <span> {end_address} | </span>
      <span>{start_time}</span>
    </li>
  );

}