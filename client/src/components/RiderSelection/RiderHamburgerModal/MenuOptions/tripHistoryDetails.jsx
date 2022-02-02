import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import { Link } from "react-router-dom";


export const TripHistoryDetails = ({ trip }) => {
  const { currentUser, setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id} = trip;

  return (
    <div>
    {currentUser.usertype === 'rider'
    ? <Link to='/postTrip'>
        <li className='siteNavigatorSquare' onClick={() => setSelectedTrip(driver_trip_id)}>
          <span>{start_address} -</span>
          <span> {end_address} | </span>
          <span>{start_time}</span>
        </li>
      </Link>
    : <li className='siteNavigatorSquare'>
        <span>{start_address} -</span>
        <span> {end_address} | </span>
        <span>{start_time}</span>
      </li>
    }
    </div>
  );

}