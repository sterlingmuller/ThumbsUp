import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import axios from 'axios';
import { RiderUpcomingTripDetails } from './riderUpcomingTripDetails.jsx';
import { Card, ListGroup } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export const RiderUpcomingTrips = () => {
  const { currentUser } = useContext(MainContext);
  const[upcomingTrips, setUpcomingTrips] = useState([]);
  const { userId } = currentUser
  const navigate = useNavigate();

  const getUpcomingTrips = () => {
    axios.get(`/trips/upcoming?user_id=${userId}`)
      .then(({ data }) => setUpcomingTrips(data));
  }

  useEffect(() => {
    getUpcomingTrips()
  }, [])

  return (
    <Card>
      <Card.Body>
      <IoMdArrowRoundBack className='backArrow' onClick={() => navigate('/riderPortal')}/>
        <Card.Title>
          <div className='cardTitle'>Upcoming Trips</div>
        </Card.Title>
        <ListGroup>
          {upcomingTrips.map(trip => {return <RiderUpcomingTripDetails key={trip.rider_trip_id} trip={trip}/>})}
        </ListGroup>
      </Card.Body>
    </Card>
  );

}