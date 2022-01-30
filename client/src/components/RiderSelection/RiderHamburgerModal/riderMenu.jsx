import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';


export const RiderMenu = () => {
  const { setCurrentPage } = useContext(MainContext);

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        <span>User Name</span>
        <span>StarRating</span>
      </div>
      <div onClick={() => setCurrentPage('riderUpcomingTrips')}>My upcoming trips</div>
      <div onClick={() => setCurrentPage('riderTripHistory')}>My trip history</div>
    </div>
  );

}