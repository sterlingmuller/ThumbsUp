import React, { useState } from 'react';
import RouteComponent from '../RouteComponent.jsx';
import { MainContext } from '../contexts/MainContext.js'

const App = () => {

  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('siteNavigator');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className="mainContainer">
      <MainContext.Provider value={{
        userId, setUserId,
        currentPage, setCurrentPage,
        currentUser, setCurrentUser,
        selectedTrip, setSelectedTrip,
        currentChat, setCurrentChat
      }}>
        <RouteComponent />
      </MainContext.Provider>
    </div>
  );
}
export default App;


