import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import "./Ride.css";
import {Button} from 'react-bootstrap';



export const RiderSearch = () => {
  const { currentPage, setCurrentPage, slectedTrip, setSelectedTrip } = useContext(MainContext);
  const [riderSearchDetails, setRiderSearchDetails] = useState({
    startingLocation: "",
    destination: "",
    time: ""
  });
  const [allMatchingTrips, setAllMatchingTrips] = useState({});


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
        <form>
          <label>
            Starting Location
            <input
              name="startingLocation"
              type="text"
              onChange={handleChange} />
          </label>
          <br />
          <label>
            Destination
            <input
              name="destination"
              type="text"
              onChange={handleChange} />
          </label>
          <br />
          <label>
            Time
            <input
              name="time"
              type="text"
              onChange={handleChange} />
          </label>
        </form>

        <Button varient="primary" className="new-ride-button" onClick={handleClick}>Submit</Button>


      
      <div>
        <h2>Available Rides</h2>
        {
          Object.keys(allMatchingTrips).length !== 0 ?

            allMatchingTrips.map((trip) => {
              return (
                <div>
                  <Link to="/saveMeASeat">

                    <div className="card-body" onClick={() => {
                      setSelectedTrip(trip.id);
                      console.log("New selected trip id: ", trip.id);
                    }} key={trip.id}>{`From ${trip.start_address}\n 
                                        To ${trip.end_address}\n 
                                        At ${moment(trip.start_time).format("LLLL")}`}
                    </div>

                  </Link>
                </div>
              )
            })



            : "Search For a Ride!"
        }


      </div>
    </div>
  );

}