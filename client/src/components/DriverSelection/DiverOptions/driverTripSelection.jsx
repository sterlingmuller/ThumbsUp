import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js'
import axios from 'axios';


export const DriverTripSelection = () => {
  const { currentPage, setCurrentPage, setUserId, userId } = useContext(MainContext);
  const [messages, setMessages] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/messages`, {
        params: {
          tripId: 1
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
            console.log('are these usernames:',users);
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
    !messages ? <div>loading...</div> :
      <div>
        {console.log(messages)}
        <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
        <div>MAP COMPONENT</div>
        <div style={{ border: 'grey solid 3px', width: '90%', height: '600px', margin: 'auto' }}>
          {messages.map((oneMessage) => {
            let sideOfChat = userId !== oneMessage.message_sender ? 'right' : 'left';
            return (
              <div style={{ border: 'black solid 2px'}}>
                <div style={{ border: 'blue solid 2px', width: 'auto', borderRadius: '95px', float: sideOfChat, margin: '15px', padding: '5px' }}>{oneMessage.message_body}</div>
              </div>
            );
          })}
        </div>
        <span style={{ float: 'right', marginRight: '3%', marginTop: '3%', width: '80%' }}>
          <input style={{ width: '85%' }} placeholder={`message ${messages[0].message_recepient}`} value={typedMessage} onChange={(e) => { handleTyping(e) }}></input>
          <button onClick={() => { handleSend() }}>Send</button></span>

      </div>
  );

}