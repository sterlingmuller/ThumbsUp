import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../contexts/MainContext.js';
import axios from 'axios';
import { TripHistoryDetails } from './tripHistoryDetails.jsx';
import { Card, ListGroup } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export const TripHistory = () => {
  const { currentUser } = useContext(MainContext);
  const[prevTrips, setPrevTrips] = useState([]);
  const { userId, usertype } = currentUser;
  const navigate = useNavigate();

  const getPrevTrips = () => {
    axios.get(`/trips/previous?user_id=${userId}&user_type=${usertype}`)
      .then(({ data }) => setPrevTrips(data));
  }

  useEffect(() => {
    getPrevTrips()
  }, [])

  return (
    <Card>
      <Card.Body>
      <IoMdArrowRoundBack className='backArrow' onClick={() => {
        currentUser.usertype === 'rider' ? navigate('/riderPortal') : navigate('/driverPortal')
      }}/>
        <Card.Title>
          <div className='cardTitle'>Trip History</div>
        </Card.Title>
        <ListGroup>
          {prevTrips.map(trip => {return <TripHistoryDetails key={trip.driver_trip_id} trip={trip}/>})}
        </ListGroup>
      </Card.Body>
    </Card>
  );

}