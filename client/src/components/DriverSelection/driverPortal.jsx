import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../contexts/MainContext.js';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { IoMdArrowRoundBack } from "react-icons/io";

export const DriverPortal = () => {
  const navigate = useNavigate();
  const { setSelectedTrip, currentUser } = useContext(MainContext);
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

  const TripDetailsClick = (id) => {
    setSelectedTrip(id);
    navigate("/driverTripSelection");
  }


  const RideCompleteClick = (id) => {
    axios.put(`drivers?trip_id=${id}`)
      .then(getUpcomingRides());
  }

  const CancelRideClick = (id) => {
    axios.delete(`drivers?trip_id=${id}`)
      .then(getUpcomingRides());
  }


  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="driverPortalCard">
            <IoMdArrowRoundBack className="backArrowCard" onClick={() => {
              navigate('/riderOrDriver');
            }} />
                <h1>Upcoming Trips</h1>
              </Card.Title>
              <ListGroup>
                {upcomingRides.map((ride) => {
                  return (

                    <ListGroup.Item key={ride.trip_id} >
                      <div onClick={() => TripDetailsClick(ride.trip_id)}>
                            {ride.start_address} - {ride.end_address}
                            <br/>
                            {moment(ride.start_time).format('LLLL')}
                      </div>

                       <Button className="btn-primary col-sm" onClick={() => RideCompleteClick(ride.trip_id)}>
                          Ride Complete </Button>
                       <Button className="btn-primary btn-secondary col-sm" onClick={() => CancelRideClick(ride.trip_id)}> Cancel Ride </Button>
                    </ListGroup.Item>

                  )
                })}
              </ListGroup>

          <Button className="btn-primary col-sm" onClick={() => navigate('/driverAddTrip')}> Add Trip </Button>
          <Button className="btn-primary btn-secondary col-sm" onClick={() => navigate('/tripHistory')} > Trip History </Button>

        </Card.Body>
      </Card>
    </div>
  );

}