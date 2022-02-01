import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext';
import axios from 'axios';
import StarRatings from 'react-star-ratings';


export const PostTrip = () => {
  const { setCurrentPage, selectedTrip, currentUser } = useContext(MainContext);
  const [rating, setRating] = useState(0);
  const [driver, setDriver] = useState({});
  const [rated, setRated] = useState(false)

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
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        <span>Driver: {driver.username}</span>
        {rated
        ? <StarRatings
          rating={rating}
          starRatedColor='blue'
          />
        : <div>
            <StarRatings
              rating={rating}
              changeRating={changeRating}
              starHoverColor='blue'
              starRatedColor='blue'
            />
            <button onClick={handleSubmit}>Rate Me!</button>
          </div>
        }
      </div>
      <div>chat here</div>
    </div>
  );

}