import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../contexts/MainContext.js';
import axios from 'axios';
import { TripHistoryDetails } from './tripHistoryDetails.jsx';
import { Card, ListGroup } from 'react-bootstrap';


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
    <Card>
      <Card.Title>Trip History</Card.Title>
      <ListGroup>
        {prevTrips.map(trip => {return <TripHistoryDetails key={trip.driver_trip_id} trip={trip}/>})}
      </ListGroup>
    </Card>
  );

}