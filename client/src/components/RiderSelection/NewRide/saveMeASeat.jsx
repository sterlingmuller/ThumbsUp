import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export const SaveMeASeat = () => {
  const { selectedTrip, currentUser, currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  useEffect(() => {
    //query to get current rides from db
  }, [])

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        This is {currentPage} make it more awesomer!!!
        {/*
          render map
          render custom message
          render button Save me a seat - sends either custom message or "Save me a seat to the driver"

        */}
      </div>
        <Link to= "/riderportal">

      <Button onClick = {() => {
              axios.get(`/trips/driver?trip_id=${selectedTrip || 2}`)
                .then(({ data }) => {
                  axios
                  .post(`http://localhost:3000/messages`, {
                   tripId:  selectedTrip || 1,
                   message_sender: Number(currentUser.userId),
                   message_recepient:  data.user_id,
                   message_body: `Hey this is ${currentUser.username} can you save me a seat?`,
                   message_time: new Date(),
                  }).then(() => {
                   alert('Request sent!');
                  });
                })


      }}> Save me a seat</Button>  </Link>
    </div>

  );
}