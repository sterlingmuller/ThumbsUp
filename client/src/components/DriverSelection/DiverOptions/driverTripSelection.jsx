import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import { DriverTiles } from './driverTiles.jsx';
import axios from 'axios';
import TripMap from './tripMap.jsx'

export const DriverTripSelection = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [trip, setTrip] = useState(undefined);

  useEffect(()=>{
    console.log('Use effect triggered: selected trip ', selectedTrip.id)
    axios.get('/specificTrip', { params:{trip_id: selectedTrip.id}})
    .then((data)=>{
      console.log('Specific trip: ', data)
      setTrip(data)
    })
    .catch((err)=>console.log(err))
  },[currentUser])


  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      {!trip?<div>loading</div>:<div><TripMap trip={trip}/></div>}
      <div >
        { currentUser.usertype === 'driver'  ? <DriverTiles /> : <ChatRoom />}

      </div>
    </div>
  );

}