import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import { DriverTiles } from './driverTiles.jsx';
import axios from 'axios';


export const DriverTripSelection = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');




  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div>MAP COMPONENT</div>
      <div >
        {console.log('user type:::', currentUser.usertype)};
        { currentUser.usertype === 'driver'  ? <DriverTiles /> : <ChatRoom />}

      </div>
    </div>
  );

}