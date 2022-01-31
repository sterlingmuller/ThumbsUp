import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import { DriverTiles } from './driverTiles.jsx';
import axios from 'axios';


export const DriverTripSelection = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');


  useEffect(() => {
    axios
      .get(`http://localhost:3000/messages`, {
        params: {
          tripId: selectedTrip || 1
        }
      }
      ).then((results) => {
        console.log(results);
        setMessages(results.data);
        axios
          .get(`http://localhost:3000/messagesUsers`, {
            params: {
              sender_id: results.data[0].message_sender,
              recepient_id: results.data[0].message_recepient
            }
          }
          ).then((users) => {
            console.log('are these usernames:', users);
          })
      })
  }, []);

  const handleSend = () => {
    axios
      .post(`http://localhost:3000/messages`, {
        //build post object 
      }).then((results) => {
        setMessages(results.data);
      });
  }

  const handleTyping = (e) => {
    setTypedMessage(e.target.value)
  }

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div>MAP COMPONENT</div>
      <div >
        { currentUser.usertype === 'driver' ? <DriverTiles /> : <ChatRoom />}
        
      </div>
    </div>
  );

}