import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext.js';
import { useNavigate } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';


export const TripHistoryDetails = ({ trip }) => {
  const { currentUser, setSelectedTrip } = useContext(MainContext);
  const { start_address, end_address, start_time, driver_trip_id} = trip;
  const navigate = useNavigate();

  return (
    <ListGroup.Item className='siteNavigatorSquare' action onClick={() => {
      if (currentUser.usertype === 'rider') {
        setSelectedTrip(driver_trip_id);
        navigate('/postTrip');
      }
    }}>
      <span>{start_address} - {end_address} | {moment(start_time).format('LLLL')}</span>
    </ListGroup.Item>
  );

}