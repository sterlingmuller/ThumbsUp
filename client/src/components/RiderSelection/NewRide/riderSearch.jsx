import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import "./Ride.css";
import {Button, Card, Form} from 'react-bootstrap';



export const RiderSearch = () => {
  const { currentPage, setCurrentPage, slectedTrip, setSelectedTrip } = useContext(MainContext);
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
        console.log('data:::', data)
      })
  }

  return (

    <div className="rider-search-container">
    
        <h2>New Ride</h2>
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
        {
          Object.keys(allMatchingTrips).length !== 0 ?

            allMatchingTrips.map((trip) => {
              return (
                <Card>
                

                    <Card.Body className="card-body" onClick={() => {
                      setSelectedTrip(trip.id);
                      navigate('/saveMeASeat');
                      console.log("New selected trip id: ", trip.id);
                    }} key={trip.id}>{`From ${trip.start_address}\n 
                                        To ${trip.end_address}\n 
                                        At ${moment(trip.start_time).format("LLLL")}`}
                    </Card.Body>

                
                </Card>
              )
            })



            : "Search For a Ride!"
        }


      </div>
    </div>
  );

}