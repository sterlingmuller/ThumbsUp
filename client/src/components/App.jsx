import React, { useState, useEffect, useContext } from 'react';
import RouteComponent from '../RouteComponent.jsx';
import { MainContext } from '../contexts/MainContext.js'
import { SiteNavigator } from './siteNavigator.jsx';
import { NewUser } from './LoginAndSelection/newUser.jsx';
import { Login } from './LoginAndSelection/login.jsx';
import { RiderOrDriverSelection } from './LoginAndSelection/riderOrDriverSelection.jsx';
import { DriverAddTrip } from './DriverSelection/DiverOptions/driverAddTrip.jsx';
import { DriverTripSelection } from './DriverSelection/DiverOptions/driverTripSelection.jsx';
import { DriverPortal } from './DriverSelection/driverPortal.jsx';
import { RiderSearch } from './RiderSelection/NewRide/riderSearch.jsx';
import { SaveMeASeat } from './RiderSelection/NewRide/saveMeASeat.jsx';
import { RiderUpcomingTripDetails } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTripDetails.jsx';
import { TripHistory } from './tripHistory.jsx';
import { RiderUpcomingTrips } from './RiderSelection/RiderHamburgerModal/MenuOptions/riderUpcomingTrips.jsx';
import { RiderMenu } from './RiderSelection/RiderHamburgerModal/riderMenu.jsx';
import { RiderPortal } from './RiderSelection/riderPortal.jsx';
import { TripHistoryDetails } from './tripHistoryDetails.jsx';
import { PostTrip } from './RiderSelection/RiderHamburgerModal/MenuOptions/postTrip.jsx';


const App = () => {

  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('siteNavigator');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  // const [siteMap, setSiteMap] = useState(
  //   {
  //     'siteNavigator': <SiteNavigator />,
  //     'login': <Login />,
  //     'newUser': <NewUser />,
  //     'riderOrDriver': <RiderOrDriverSelection />,
  //     'driverAddTrip': <DriverAddTrip />,
  //     'driverTripHistory': <DriverTripHistory />,
  //     'driverTripSelection': <DriverTripSelection />,
  //     'driverPortal': <DriverPortal />,
  //     'riderSearch': <RiderSearch />,
  //     'saveMeASeat': <SaveMeASeat />,
  //     'riderPaymentMethods': <RiderPaymentMethods />,
  //     'riderQuestionAndComments': <RiderQuestionAndComments />,
  //     'riderUpcomingTripDetails': <RiderUpcomingTripDetails />,
  //     'tripHistory': <TripHistory />,
  //     'riderUpcomingTrips': <RiderUpcomingTrips />,
  //     'riderMenu': <RiderMenu />,
  //     'riderPortal': <RiderPortal />,
  //     'tripHistoryDetials': <TripHistoryDetails />,
  //     'postTrip': <PostTrip />

  //   });


  return (
    <div className="mainContainer">
      <MainContext.Provider value={{
        userId, setUserId,
        currentPage, setCurrentPage,
        // siteMap, setSiteMap,
        currentUser, setCurrentUser,
        selectedTrip, setSelectedTrip,
        currentChat, setCurrentChat
      }}>


        {/* {siteMap[currentPage]} */}
        <RouteComponent />
      </MainContext.Provider>
    </div>
  );


}

export default App;


