import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'
import axios from 'axios';


export const DriverTripSelection = () => {
  const { currentPage, setCurrentPage, setUserId, userId } = useContext(MainContext);
  const [messages, setMessages] = useState(null);

useEffect(() => {
  axios
.get(`http://localhost:3000/messages`, {
  params: {
    tripId: 1
  }}).then((results) => {
  setMessages(results.data);
});
}, [])

const handleSend = () => {
  axios
.post(`http://localhost:3000/messages`, {
  //build post object 
}).then((results) => {
  setMessages(results.data);
});
}


  return (
    !messages? <div>loading...</div> :
    <div>
      {console.log(messages)}
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div>MAP COMPONENT</div>
      <div style = {{border: 'grey solid 3px', width:'90%',height:'600px', margin:'auto'}}>
      {messages.map((oneMessage) => {
        let sideOfChat = userId !== oneMessage.message_sender? 'right': 'left';
        return (
          <div style = {{border: 'blue solid 2px', width: 'auto',borderRadius: '95px', float: sideOfChat, margin: '15px', padding:'5px' }}>{oneMessage.message_body}</div>
        );
      })}
      </div>
      <span style={{float: 'right', marginRight:'3%',marginTop:'3%',width:'80%'}}>      <input style={{width:'85%'}}></input>
      <button onClick={()=> {handleSend()}}>Send</button></span>

    </div>
  );

}