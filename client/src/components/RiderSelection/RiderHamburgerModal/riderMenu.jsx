import React, { useContext } from 'react';
import { MainContext } from '../../../contexts/MainContext.js';
import { useNavigate } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';

export const RiderMenu = () => {
  const { currentUser } = useContext(MainContext);
  const navigate = useNavigate();
  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{currentUser.username}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='offcanvasBody' onClick={() => navigate('/riderUpcomingTrips')}>My upcoming trips</div>
        <div className='offcanvasBody' onClick={() => navigate('/tripHistory')}>My trip history</div>
      </Offcanvas.Body>
    </>
  );
}