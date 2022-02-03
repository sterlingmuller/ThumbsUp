import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";

export const DriverTiles = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatPartnerNameArr, setChatPartnerNameArr] = useState([]);
  const [driveInfo, setDriveInfo] = useState(null);




  useEffect(() => {
    getDriverTiles();
    setChatPartnerNameArr([]);
    setDriveInfo(null);
    getDriveInfo();
  }, [])

  useEffect(() => {
    const intervals = setInterval(() => {
      if (chatPartnerNameArr.length < 40 && !currentChat) {
        getDriverTiles();
      }
    }, 300);
    return () => clearInterval(intervals);
  }, []);

  const getDriveInfo = () => {
    axios
      .get(`/messagesDriveInfo`, {
        params: {
          tripId: selectedTrip || 1,
        }
      }).then((results) => {
        setDriveInfo(results.data[0]);
        })

  };

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



  return (
    <div>
      {currentChat ? <ChatRoom currentChatRoom={currentChat} /> :
        !driverTiles || chatPartnerNameArr.length === driverTiles.length + 1 || !driveInfo ? <div> loading...</div> :
          <div>
            <Link to= "/driverTripSelection">
            <div>BACK ICON</div>
            </Link>
            <h1>Chats for your upcoming drive from {driveInfo.start_address} to {driveInfo.end_address} on {moment(driveInfo.start_time).format('LLLL')}</h1>
            {chatPartnerNameArr.map((oneTile) => {
              return (
                <div style={{ margin:'auto',  width: '70%', hieght:'auto',marginTop:'1em' }}> {oneTile.user_id == currentUser.userId ? null :
                  <div style= {{border: 'black solid 2px',}}>

                    <span style={{  fontSize:'3rem' }} onClick={() => { setCurrentChat(oneTile.user_id) }} >{oneTile.username} </span>
                    <span style={{ float:'right', fontSize:'3rem' }}>💬</span>


                  </div>}</div>
              );
            })}
          </div>}
    </div>
  );

}