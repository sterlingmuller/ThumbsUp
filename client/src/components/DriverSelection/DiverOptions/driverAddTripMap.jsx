import React, { useState, useEffect, useRef, useCallback} from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete} from '@react-google-maps/api';

const librariesArray = ['places'];
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 41.878253,
  lng: -87.72995
};

const directionsRequest = {
  origin: '233 S Wacker Dr, Chicago, IL 60606',
  destination: 'Los Angeles, CA',
  travelMode: 'DRIVING',
  drivingOptions: {
    departureTime: new Date(Date.now()),
    trafficModel: 'optimistic'
  }
};

function DriverTripMap(props) {
  let [DirectionsResult, setDirections] = useState(undefined);
  let [start, setStart] = useState('');
  let end = '';

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      console.log(result);
      setDirections(result);
    }
  }

  const startInput = (event) => {
    console.log('Startpoint:')
  }

  const endInput = (event) => {
    console.log('Endpoint: ')

  }


  return (
    <LoadScript
      googleMapsApiKey=''
      libraries={librariesArray}
    >
      {console.log('Loading load script')}
      <GoogleMap
        id='map'
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {!DirectionsResult?<DirectionsService callback={directionsCallback} options={directionsRequest}/>:null}
        {!DirectionsResult? null:<DirectionsRenderer directions={DirectionsResult}  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', DirectionsResult)}}/>}
        <></>
      </GoogleMap>
      <Autocomplete onLoad={()=>console.log('startinput: ')} onPlacesChanged={startInput}>
        <input
            type="text"
            placeholder="Starting Point"

        />
      </Autocomplete>
      <Autocomplete onPlacesChanged={console.log('Ezra: ', this)}>
        <input
            type="text"
            placeholder="End Point"
            onChange={endInput}
        />
      </Autocomplete>
      <button>Get Directions</button>
      <button onClick={() => console.log(start, end)}>Add Trip</button>
    </LoadScript>
  )
}

export default React.memo(DriverTripMap)