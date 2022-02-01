import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';


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
        console.log('This will run every 5 seconds!');
      }, 5000);
      return () => clearInterval(interval);
    }, []);

const getMessages = ()=>{
  var passObj
  if (currentUser.usertype === 'driver') {
    passObj = {
      tripId: selectedTrip || 1,
      sender_id: props.currentChatRoom
    }} else {
      passObj  = {
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
    console.log({
      tripId:  selectedTrip || 1, 
      message_sender: messages[0].message_recepient,
      message_recepient: currentUser.userId,
      message_body: typedMessage,
      message_time: new Date(),
     });
    axios
      .post(`http://localhost:3000/messages`, {
       tripId:  selectedTrip || 1, 
       message_sender: Number(currentUser.userId),
       message_recepient: messages[0].message_recepient == Number(currentUser.userId) ? messages[0].message_sender :messages[0].message_recepient ,
       message_body: typedMessage,
       message_time: new Date(),
      }).then(() => {
        console.log('got essages after posting!!');
        setTypedMessage('');
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
            let colorBubble = Number(currentUser.userId) === Number(oneMessage.message_sender) ? 'orange' : 'blue';
            return (
              <div style={{  width: '100%', height: '3rem'}}>
                <div style={{ border: `${colorBubble} solid 2px`, width: 'auto', borderRadius: '15rem', float: sideOfChat, padding: '2px'}}> {oneMessage.message_body}</div>
              </div>
            );
          })}
        

      </div>
      <div style={{ float: 'right', marginRight: '3%', marginTop: '3%', width: '80%' }}>
      <input style={{ width: '45%', marginLeft:'16rem' }} placeholder={`message here`} value={typedMessage} onChange={(e) => { handleTyping(e) }}></input>
      <button onClick={() => { handleSend() }}>Send</button></div></div>
  );

}