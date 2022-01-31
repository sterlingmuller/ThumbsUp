import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'

import axios from 'axios';


export const DriverTiles = () => {
  const { currentPage, setCurrentPage, setUserId, userId, currentUser,selectedTrip } = useContext(MainContext);
  const [driverTiles, setDriverTiles] = useState(null);

  useEffect(() => {
    axios
      .get(`/messagesChatRooms`, {
        tripId: selectedTrip || 1,
        userId: currentUser.userId 
      }).then((results) => {
        console.log('These are the tiles:',results);
        setDriverTiles(results);
      });
  },[])
    
    
    
    
    
    
    
    
    
  //   () => {
  //   console.log('getting to the drivertiles!');
  //   axios
  //   .get(`http://localhost:3000/messagesChatRooms`, {
  //     params: {
  //       tripId: selectedTrip || 1,
  //       userId: currentUser.userId 
  //     }
  //   }
  //   ).then((results) => {
  //     console.log('These are the tiles:',results);
  //     setDriverTiles(results);
  //   })
  // }, []);






  return (
    <div>
    {!driverTiles ? <div> loading...</div> :
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      {driverTiles.map((oneTile) => {
        console.log(oneTile);
        return (
          <div> tiles here</div>
        );
      })}
    </div>}
    </div>
  );

}