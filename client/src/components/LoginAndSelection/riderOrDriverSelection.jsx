import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js'
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";


export const RiderOrDriverSelection = () => {
  const { currentPage, setCurrentPage, setUserId, currentUser, setCurrentUser } = useContext(MainContext);

  const navigate = useNavigate()

  const becomeRider = (e) => {
    let stateCopy = currentUser
    stateCopy["usertype"] = e.target.name
    setCurrentUser(stateCopy);
    navigate('/riderPortal')
  }

  const becomeDriver = (e) => {
    let stateCopy = currentUser
    stateCopy["usertype"] = e.target.name
    setCurrentUser(stateCopy);
    navigate('/driverPortal')
  }

  return (
    <div className="riderOrDriver">
      <h1>Today I'd like to</h1>
        <img className="rider" name="rider" onClick={becomeRider} src="https://us.123rf.com/450wm/zerolost/zerolost1908/zerolost190800298/128045676-hand-holds-smartphone-calling-taxi-service.jpg?ver=6"></img>
        <img className="driver" name="driver" onClick={becomeDriver} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/steering-wheel-92-1091349.png"></img>
    </div>
  );

}