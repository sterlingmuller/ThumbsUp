import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { TripHistoryDetails } from './tripHistoryDetails.jsx';


export const TripHistory = () => {
  const { currentUser } = useContext(MainContext);
  const[prevTrips, setPrevTrips] = useState([]);
  const { userId, usertype } = currentUser;

  const getPrevTrips = () => {
    axios.get(`/trips/previous?user_id=${userId}&user_type=${usertype}`)
      .then(({ data }) => setPrevTrips(data));
  }

  useEffect(() => {
    getPrevTrips()
  }, [])

  return (
    <div className='siteNavigatorSquare'>
      Trip History
      <ul>
        {prevTrips.map(trip => {return <TripHistoryDetails key={trip.driver_trip_id} trip={trip}/>})}
      </ul>
    </div>
  );

}