import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderTripDetails } from './riderTripDetails.jsx';


export const RiderUpcomingTrips = () => {
  const { setCurrentPage, currentUser } = useContext(MainContext);
  const[upcommingTrips, setUpcomingTrips] = useState([]);
  const { userId } = currentUser

  const getUpcomingTrips = () => {
    axios.get(`/trips/upcoming?user_id=${userId}`)
      .then(({ data }) => setUpcomingTrips(data));
  }

  useEffect(() => {
    getUpcomingTrips()
  }, [])

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        Upcoming Trips
        <ul>
          {upcommingTrips.map(trip => {return <RiderTripDetails key={trip.id} trip={trip}/>})}
        </ul>
      </div>
    </div>
  );

}