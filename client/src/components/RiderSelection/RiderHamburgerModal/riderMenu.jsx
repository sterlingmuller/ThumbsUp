import React, { useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { Link } from "react-router-dom";


export const RiderMenu = () => {
  const { currentUser } = useContext(MainContext);

  return (
    <div className='siteNavigatorSquare'>
      <div>{currentUser.username}</div>
      {/* <span>{currentUser.rating}</span> */}
      <Link to='/riderUpcomingTrips'>
        <div>My upcoming trips</div>
      </Link>
      <Link to='/tripHistory'>
        <div>My trip history</div>
      </Link>
    </div>
  );

}