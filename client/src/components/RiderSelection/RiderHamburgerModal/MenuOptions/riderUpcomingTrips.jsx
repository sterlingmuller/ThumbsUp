import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderUpcomingTripDetails } from './riderUpcomingTripDetails.jsx';


export const RiderUpcomingTrips = () => {
  const { currentUser } = useContext(MainContext);
  const[upcomingTrips, setUpcomingTrips] = useState([]);
  const { userId } = currentUser

  const getUpcomingTrips = () => {
    axios.get(`/trips/upcoming?user_id=${userId}`)
      .then(({ data }) => setUpcomingTrips(data));
  }

  useEffect(() => {
    getUpcomingTrips()
  }, [])

  return (
    <div className='siteNavigatorSquare' >
      Upcoming Trips
      <ul>
        {upcomingTrips.map(trip => {return <RiderUpcomingTripDetails key={trip.rider_trip_id} trip={trip}/>})}
      </ul>
    </div>
  );

}