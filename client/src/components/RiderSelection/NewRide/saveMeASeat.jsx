import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TripMap from '../../DriverSelection/DiverOptions/tripMap.jsx'
import {Button} from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";

export const SaveMeASeat = () => {
  const { selectedTrip, currentUser } = useContext(MainContext);
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
    <div >
      <IoMdArrowRoundBack className = 'backArrow' onClick = {() => {
            navigate('/riderSearch');
        }}/>
      {!trip?<div>loading</div>:<div><TripMap trip={trip}/></div>}
      <div className="saveSeat">
      <span> Ride look good? Tell the driver to </span>
      <Button className="btn-primary" onClick = {() => {
              axios.get(`/trips/driver?trip_id=${selectedTrip}`)
                .then(({ data }) => {
                  console.log(data);
                  axios
                  .post(`http://localhost:3000/messages`, {
                   tripId:  selectedTrip || 1,
                   message_sender: Number(currentUser.userId),
                   message_recepient:  data.user_id,
                   message_body: `Hey this is ${currentUser.username} can you save me a seat?`,
                   message_time: new Date(),
                  }).then(() => navigate('/riderPortal'))
                })
      }}> Save me a seat</Button>
      </div>
    </div>
  );
}