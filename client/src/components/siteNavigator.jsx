import React, { useState, useEffect, useContext, Fragment} from 'react';
import {MainContext} from '../contexts/MainContext.js'



export const SiteNavigator = () => {
const {currentPage, setCurrentPage,siteMap, setSiteMap} = useContext(MainContext);
   return(
    <Fragment>
      {Object.keys(siteMap).map((onePage)=>{
        return(
          <span className ='siteNavigatorSquare' onClick={() => { setCurrentPage(onePage) }}>
            {onePage}
          </span>
        );
      })}
    </Fragment>
   );

}

