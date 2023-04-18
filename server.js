'use strict';

// require is like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let weatherData = require('./data/weather.json');

// variable of app === server
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', (req, res, next) => {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    class City {
      constructor(cityObj) {
        this.lat = cityObj.lat;
        this.lon = cityObj.lon;
      }
    }
    let foundCity = weatherData.find(city => city_name.city === searchQuery);
  } catch (error) {
    next(error);
  }
});