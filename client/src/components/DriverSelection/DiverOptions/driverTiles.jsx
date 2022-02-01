import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import axios from 'axios';


export const DriverTiles = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser,selectedTrip } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatPartnerName, setChatPartnerName] = useState(null);

  useEffect(() => {
    axios
      .get(`/messagesChatRooms`, {
        params: {
          tripId: selectedTrip || 1,
        }
      }).then((results) => {
        console.log('these are messages:', results);
        setDriverTiles(results.data);
      });
  },[])


  const getTripInfo = (senderId) => {
    axios
      .get(`/messagesUsers`, {
        params: {
          sender_id:senderId,
        }
      }).then((results) => {
        setChatPartnerName(results.data[0].username);
      });
      return chatPartnerName;
  }


  return (
    <div>
      { currentChat ?<ChatRoom currentChatRoom = {currentChat} />:
     !driverTiles ? <div> loading...</div> :
    <div>
      {driverTiles.map((oneTile) => {
        return (
          <div style = {{border: 'black solid 2px'}}> {oneTile.message_sender == currentUser.userId ? null : <div onClick = {() => {setCurrentChat(oneTile.message_sender)}}>{getTripInfo(oneTile.message_sender)}</div>}</div>
        );
      })}
    </div>}
    </div>
  );

}