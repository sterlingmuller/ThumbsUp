import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext.js';
import { useNavigate } from "react-router-dom";


export const TripHistoryDetails = ({ trip }) => {
  const { currentUser, setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id} = trip;
  const navigate = useNavigate();

  return (
    <li className='siteNavigatorSquare' onClick={() => {
      if (currentUser.usertype === 'rider') {
        setSelectedTrip(driver_trip_id);
        navigate('/postTrip');
      }
    }}>
    <span>{start_address} -</span>
    <span> {end_address} | </span>
    <span>{start_time}</span>
    </li>
  );

}