import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';


export const ChatRoom = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser, selectedTrip } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');
  

  useEffect(() => {
    getMessages();
    }, []);

    
const getMessages = ()=>{
  axios
  .get(`http://localhost:3000/messages`, {
    params: {
      tripId: selectedTrip || 1,
      recepient_id: currentUser.userId ,
    }
  }
  ).then((results) => {
    setMessages(results.data);
    axios
      .get(`http://localhost:3000/messagesUsers`, {
        params: {
          sender_id: results.data[0].message_sender,
          recepient_id: results.data[0].message_recepient
        }
      }
      ).then((users) => {
  })
  })
}

  const handleSend = () => {
    axios
      .post(`http://localhost:3000/messages`, {
       tripId:  selectedTrip || 1, 
       message_sender: messages[0].message_recepient,
       message_recepient: currentUser.userId,
       message_body: typedMessage,
       message_time: new Date(),
      }).then(() => {
        getMessages();
      });
  }

  const handleTyping = (e) => {
    setTypedMessage(e.target.value)
  }

  return (
    !messages ? <div>loading...</div> :  
    <div>
      <div style={{ border: 'grey solid 3px', width: '40%', height:'25rem',overflow:'auto', margin: 'auto' }}>
          {messages.map((oneMessage) => {
            let sideOfChat = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'right' : 'left';
            return (
              <div style={{  width: '100%', height: '3rem'}}>
                <div style={{ border: 'blue solid 2px', width: 'auto', borderRadius: '15rem', float: sideOfChat}}>{sideOfChat}: {oneMessage.message_body}</div>
              </div>
            );
          })}
        

      </div>
      <div style={{ float: 'right', marginRight: '3%', marginTop: '3%', width: '80%' }}>
      <input style={{ width: '45%', marginLeft:'16rem' }} placeholder={`message ${messages[0].message_recepient}`} value={typedMessage} onChange={(e) => { handleTyping(e) }}></input>
      <button onClick={() => { handleSend() }}>Send</button></div></div>
  );

}