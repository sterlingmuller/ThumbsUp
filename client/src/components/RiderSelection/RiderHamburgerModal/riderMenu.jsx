import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';


export const RiderMenu = () => {
  const { setCurrentPage, currentUser } = useContext(MainContext);

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        <span>{currentUser.username}</span>
        <span>{currentUser.rating}</span>
      </div>
      <div onClick={() => setCurrentPage('riderUpcomingTrips')}>My upcoming trips</div>
      <div onClick={() => setCurrentPage('tripHistory')}>My trip history</div>
    </div>
  );

}