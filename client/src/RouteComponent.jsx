import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SiteNavigator } from './components/siteNavigator.jsx';
import { NewUser } from './components/LoginAndSelection/newUser.jsx';
import { Login } from './components/LoginAndSelection/login.jsx';
import { RiderOrDriverSelection } from './components/LoginAndSelection/riderOrDriverSelection.jsx';
import { DriverAddTrip } from './components/DriverSelection/DiverOptions/driverAddTrip.jsx';
import { DriverTripSelection } from './components/DriverSelection/DiverOptions/driverTripSelection.jsx';
import { DriverPortal } from './components/DriverSelection/driverPortal.jsx';
import { RiderSearch } from './components/RiderSelection/NewRide/riderSearch.jsx';
import { SaveMeASeat } from './components/RiderSelection/NewRide/saveMeASeat.jsx';
import { RiderUpcomingTripDetails } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTripDetails.jsx';
import { TripHistory } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/tripHistory.jsx';
import { RiderUpcomingTrips } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTrips.jsx';
import { RiderMenu } from './components/RiderSelection/RiderHamburgerModal/riderMenu.jsx';
import { RiderPortal } from './components/RiderSelection/riderPortal.jsx';
import { DriverTripHistory } from './components/DriverSelection/DiverOptions/driverTripHistory.jsx';
import { TripHistoryDetails } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/tripHistoryDetails.jsx';
import { PostTrip } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/postTrip.jsx';

const RouteComponent = () => {
return (
<BrowserRouter>
  <Routes>
     <Route path="/" element={<Login />} />
    <Route path="siteNavigator" element={<SiteNavigator />} />
    <Route path="login" element={<Login />} />
    <Route path="newUser" element={<NewUser />} />
    <Route path="riderOrDriver" element={<RiderOrDriverSelection />} />
    <Route path="driverAddTrip" element={<DriverAddTrip />} />
    <Route path="driverTripHistory" element={<DriverTripHistory />} />
    <Route path="driverTripSelection" element={<DriverTripSelection />} />
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
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Routes>

  <div>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem"
            }}
          >
            <Link to="/siteNavigator">siteNavigator</Link> |{" "}
            <Link to="/login">login</Link>|{" "}
            <Link to="/newUser">newUser</Link> |{" "}
            <Link to="/riderOrDriver">riderOrDriver</Link>|{" "}
            <Link to="/driverAddTrip">driverAddTrip</Link> |{" "}
            <Link to="/driverTripHistory">driverTripHistory</Link>|{" "}
            <Link to="/driverTripSelection">driverTripSelection</Link>|{" "}
            <Link to="/driverPortal">driverPortal</Link> |{" "}
            <Link to="/riderSearch">riderSearch</Link>|{" "}
            <Link to="/saveMeASeat">saveMeASeat</Link> |{" "}
            <Link to="/riderPaymentMethods">riderPaymentMethods</Link>|{" "}
            <Link to="/riderQuestionAndComments">riderQuestionAndComments</Link> |{" "}
            <Link to="/riderUpcomingTripDetails">riderUpcomingTripDetails</Link>|{" "}
            <Link to="/tripHistory">tripHistory</Link> |{" "}
            <Link to="/riderUpcomingTrips">riderUpcomingTrips</Link>|{" "}
            <Link to="/riderMenu">riderMenu</Link> |{" "}
            <Link to="/riderportal">riderPortal</Link>|{" "}
            <Link to="/tripHistoryDetails">tripHistoryDetails</Link> |{" "}
            <Link to="/postTrip">postTrip</Link>
          </nav>
        </div>
</BrowserRouter>
)
}

export default RouteComponent;