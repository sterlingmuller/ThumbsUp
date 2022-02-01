import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteNavigator } from './components/siteNavigator.jsx';
import { NewUser } from './components/LoginAndSelection/newUser.jsx';
import { Login } from './components/LoginAndSelection/login.jsx';
import { RiderOrDriverSelection } from './components/LoginAndSelection/riderOrDriverSelection.jsx';
import { DriverAddTrip } from './components/DriverSelection/DiverOptions/driverAddTrip.jsx';
import { DriverTripSelection } from './components/DriverSelection/DiverOptions/driverTripSelection.jsx';
import { DriverPortal } from './components/DriverSelection/driverPortal.jsx';
import { RiderSearch } from './components/RiderSelection/NewRide/riderSearch.jsx';
import { SaveMeASeat } from './components/RiderSelection/NewRide/saveMeASeat.jsx';
import { RiderPaymentMethods } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderPaymentMethods.jsx';
import { RiderQuestionAndComments } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderQuestionAndComments.jsx';
import { RiderUpcomingTripDetails } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTripDetails.jsx';
import { TripHistory } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/tripHistory.jsx';
import { RiderUpcomingTrips } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTrips.jsx';
import { RiderMenu } from './components/RiderSelection/RiderHamburgerModal/riderMenu.jsx';
import { RiderPortal } from './components/RiderSelection/riderPortal.jsx';
import { DriverTripHistory } from './components/DriverSelection/DiverOptions/driverTripHistory.jsx';
import { TripHistoryDetails } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/tripHistoryDetails.jsx';
import { PostTrip } from './components/RiderSelection/RiderHamburgerModal/MenuOptions/postTrip.jsx';


ReactDOM.render(
<BrowserRouter>
  <Routes>
     <Route path="/" element={<App />} />
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
    <Route path="riderPaymentMethods" element={<RiderPaymentMethods />} />
    <Route path="riderQuestionAndComments" element={<RiderQuestionAndComments />} />
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
</BrowserRouter>, document.getElementById('app'));


//  To add a new route, 

//  import { Link } from "react-router-dom";
 
//  at the top of your file, then wrap your button in a <Link></Link> like so:

//  <Link to="/riderSearch">
//       <button onClick={handleClick}>New Ride</button>
// </Link>

// change the "/" route to the path listed above in this index.js file

// fix to type in the url bar: https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually

