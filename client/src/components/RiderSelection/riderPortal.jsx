import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Offcanvas } from 'react-bootstrap';
import { RiderMenu } from './RiderHamburgerModal/riderMenu.jsx';
import './Rider.css';

export const RiderPortal = () => {

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const librariesArray = ['places'];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.KEY,
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
    width: '70vw',
    height: '65vh'
  };

  const center = {
    lat: +lat,
    lng: +long
  };

  return (
    !isLoaded ? <div>Loading</div> :
    <div className="rider-portal-container">
      <div className="div-h2">
      <GiHamburgerMenu size={40} className='hamburger-menu hamburgerIcon' onClick={handleShow} />
      <h1>Rider Portal</h1>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <RiderMenu />
      </Offcanvas>

      <div>
        <GoogleMap className="rider-map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          clickableIcons={true}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </div>

      <Link to="/riderSearch">
        <Button className="rider-portal-button" variant="primary">New Ride</Button>
      </Link>
    </div>
  );
}

