import React, { useState, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import "./Ride.css";
import { Button, Form, ListGroup } from 'react-bootstrap';

export const RiderSearch = () => {
  const { setSelectedTrip } = useContext(MainContext);
  const [riderSearchDetails, setRiderSearchDetails] = useState({
    startingLocation: "",
    destination: "",
    time: ""
  });
  const [allMatchingTrips, setAllMatchingTrips] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    searchUpcomingTrips();
  }

  const handleChange = (e) => {
    const selected = e.target.name;
    setRiderSearchDetails({ ...riderSearchDetails, [selected]: e.target.value })
  }

  const searchUpcomingTrips = () => {
    axios.get(`/searchTrip`, { params: riderSearchDetails })
      .then(({ data }) => {
        setAllMatchingTrips(data);
      })
  }

  return (
    <div className="rider-search-container">
      <h1>New Ride</h1>
      <Form>
        <Form.Group size="lg">
          <div className="form-input">
            <Form.Label>
              Starting Location
              <Form.Control
                name="startingLocation"
                type="text"
                onChange={handleChange} />
            </Form.Label>
          </div>

          <div className="form-input">
            <Form.Label>
              Destination
              <Form.Control
                name="destination"
                type="text"
                onChange={handleChange} />
            </Form.Label>
          </div>

          <div className="form-input">
            <Form.Label>
              Time
              <Form.Control
                name="time"
                type="text"
                onChange={handleChange} />
            </Form.Label>
          </div>
        </Form.Group>
      </Form>

      <Button varient="primary" className="new-ride-button" onClick={handleClick}>Submit</Button>

      <div>
        <h2>Available Rides</h2>
        <ListGroup>
          {
            Object.keys(allMatchingTrips).length !== 0 ?
              allMatchingTrips.map((trip) => {
                return (
                  <ListGroup.Item
                    className="card-body" onClick={() => {
                      setSelectedTrip(trip.id);
                      navigate('/saveMeASeat');
                    }} key={trip.id}>

                    <div>{trip.start_address} - {trip.end_address}</div>
                    <div>{moment(trip.start_time).format('LLLL')}</div>
                  </ListGroup.Item>
                )
              })
              : "Search For a Ride!"
          }
        </ListGroup>
      </div>
    </div>
  );
}