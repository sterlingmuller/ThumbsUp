import React, { useState, useEffect, useRef, useCallback} from 'react'
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, StandaloneSearchBox} from '@react-google-maps/api';

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
  let [DirectionsResult, setDirections] = useState(undefined);
  let [newTrip, setNewTrip] = useState({});
  let [startPoint, setStartPoint] = useState('');
  let [endPoint, setEndPoint] = useState('');
  let [directionsRequest, setRequest] = useState({
    origin: '233 S Wacker Dr, Chicago, IL 60606',
    destination: 'Los Angeles, CA',
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(Date.now()),
      trafficModel: 'optimistic'
    }
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB9OONxUCodrHTc9ivWR-gigt2TaP0BqD4",
    libraries: librariesArray
  });

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      console.log(result);
      setDirections(result);
    }
  }

  const renderDirections = () => {
    setRequest({...directionsRequest, origin: startPoint.formatted_address, destination: endPoint.formatted_address})
  }

  const onStartLoad = ref => setStartPoint(ref);

  const onEndLoad = ref => setEndPoint(ref);

  const onStartChanged = () => setStartPoint(startPoint.getPlaces());

  const onEndChanged = () => setEndPoint(endPoint.getPlaces());

  return (
    !isLoaded? <div>Loading</div>:
    <div>
      {console.log('Loading load script', startPoint, endPoint)}
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
      <button>Get Directions</button>
      <button onClick={null}>Add Trip</button>
    </div>
  )
}

export default React.memo(DriverTripMap)