import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";


export const RiderOrDriverSelection = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);

  return (
    <div className="riderOrDriver">
      <div className='backToMainNav' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <h1>Today I'd like to</h1>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={() => setCurrentPage('riderPortal')}>
          Rider
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setCurrentPage('driverPortal')}>
          Driver
        </Button>
      </div>
    </div>
  );

}