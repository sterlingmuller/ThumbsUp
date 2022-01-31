import React, { useState, useEffect, useRef, useCallback} from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

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
    departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
    trafficModel: 'optimistic'
  }
};

function DriverTripMap(props) {
  let [DirectionsResult, setDirections] = useState(undefined);

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      console.log(result);
      setDirections(result);
    }
  }

  return (
    <LoadScript
      googleMapsApiKey=''

    >
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
    </LoadScript>
  )
}

export default React.memo(DriverTripMap)