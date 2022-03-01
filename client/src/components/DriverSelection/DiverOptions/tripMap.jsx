import React, { useState, useContext } from 'react'
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const librariesArray = ['places'];
const containerStyle = {
  height: '45vh'
};

const center = {
  lat: 41.878253,
  lng: -87.72995
};

// Renders a google map with a passed prop. Pass a prop into this component
// called trip ie: trip={trip}
// Trip prop must be an object that lookes like the example below.
//   {
//     origin: 'New York, NY, USA',
//     destination: 'Buffalo, NY, USA',
//     travelMode: 'DRIVING'
//   }

function TripMap(props) {
  let [directionsResult, setDirections] = useState(undefined);
  let [directionsRequest, setRequest] = useState({
    origin: props.trip.data.start_address,
    destination: props.trip.data.end_address,
    travelMode: 'DRIVING'
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.KEY,
    libraries: librariesArray
  });

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setDirections(result);
    }
  }

  return (
    !isLoaded ? <div>Loading</div> :
      <div>
        <GoogleMap
          id='map'
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {!directionsResult ? <DirectionsService callback={directionsCallback} options={directionsRequest} /> : null}
          {!directionsResult ? null : <DirectionsRenderer directions={directionsResult} />}
          <></>
        </GoogleMap>
      </div>
  )
}

export default React.memo(TripMap)