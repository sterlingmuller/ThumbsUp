import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import { DriverTiles } from './driverTiles.jsx';
import axios from 'axios';
import TripMap from './tripMap.jsx'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


export const DriverTripSelection = () => {
  const { currentUser, selectedTrip, setCurrentChat } = useContext(MainContext);
  const [trip, setTrip] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/specificTrip?trip_id=${selectedTrip}`)
      .then((data) => {
        setTrip(data)
      })
      .catch((err) => console.log(err))
  }, [currentUser])


  return (
    <div>
      {currentUser.usertype === 'driver' ? <IoMdArrowRoundBack className='backArrow' onClick={() => {
        setCurrentChat(null)
        navigate('/driverPortal');
      }} /> :
        <IoMdArrowRoundBack className='backArrow' onClick={() => {
          setCurrentChat(null)
          navigate('/riderUpcomingTrips');
        }} />}
      {!trip ? <div>loading</div> : <div><TripMap trip={trip} /></div>}
      <div >
        {currentUser.usertype === 'driver' ? <DriverTiles /> : <ChatRoom />}
      </div>
    </div>
  );
}