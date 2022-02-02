import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import { Link } from "react-router-dom";


export const RiderUpcomingTripDetails = ({ trip }) => {
  const { setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id } = trip;

  return (
    <Link to='/driverTripSelection'>
      <li className='siteNavigatorSquare' onClick={() => {
        setSelectedTrip(driver_trip_id);
        // setCurrentPage('driverTripSelection');
      }}>
        <span>{start_address} -</span>
        <span> {end_address} | </span>
        <span>{start_time}</span>
      </li>
    </Link>
  );

}