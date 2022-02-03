import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import {FaExclamationCircle} from 'react-icons/fa'
import moment from 'moment';

export const DriverPortal = () => {
  const { setSelectedTrip, setCurrentPage, currentUser } = useContext(MainContext);
  const navigate = useNavigate();

 const [upcomingRides, setUpcomingRides] = useState([]);

 const getUpcomingRides = () => {
  axios.get(`/drivers?user_id=${currentUser.userId}`)
  .then ( ({data}) => {
    setUpcomingRides(data);
  })
 }

 useEffect (() => {
   getUpcomingRides()
 }, [])

function TripDetailsClick (id) {
  console.log("Ive been clicked!");
  setSelectedTrip(id);
  navigate("/driverTripSelection");

  // axios.put(`drivers/newMessage?trip_id=${id}`)
  // .then(setSelectedTrip(id));
}

const RideCompleteClick = (id) => {
  axios.put(`drivers?trip_id=${id}`)
  .then(getUpcomingRides());
}

function CancelRideClick (id) {
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
              return (

              <div key={ride.trip_id}>
                <Card style={{alignItems: 'center'}}>

                  {/* <img className="card-img-top" src={'New.png'} alt="No new messages"></img> */}
                  {/* <Link to="/driverTripSelection"> */}
                  <div className="card-body" onClick={() => TripDetailsClick(ride.trip_id)}>
                    <div className="card-title">{ride.start_address} to {ride.end_address}</div>
                    <div className="card-text">Departing at: {moment(ride.start_time).format('LLLL')}</div>
                   {/* {ride.unreadMessage &&
                    <FaExclamationCircle/>
                   } */}
                   <FaExclamationCircle/>
                  </div>
                  {/* </Link> */}
                  <span type="button" className="btn-primary btn-sm col-sm" onClick={() => RideCompleteClick(ride.trip_id)}> Ride Complete </span>
                <span className="btn-primary btn-sm col-sm" onClick={() => CancelRideClick(ride.trip_id)}> Cancel Ride </span>
                </Card>
              </div>

              )})}
          </Card>

        </div>
          <Link to="/driverAddTrip">
            <Button  className="col-sm" > Add Trip </Button>
          </Link>
          <Link to="/tripHistory">
            <Button className="col-sm" > Trip History </Button>
          </Link>
      </div>
    </div>
  );

}