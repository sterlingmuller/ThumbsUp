import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderTripDetails } from './riderTripDetails.jsx';


export const RiderUpcomingTrips = () => {
  const { setCurrentPage } = useContext(MainContext);
  const[prevTrips, setPrevTrips] = useState([]);

  const getPrevTrips = () => {
    axios.get('/trips/rider/previous')
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
          {prevTrips.map(trip => {return <RiderTripDetails trip={trip}/>})}
        </ul>
      </div>
    </div>
  );

}