import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../contexts/MainContext.js';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import './Rider.css';
import { Button } from "react-bootstrap";
import { Offcanvas } from 'react-bootstrap';
import { RiderMenu } from './RiderHamburgerModal/riderMenu.jsx';



export const RiderPortal = () => {
  const { currentPage, setCurrentPage, selectedTrip, setSelectedTrip } = useContext(MainContext);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const librariesArray = ['places'];
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.MAPS_API_KEY,
    libraries: librariesArray
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLat = position.coords.latitude;
      const newLong = position.coords.longitude;
      setLat(newLat);
      setLong(newLong);
    })
  }, [])


  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: +lat,
    lng: +long
  };

  const handleClick = (e) => {
    setCurrentPage('riderSearch');

  }

  // const handelHamburgerClick = () => {
  //   setCurrentPage("riderMenu");
  // }


  return (
    !isLoaded ? <div>Loading</div> :
    <div className="rider-portal-container">
      <div className="div-h2">
      <GiHamburgerMenu size={25} className='hamburger-menu' onClick={handleShow} />
      <h2>Rider Portal</h2>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <RiderMenu />
      </Offcanvas>

      <div>
        <GoogleMap className="rider-map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          clickableIcons={true}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </div>

      <Link to="/riderSearch">
        <Button className="rider-portal-button" variant="primary" onClick={handleClick}>New Ride</Button>
      </Link>
    </div>
  );

}

