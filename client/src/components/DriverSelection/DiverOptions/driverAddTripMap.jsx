import React, { useState, useEffect, useRef, useContext } from 'react'
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api';
import { MainContext } from '../../../contexts/MainContext.js'
import axios from 'axios';

const librariesArray = ['places'];
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 41.878253,
  lng: -87.72995
};

function DriverTripMap(props) {
  let [directionsResult, setDirections] = useState(undefined);
  let [newTrip, setNewTrip] = useState({});
  let [startPoint, setStartPoint] = useState('');
  let [endPoint, setEndPoint] = useState('');
  let { currentUser } = useContext(MainContext);
  let [directionsRequest, setRequest] = useState({
    origin: 'New York, NY, USA',
    destination: 'New York, NY, USA',
    travelMode: 'DRIVING'
  });

  useEffect(() => {
    console.log('Use Effect Triggered')
  }, [directionsRequest])

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: '',
    libraries: librariesArray
  });

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      console.log(result);
      setDirections(result);
    }
  }

  const renderDirections = () => {
    console.log('Get Directions: ')
    setRequest({ ...directionsRequest, origin: startPoint[0].formatted_address, destination: endPoint[0].formatted_address });
    setDirections(undefined);
  }

  const onStartLoad = (ref) => setStartPoint(ref);

  const onEndLoad = (ref) => setEndPoint(ref);

  const onStartChanged = () => setStartPoint(startPoint.getPlaces());

  const onEndChanged = () => setEndPoint(endPoint.getPlaces());

  const addTrip = () => {
    axios.post('/AddDriverTrip', {
      start_address: directionsResult.request.origin.query,
      end_address: directionsResult.request.destination.query,
      start_time: "2022-06-14T00:00",//directionsResult.request.drivingOptions.departureTime,
      user_id: currentUser.userId
    })
      .then((response) => {
        console.log('AddTrip: ', response);
      })
      .catch((error) => {
        console.log('AddTrip Error: ', error);
      });
  }

  return (
    !isLoaded ? <div>Loading</div> :
      <div>
        {console.log('Loading load script', startPoint, endPoint, directionsRequest)}
        <GoogleMap
          id='map'
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {!directionsResult ? <DirectionsService callback={directionsCallback} options={directionsRequest} /> : null}
          {!directionsResult ? null : <DirectionsRenderer directions={directionsResult} onLoad={directionsRenderer => {
            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsResult)
          }} />}
          <></>
          <StandaloneSearchBox
            onLoad={onStartLoad}
            onPlacesChanged={onStartChanged}
          >
            <input
              type="text"
              placeholder="Start Point"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                bottom: "9%"
              }}
            />
          </StandaloneSearchBox>
          <StandaloneSearchBox
            onLoad={onEndLoad}
            onPlacesChanged={onEndChanged}
          >
            <input
              type="text"
              placeholder="End Point"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                bottom: '0'
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
        <button onClick={renderDirections}>Get Directions</button>
        <button onClick={addTrip}>Add Trip</button>
        <label htmlFor="start-time">Departure Date and Time:</label>
        <input type="datetime-local" id="start-time"
          name="start-time" value="2022-02-01T00:00"
          min="2022-02-01T00:00" max="2022-06-14T00:00" />
      </div>
  )
}

export default React.memo(DriverTripMap)