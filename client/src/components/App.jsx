import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContext.js'
import { SiteNavigator } from './siteNavigator.jsx';
import { NewUser } from './LoginAndSelection/newUser.jsx';
import { Login } from './LoginAndSelection/login.jsx';
import { RiderOrDriverSelection } from './LoginAndSelection/riderOrDriverSelection.jsx';
import { DriverAddTrip } from './DriverSelection/DiverOptions/driverAddTrip.jsx';
import { DriverTripSelection } from './DriverSelection/DiverOptions/driverTripSelection.jsx';
import { DriverPortal } from './DriverSelection/driverPortal.jsx';
import { RiderSearch } from './RiderSelection/NewRide/riderSearch.jsx';
import { SaveMeASeat } from './RiderSelection/NewRide/saveMeASeat.jsx';
import { RiderPaymentMethods } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderPaymentMethods.jsx';
import { RiderQuestionAndComments } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderQuestionAndComments.jsx';
import { RiderUpcomingTripDetails } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTripDetails.jsx';
import { TripHistory } from './RiderSelection/RiderHamburgerModal/MenuOptions/tripHistory.jsx';
import { RiderUpcomingTrips } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTrips.jsx';
import { RiderMenu } from './RiderSelection/RiderHamburgerModal/riderMenu.jsx';
import { RiderPortal } from './RiderSelection/riderPortal.jsx';
import { DriverTripHistory } from './DriverSelection/DiverOptions/driverTripHistory.jsx';
import { TripHistoryDetails } from './RiderSelection/RiderHamburgerModal/MenuOptions/tripHistoryDetails.jsx';
import { PostTrip } from './RiderSelection/RiderHamburgerModal/MenuOptions/postTrip.jsx';
import { Routes, Route, Outlet, Link } from "react-router-dom";

const App = () => {
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('siteNavigator');
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [siteMap, setSiteMap] = useState(
      { 'siteNavigator' : <SiteNavigator />,
        'login'         : <Login />,
        'newUser'       : <NewUser />,
        'riderOrDriver' : <RiderOrDriverSelection/>,
        'driverAddTrip' : <DriverAddTrip />,
        'driverTripHistory' : <DriverTripHistory />,
        'driverTripSelection' : <DriverTripSelection/>,
        'driverPortal'    : <DriverPortal />,
        'riderSearch'     : <RiderSearch />,
        'saveMeASeat'     : <SaveMeASeat />,
        'riderPaymentMethods' : <RiderPaymentMethods />,
        'riderQuestionAndComments' : <RiderQuestionAndComments />,
        'riderUpcomingTripDetails': <RiderUpcomingTripDetails />,
        'tripHistory': <TripHistory />,
        'riderUpcomingTrips': <RiderUpcomingTrips />,
        'riderMenu'       : <RiderMenu />,
        'riderPortal'     : <RiderPortal />,
        'tripHistoryDetials': <TripHistoryDetails />,
        'postTrip': <PostTrip />

    });

    function Layout() {
      return (
        <div>
          {/* A "layout route" is a good place to put markup you want to
              share across all the pages on your site, like navigation. */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/nothing-here">Nothing Here</Link>
              </li>
            </ul>
          </nav>
    
          <hr />
    
          {/* An <Outlet> renders whatever child route is currently active,
              so you can think about this <Outlet> as a placeholder for
              the child routes we defined above. */}
          <Outlet />
        </div>
      );
    }

     return(
       <div className="mainContainer">
          <MainContext.Provider value={{
                userId, setUserId,
                currentPage, setCurrentPage,
                siteMap, setSiteMap,
                currentUser, setCurrentUser,
                selectedTrip, setSelectedTrip
              }}>
                {
                siteMap[currentPage]}
                 <div>
      <h1>Thumbs Up!</h1>
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





          </MainContext.Provider>
       </div>
     );


}

export default App;


