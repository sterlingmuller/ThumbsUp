import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../../../contexts/MainContext';
import axios from 'axios';
import StarRatings from 'react-star-ratings';


export const PostTrip = () => {
  const { setCurrentPage, selectedTrip} = useContext(MainContext);
  const [rating, setRating] = useState(0);
  const [driver, setDriver] = useState({});
  const [rated, setRated] = useState(false)

  const changeRating = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/trips/driver', {trip: selectedTrip, driver: driver.user_id, rating: rating})
      .then(() => alert('Thank you for the feedback!'))
      .then(() => setRated(true))
  }

  const getDriver = () => {
    axios.get(`/trips/driver?trip_id=${selectedTrip}`)
      .then(({ data }) => setDriver(data))
  }

  useEffect(() => {
    getDriver();
  }, [])

  return (
    <div>
      <div className='siteNavigatorSquare' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      <div className='siteNavigatorSquare' >
        <span>Driver: {driver.username}</span>
        <StarRatings
          rating={rating}
          changeRating={changeRating}
          starHoverColor='blue'
          starRatedColor='blue'
        />
        {rated ? null: <button onClick={handleSubmit}>Rate Me!</button>}
      </div>
      <div>chat here</div>
    </div>
  );

}