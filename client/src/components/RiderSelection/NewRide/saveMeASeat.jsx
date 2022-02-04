import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import TripMap from '../../DriverSelection/DiverOptions/tripMap.jsx'
import {Button} from 'react-bootstrap';
<<<<<<< HEAD
=======

>>>>>>> 9796d6d2813812b440fa3a754fd2965615b94990
export const SaveMeASeat = () => {
  const { selectedTrip, currentUser, currentPage, setCurrentPage, setUserId } = useContext(MainContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState(undefined);
  useEffect(()=>{
    axios.get(`/specificTrip?trip_id=${selectedTrip}`)
    .then((data)=>{
      setTrip(data)
    })
    .catch((err)=>console.log(err))
  },[currentUser])
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
      {!trip?<div>loading</div>:<div><TripMap trip={trip}/></div>}
      <Button variant='primary' onClick = {() => {
              axios.get(`/trips/driver?trip_id=${selectedTrip}`)
                .then(({ data }) => {
                  axios
                  .post(`http://localhost:3000/messages`, {
                   tripId:  selectedTrip || 1,
                   message_sender: Number(currentUser.userId),
                   message_recepient:  data.user_id,
                   message_body: `Hey this is ${currentUser.username} can you save me a seat?`,
                   message_time: new Date(),
                  }).then(() => {
                   alert('message sent!');//setCurrentPage
                  }).then(() => navigate('/riderPortal'))
                })
      }}> Save me a seat</Button>
    </div>
  );
}