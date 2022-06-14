import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NewUser } from './components/LoginAndSelection/newUser.jsx';
import { Login } from './components/LoginAndSelection/login.jsx';
import { RiderOrDriverSelection } from './components/LoginAndSelection/riderOrDriverSelection.jsx';
import { DriverAddTrip } from './components/DriverSelection/DiverOptions/driverAddTrip.jsx';
import { DriverTripSelection } from './components/DriverSelection/DiverOptions/driverTripSelection.jsx';
import { DriverPortal } from './components/DriverSelection/driverPortal.jsx';
import { RiderSearch } from './components/RiderSelection/NewRide/riderSearch.jsx';
import { SaveMeASeat } from './components/RiderSelection/NewRide/saveMeASeat.jsx';
import { RiderUpcomingTripDetails } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTripDetails.jsx';
import { TripHistory } from './components/tripHistory.jsx';
import { RiderUpcomingTrips } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTrips.jsx';
import { RiderMenu } from './components/RiderSelection/RiderHamburgerModal/riderMenu.jsx';
import { RiderPortal } from './components/RiderSelection/riderPortal.jsx';
import { TripHistoryDetails } from './components/tripHistoryDetails.jsx';
import { PostTrip } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/postTrip.jsx';
import { ChatRoom } from './components/DriverSelection/DiverOptions/chatRoom.jsx';

const RouteComponent = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="newUser" element={<NewUser />} />
        <Route path="riderOrDriver" element={<RiderOrDriverSelection />} />
        <Route path="driverAddTrip" element={<DriverAddTrip />} />
        <Route path="driverTripSelection" element={<DriverTripSelection />} />
        <Route path="chatRoom" element={<ChatRoom />} />
        <Route path="driverPortal" element={<DriverPortal />} />
        <Route path="riderSearch" element={<RiderSearch />} />
        <Route path="saveMeASeat" element={<SaveMeASeat />} />
        <Route path="riderUpcomingTripDetails" element={<RiderUpcomingTripDetails />} />
        <Route path="tripHistory" element={<TripHistory />} />
        <Route path="riderUpcomingTrips" element={<RiderUpcomingTrips />} />
        <Route path="riderMenu" element={<RiderMenu />} />
        <Route path="riderportal" element={<RiderPortal />} />
        <Route path="tripHistoryDetails" element={<TripHistoryDetails />} />
        <Route path="postTrip" element={<PostTrip />} />
        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent;