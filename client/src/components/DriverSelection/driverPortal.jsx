import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js';
import {DriverContext} from '../../contexts/DriverContext.js';
import axios from 'axios';
import { upcomingTrip } from './upcomingTrip.jsx';



export const DriverPortal = () => {
  const { setCurrentPage, userId } = useContext(MainContext);

 const [upcomingRides, setUpcomingRides] = useState([]);

 const getUpcomingRides = () => {
  axios.get(`/drivers?user_id=1`)
  .then ( ({data}) => {
    setUpcomingRides(data);
    console.log('data:::', data)})
 }

 useEffect (() => {
   getUpcomingRides()
 }, [])

function AddTripClick () {
  setCurrentPage('driverAddTrip');
}

const TripHistoryClick = () => {
  setCurrentPage('driverTripHistory');
}

function TripDetailsClick (id, username) {
  // setSelectedTripD ({id: id, username: username});
  setSelectedTripD ({id, username});
  setCurrentPage('driverTripSelection');
}


  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='driverPortal' >
        <h1>Driver Portal</h1>
        <div className="upcomingTrips">
          <h2>Upcoming Trips</h2>
          <ul>
            {upcomingRides.map((ride) => {
              return (<div onClick={() => TripDetailsClick(ride.id, ride.username)}>Starting location: {ride.start_address}
                Destination: {ride.end_address}
                 Departing at: {ride.start_time} </div>)
            })}
          </ul>
          <input type="button" value="Add Trip" onClick={(e) => AddTripClick(e)}/>
          <input type="button" value="Trip History" onClick={(e) => TripHistoryClick(e)}/>
        </div>
      </div>
    </div>
  );

}