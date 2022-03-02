import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { ChatRoom } from '../../../DriverSelection/DiverOptions/chatRoom';
import { Button, Card } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const PostTrip = () => {
  const { selectedTrip, currentUser } = useContext(MainContext);
  const [rating, setRating] = useState(0);
  const [driver, setDriver] = useState({});
  const [rated, setRated] = useState(false)
  const navigate = useNavigate();

  const changeRating = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/trips/driver', {trip: selectedTrip, driver: driver.user_id, rator: currentUser.userId, rating: rating})
      .then(() => alert('Thank you for the feedback!'))
      .then(() => setRated(true))
  }

  const getDriver = () => {
    axios.get(`/trips/driver?trip_id=${selectedTrip}`)
      .then(({ data }) => {
        getRated(data.user_id);
        setDriver(data);
      })
  }

  const getRated = (driver_id) => {
    axios.get(`/trips/rated?driver=${driver_id}&rider=${currentUser.userId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setRated(true);
          setRating(data[0].rating)
        }
      })
  }

  useEffect(() => {
    getDriver();
  }, [])

  return (
    <Card>
      <Card.Header as='h1'>
        <div>{driver.start_address} - {driver.end_address}</div>
        <div>{moment(driver.start_time).format('LLLL')}</div>
      </Card.Header>
      <IoMdArrowRoundBack className='backArrowCard' onClick={() => navigate('/tripHistory')}/>
      <Card.Body>
        <Card.Title as='h1'>Driver: {driver.username}</Card.Title>
        {rated
        ? <StarRatings
        rating={rating}
        starRatedColor='#032539'
        />
        : <div>
            <StarRatings
              rating={rating}
              changeRating={changeRating}
              starHoverColor='#032539'
              starRatedColor='#032539'
              />
            <Button variant='primary' onClick={handleSubmit}>Rate Me!</Button>
          </div>
        }
        <div><ChatRoom /></div>
      </Card.Body>
    </Card>
  );
}