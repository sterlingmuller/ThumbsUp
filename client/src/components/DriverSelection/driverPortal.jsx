import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../contexts/MainContext.js';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { IoMdArrowRoundBack } from "react-icons/io";

export const DriverPortal = () => {
  const { setSelectedTrip, setCurrentPage, currentUser } = useContext(MainContext);
  const navigate = useNavigate();

  const [upcomingRides, setUpcomingRides] = useState([]);

  const getUpcomingRides = () => {
    axios.get(`/drivers?user_id=${currentUser.userId}`)
      .then(({ data }) => {
        setUpcomingRides(data);
      })
  }

  useEffect(() => {
    getUpcomingRides()
  }, [])

  function TripDetailsClick(id) {
    console.log("Ive been clicked!");
    setSelectedTrip(id);
    navigate("/driverTripSelection");
  }

  const RideCompleteClick = (id) => {
    axios.put(`drivers?trip_id=${id}`)
      .then(getUpcomingRides());
  }

  function CancelRideClick(id) {
    axios.delete(`drivers?trip_id=${id}`)
      .then(getUpcomingRides());
  }


  return (
    <div>
          <Card>
            {/* <IoMdArrowRoundBack className="backArrow" onClick={() => {
              navigate('/riderOrDriver');
            }} /> */}
            <Card.Body>
              <Card.Title className="driverPortalCard">
              <IoMdArrowRoundBack className="backArrowCard" onClick={() => {
              navigate('/riderOrDriver');
            }} />
                Upcoming Trips
              </Card.Title>
              <ListGroup>
                {upcomingRides.map((ride) => {
                  return (
                    <ListGroup.Item key={ride.trip_id} onClick={() => TripDetailsClick(ride.trip_id)}>
                          <div>{ride.start_address} - {ride.end_address}</div>
                          <div>{moment(ride.start_time).format('LLLL')}</div>
                        <Button className="btn-primary col-sm" onClick={() => RideCompleteClick(ride.trip_id)}> Ride Complete </Button> {' '}
                        <Button className="btn-secondary-driver col-sm" onClick={() => CancelRideClick(ride.trip_id)}> Cancel Ride </Button>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>

        <Button className="btn-primary col-sm" onClick={() => navigate('/driverAddTrip')}> Add Trip </Button> {' '}
        <Button className="btn-secondary col-sm" onClick={() => navigate('/tripHistory')} > Trip History </Button>

            </Card.Body>
          </Card>
    </div>
  );

}