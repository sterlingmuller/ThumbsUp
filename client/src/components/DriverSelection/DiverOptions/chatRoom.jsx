import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import axios from 'axios';
import { Link } from "react-router-dom";


export const ChatRoom = (props) => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');


  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMessages = () => {
    var passObj
    if (currentUser.usertype === 'driver') {
      passObj = {
        tripId: selectedTrip || 1,
        sender_id: props.currentChatRoom
      }
    } else {
      passObj = {
        tripId: selectedTrip || 1,
        sender_id: currentUser.userId

      }
    };

    axios
      .get(`http://localhost:3000/messages`, {
        params: passObj
      }
      ).then((results) => {
        setMessages(results.data);
      })
  }

  const handleSend = () => {
    axios
      .post(`http://localhost:3000/messages`, {
        tripId: selectedTrip || 1,
        message_sender: Number(currentUser.userId),
        message_recepient: messages[0].message_recepient == Number(currentUser.userId) ? messages[0].message_sender : messages[0].message_recepient,
        message_body: typedMessage,
        message_time: new Date(),
      }).then(() => {
        setTypedMessage('');
        getMessages();
      });
  }

  const handleTyping = (e) => {
    setTypedMessage(e.target.value)
  }

  const handleAccept = (senderId) => {
    return axios
      .post(`/messagesAccept`, {
        params: {
          user_id: senderId,
          id_driver_trips: selectedTrip,
          pending: false
        }
      }).then(() => {
        axios
          .post(`http://localhost:3000/messages`, {
            tripId: selectedTrip || 1,
            message_sender: Number(currentUser.userId),
            message_recepient: messages[0].message_recepient == Number(currentUser.userId) ? messages[0].message_sender : messages[0].message_recepient,
            message_body: 'Seat Saved!',
            message_time: new Date(),
          }).then(() => {
            setTypedMessage('');
            getMessages();
          });
      }
      )
  }

  const handleReject = (senderId) => {
    return axios
      .delete(`/messagesReject`, {
        params: {
          tripId: selectedTrip || 1,
          sender_id: senderId,
        }
      }).then(() => {
        alert('Ride rejected!');
      })

  }

  return (
    !messages ? <div>loading...</div> :
      <div>


        <div style={{ border: 'grey solid 3px', borderRadius: '2rem', width: '40%', height: '25rem', overflow: 'auto', margin: 'auto' }}>
          {messages.map((oneMessage) => {
            let sideOfChat = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'right' : 'left';
            let colorBubble = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'rgb(250, 153, 28,.4)' : 'rgb(28, 118, 143,.4)';
            return (
              <div style={{ width: '100%', height: '3rem' }}>
                <div style={{ border: `${colorBubble} solid 2px`, backgroundColor: `${colorBubble}`, width: 'auto', borderRadius: '1rem', float: sideOfChat, padding: '4px', marginTop: '6px', margin:'6px' }}> {oneMessage.message_body}</div>
              </div>
            );
          })}

        </div>
        {currentUser.usertype === 'driver' && messages.length === 1 ?
          <span style={{marginLeft: '21rem' }}>
            <span style={{ border: 'green solid 1px' }} onClick={() => { handleAccept(Number(currentUser.userId) === Number(messages[0].message_sender) ? Number(currentUser.userId) : messages[0].message_sender) }}>ACCEPT Ride ICON </span>
            <Link to='driverPortal' >
              <span style={{ border: 'green solid 1px' }} onClick={() => { handleReject(Number(currentUser.userId) === Number(messages[0].message_sender) ? Number(currentUser.userId) : messages[0].message_sender) }}>REJECT Ride ICON</span>
            </ Link>
            Accept the ride to chat!
          </span>
          : <div style={{ float: 'right', marginRight: '3%', marginTop: '3%', width: '80%' }}>
            <input style={{ width: '45%', marginLeft: '16rem' }} placeholder={`message here`} value={typedMessage} onChange={(e) => { handleTyping(e) }}></input>
            <button onClick={() => { handleSend() }}>Send</button></div>}
      </div>
  );

}