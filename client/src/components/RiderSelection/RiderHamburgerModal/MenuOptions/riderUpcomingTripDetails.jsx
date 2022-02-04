import React, { useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext.js';
import { useNavigate } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';


export const RiderUpcomingTripDetails = ({ trip }) => {
  const { setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id } = trip;
  const navigate = useNavigate();

  return (
    <ListGroup.Item action onClick={() => {
      setSelectedTrip(driver_trip_id);
      navigate('/driverTripSelection');
    }}>
      <div>{start_address} - {end_address}</div>
      <div>{moment(start_time).format('LLLL')}</div>
    </ListGroup.Item>
  );

}