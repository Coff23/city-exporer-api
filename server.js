'use strict';

// require is like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { getWeather } = require('./modules/weather');
const { getMovies } = require('./modules/movies');


app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`port: ${PORT}`));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my server!');
});

app.get('/forecast', (req, res) => {
  getWeather(req, res).catch(error => console.error(error));
});

app.get('/movies', (req, res) => {
  getMovies(req, res).catch(error => console.error(error));
});
