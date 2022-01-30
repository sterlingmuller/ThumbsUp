import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderTripDetails } from './riderTripDetails.jsx';


export const RiderUpcomingTrips = () => {
  const { setCurrentPage } = useContext(MainContext);
  const[upcommingTrips, setUpcommingTrips] = useState([]);

  const getUpcommingTrips = () => {
    axios.get('/trips/rider/upcomming')
      .then(({ data }) => setUpcommingTrips(data));
  }

  useEffect(() => {
    getUpcommingTrips()
  }, [])

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        Upcomming Trips
        <ul>
          {upcommingTrips.map(trip => {return <RiderTripDetails trip={trip}/>})}
        </ul>
      </div>
    </div>
  );

}