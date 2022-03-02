import React, { useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js'
import { useNavigate } from "react-router-dom";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

export const RiderOrDriverSelection = () => {
  const { currentUser, setCurrentUser } = useContext(MainContext);

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
      <div className="RorDwrapper">
        <div className="imgWrapper">
          <h2>Ride</h2>
          <img className="rider" name="rider" onClick={becomeRider} src="https://icon-library.com/images/carpool-icon/carpool-icon-28.jpg"></img>
        </div>
        <div className="imgWrapper">
          <h2>Drive</h2>
          <img className="driver" name="driver" onClick={becomeDriver} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/steering-wheel-92-1091349.png"></img>
        </div>
      </div>
    </div>
  );
}