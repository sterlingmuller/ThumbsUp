import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js'


export const TripHistoryDetails = ({ trip }) => {
  const { setCurrentPage } = useContext(MainContext);
  const { start_address, end_address, start_time } = trip;

  return (
    <li className='siteNavigatorSquare' onClick={() => setCurrentPage('siteNavigator')}>
      <span>{start_address} -</span>
      <span> {end_address} | </span>
      <span>{start_time}</span>
    </li>
  );

}