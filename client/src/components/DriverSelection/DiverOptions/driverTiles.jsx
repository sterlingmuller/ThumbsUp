import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import axios from 'axios';


export const DriverTiles = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser,selectedTrip } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatPartnerNameArr, setChatPartnerNameArr] = useState([]);
  var dummy =[];
  useEffect(() => {
    axios
      .get(`/messagesChatRooms`, {
        params: {
          tripId: selectedTrip || 1,
        }
      }).then((results) => {
        console.log('these are messages:', results);
        setDriverTiles(results.data);
        results.data.forEach((user) => {
          getTripInfo(user.message_sender);
        })
      });
  },[])


  const getTripInfo =  (senderId) => {
    return axios
      .get(`/messagesUsers`, {
        params: {
          sender_id:senderId,
        }
      }).then((results) => {
        console.log(results.data[0].username);
        setChatPartnerNameArr([...chatPartnerNameArr,results.data[0].username]);
      });
  }

    
  return (
    <div>
      { currentChat ?<ChatRoom currentChatRoom = {currentChat} />:
     !driverTiles || chatPartnerNameArr.length === driverTiles.length || chatPartnerNameArr.length === 0  ?  <div> loading...</div> :
    <div>
      { driverTiles.map( (oneTile) => {
        // let chatPartnerName =   getTripInfo(oneTile.message_sender);
        console.log('this is chat', chatPartnerNameArr);
          return ( 
            <div style = {{border: 'black solid 2px'}}> {oneTile.message_sender == currentUser.userId ? null : 
            <div onClick = {() => {setCurrentChat(oneTile.message_sender)}}>{oneTile.message_sender}</div>}</div>
          );
        
         

      })}
    </div>}
    </div>
  );

}