import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DriverPortal = () => {
  const { setSelectedTrip, setCurrentPage, currentUser } = useContext(MainContext);

 const [upcomingRides, setUpcomingRides] = useState([]);

 const getUpcomingRides = () => {
  axios.get(`/drivers?user_id=${currentUser.userId}`)
  // axios.get(`/drivers?user_id=1`)
  .then ( ({data}) => {
    setUpcomingRides(data);
  })
 }

 useEffect (() => {
   getUpcomingRides()
 }, [])

function AddTripClick () {
  setCurrentPage('driverAddTrip');
}

const TripHistoryClick = () => {
  setCurrentPage('tripHistory');
}

function TripDetailsClick (id) {
  setSelectedTrip({id});
  setCurrentPage('driverTripSelection');
}

const RideCompleteClick = (id) => {
  console.log("Ride completed!");
  axios.put(`drivers?trip_id=${id}`)
  .then(getUpcomingRides());
}

function CancelRideClick (id) {
  console.log("Ride canceled!");
  axios.delete(`drivers?trip_id=${id}`)
  .then(getUpcomingRides());
}


  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='driverPortal' >
        <h1>Driver Portal</h1>
        <div className="upcomingTrips">
          <h2>Upcoming Trips</h2>

          <Card style={{alignItems: 'center'}}>
            {upcomingRides.map((ride) => {
              return (<div key={ride.id}>

                <Card style={{alignItems: 'center'}}>
                  <div className="card-body" onClick={() => TripDetailsClick(ride.id)}>
                    <div className="card-title">{ride.start_address} to {ride.end_address}</div>
                    <div className="card-text">Departing at: {ride.start_time}</div>
                  </div>
                  <span type="button" className="btn-primary btn-sm col-sm" onClick={() => RideCompleteClick(ride.id)}> Ride Complete </span>
                <span className="btn-primary btn-sm col-sm" onClick={() => CancelRideClick(ride.id)}> Cancel Ride </span>
                </Card>

                 </div>)
            })}
          </Card>

        </div>
          <Button  className="col-sm" onClick={(e) => AddTripClick(e)}> Add Trip </Button>
          <Button className="col-sm" onClick={(e) => TripHistoryClick(e)}> Trip History </Button>
      </div>
    </div>
  );

}