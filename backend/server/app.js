if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const port = process.env.PORT || 3000;
const app = express();

// Router
const router = require('./routes.js');
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
app.use(session({
  secret: process.env.SECRET,
  cookie: {maxAge: 8640000},
  saveUninitialized: false,
  resave: false
}));
// Set up routes
app.use(router);

//passport session
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {console.log(`I'm listening on PORT: ${port}`)});