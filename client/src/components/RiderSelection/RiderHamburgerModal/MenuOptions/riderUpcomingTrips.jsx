import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderUpcomingTripDetails } from './riderUpcomingTripDetails.jsx';
import { Card, ListGroup } from 'react-bootstrap';


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
    <Card>
      <Card.Title>Upcoming Trips</Card.Title>
      <ListGroup>
        {upcomingTrips.map(trip => {return <RiderUpcomingTripDetails key={trip.rider_trip_id} trip={trip}/>})}
      </ListGroup>
    </Card>
  );

}