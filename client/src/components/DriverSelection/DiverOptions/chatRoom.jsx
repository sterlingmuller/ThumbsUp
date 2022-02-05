import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from 'react-bootstrap';
import './chatRoom.css';

export const ChatRoom = (props) => {
  const { currentUser, selectedTrip, currentChat,setCurrentChat } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');
  const navigate = useNavigate();


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
        sender_id: currentChat
      }
    } else {
      passObj = {
        tripId: selectedTrip || 1,
        sender_id: currentUser.userId

      }
    };

    axios
      .get(`/messages`, {
        params: passObj
      }
      ).then((results) => {
        setMessages(results.data);
      })
  }

  const handleSend = () => {
    axios
      .post(`/messages`, {
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
          .post(`/messages`, {
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
     <div className = 'bigDiv'>
        {currentUser.usertype === 'driver'  ? <IoMdArrowRoundBack className = 'backArrow' onClick = {() => {
            setCurrentChat(null)
            navigate('/driverTripSelection');
        }}/>: null}

        <div className='chatBox' style = {currentUser.usertype === 'driver'?null:{height: '15rem'}}>
          {messages.map((oneMessage) => {
            let sideOfChat = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'right' : 'left';
            let colorBubble = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'rgb(250, 153, 28,.7)' : 'rgb(251, 243, 242,.7)';
            return (
              <div className = 'oneChat' >
                <p className = 'chatBubble' style={{ border: `${colorBubble} solid 2px`,backgroundColor: `${colorBubble}`,float: sideOfChat, color: 'black' }}> {oneMessage.message_body}</p>
              </div>
            );
          })}

        </div>
        {currentUser.usertype === 'driver' && messages.length === 1 ?
          <span className= 'reject-button'>
            <Button className= 'reject-button' varient='primary'  onClick={() => { handleAccept(Number(currentUser.userId) === Number(messages[0].message_sender) ? Number(currentUser.userId) : messages[0].message_sender) }}>ACCEPT Ride ICON </Button>
            <Link to='/driverTripSelection' >
              <Button className= 'reject-button' varient='secondary' onClick={() => { handleReject(Number(currentUser.userId) === Number(messages[0].message_sender) ? Number(currentUser.userId) : messages[0].message_sender) }}>REJECT Ride ICON</Button>
            </ Link>
                           Accept the ride to chat!
          </span>
          : <div  className= 'text-input'>
          <input  className= 'text-input' placeholder={`message here`} value={typedMessage} onChange={(e) => { handleTyping(e) }}></input>
            <Button varient='primary' onClick={() => { handleSend() }}>Send</Button></div>}
      </div>
  );

}