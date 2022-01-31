import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { TripHistoryDetails } from './tripHistoryDetails.jsx';


export const TripHistory = () => {
  const { setCurrentPage, currentUser } = useContext(MainContext);
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
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        Trip History
        <ul>
          {prevTrips.map(trip => {return <TripHistoryDetails key={trip.id} trip={trip}/>})}
        </ul>
      </div>
    </div>
  );

}