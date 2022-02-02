import React, { useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { useNavigate } from "react-router-dom";


export const RiderMenu = () => {
  const { currentUser } = useContext(MainContext);
  const navigate = useNavigate();
  return (
    <div className='siteNavigatorSquare'>
      <div>{currentUser.username}</div>
      {/* <span>{currentUser.rating}</span> */}
      <div onClick={() => navigate('/riderUpcomingTrips')}>My upcoming trips</div>
      <div onClick={() => navigate('/tripHistory')}>My trip history</div>
    </div>
  );

}