import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../../contexts/MainContext.js'



export const SaveMeASeat = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  useEffect(() => {
    //query to get current rides from db
  }, [])

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        This is {currentPage} make it more awesomer!!!
        {/* 
          render map
          render custom message
          render button Save me a seat - sends either custom message or "Save me a seat to the driver"
        
        */}
      </div>
    </div>
  );

}