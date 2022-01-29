const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Router
var router = require('./routes.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));



// Set up message route
app.use(router);

app.listen(PORT, () => {console.log(`I'm listening on PORT: ${PORT}`)});