import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import axios from 'axios';


export const DriverTiles = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatPartnerNameArr, setChatPartnerNameArr] = useState([]);
  var dummy = [];




  useEffect(() => {
    getDriverTiles();
    setChatPartnerNameArr([]);
  }, [])

  useEffect(() => {
    const intervals = setInterval(() => {
      if (chatPartnerNameArr.length < 40 && !currentChat) {
        getDriverTiles();
      }
    }, 300);
    return () => clearInterval(intervals);
  }, []);



  const getDriverTiles = () => {
    axios
      .get(`/messagesChatRooms`, {
        params: {
          tripId: selectedTrip || 1,
        }
      }).then((results) => {
        setDriverTiles(results.data);
        results.data.forEach((user) => {
          getTripInfo(user.message_sender);
        })
      });
  }

  const getTripInfo = (senderId) => {
    return axios
      .get(`/messagesUsers`, {
        params: {
          sender_id: senderId,
        }
      }).then((results) => {
        let stateCopy = chatPartnerNameArr;
        if (stateCopy.filter(e => e.username === results.data[0].username).length === 0) {
          stateCopy.push(results.data[0]);
        }
        setChatPartnerNameArr(stateCopy);
      });
  }

  const handleAccept = (senderId) => {
    return axios
      .post(`/messagesAccept`, {
        params: {
          user_id:senderId,
          id_driver_trips:selectedTrip,
          pending: false
        }
      })

  }

  const handleReject = (senderId) => {
    return axios
    .delete(`/messagesReject`, {
      params: {
        tripId:selectedTrip,
        sender_id:senderId,

      }
    })

  }


  return (
    <div>
      {currentChat ? <ChatRoom currentChatRoom={currentChat} /> :
        !driverTiles || chatPartnerNameArr.length === driverTiles.length + 1 ? <div> loading...</div> :
          <div>
            {chatPartnerNameArr.map((oneTile) => {
              console.log('this is equal?, ', oneTile, currentUser.userId);
              return (
                <div style={{ border: 'black solid 2px' }}> {oneTile.user_id == currentUser.userId ? null :
                  <div ><span onClick={() => { setCurrentChat(oneTile.user_id) }} >{oneTile.username}</span>
                  {}
                    <span style={{ border: 'green solid 1px',float: 'right' }} onClick={() => {handleAccept(oneTile.user_id) }}>ACCEPT ICON </span>
                    <span style={{ border: 'green solid 1px',float: 'right' }} onClick={() => {handleReject(oneTile.user_id) }}>REJECT ICON</span>
                  </div>}</div>
              );
            })}
          </div>}
    </div>
  );

}