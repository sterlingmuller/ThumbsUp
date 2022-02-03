import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import { ChatRoom } from './chatRoom.jsx';
import axios from 'axios';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export const DriverTiles = () => {
  const { currentUser, selectedTrip,currentChat, setCurrentChat } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);
  const [chatPartnerNameArr, setChatPartnerNameArr] = useState([]);
  const [driveInfo, setDriveInfo] = useState(null);
  const navigate = useNavigate();




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

            <h1>{driveInfo.start_address} - {driveInfo.end_address} | {moment(driveInfo.start_time).format('LLLL')}</h1>
            <ListGroup action>
            {chatPartnerNameArr.map((oneTile) => {
              return (
                <ListGroup.Item className = 'chatListItem'  onClick={() => { setCurrentChat(oneTile.user_id); navigate('/chatRoom'); }}>
                <div > {oneTile.user_id == currentUser.userId ? null :
                  <div > 
                    <span   >{oneTile.username} </span>
                    <span >💬</span>
                  </div>}</div>
                  </ ListGroup.Item>
              );
            })}
            </ ListGroup>
          </div>}
    </div>
  );

}