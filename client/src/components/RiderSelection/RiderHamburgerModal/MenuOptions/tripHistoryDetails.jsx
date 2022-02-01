import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js'


export const TripHistoryDetails = ({ trip }) => {
  const { setCurrentPage, currentUser, setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id} = trip;

  return (
    <li className='siteNavigatorSquare' onClick={() => {
      setSelectedTrip(driver_trip_id);
      currentUser.usertype === 'rider' ? setCurrentPage('postTrip') : null;
      }}>
      <span>{start_address} -</span>
      <span> {end_address} | </span>
      <span>{start_time}</span>
    </li>
  );

}