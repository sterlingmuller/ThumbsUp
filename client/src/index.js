import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';



ReactDOM.render(
<App />, document.getElementById('app'));


//  To add a new route, 

//  import { Link } from "react-router-dom";
 
//  at the top of your file, then wrap your button in a <Link></Link> like so:

//  <Link to="/riderSearch">
//       <button onClick={handleClick}>New Ride</button>
// </Link>

// change the "/" route to the path listed above in this index.js file

// fix to type in the url bar: https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually


// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/index.html')))