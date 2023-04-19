'use strict';

// require is like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');

// variable of app === server
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`port: ${PORT}`));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my server!');
});
// HTTP: http://api.weatherbit.io/v2.0/forecast/daily?key={}units={I}
app.get('/forecast', (req, res, next) => {

  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    console.log('lat', lat, 'lon', lon, 'searchQuery', searchQuery);


    let foundCity = weatherData.find(city => (city.city_name === searchQuery) || (city.lon === lon) || (city.lat === lat));
    let dataToSend = foundCity.data.map(newWeather => new Forecast(newWeather));
    res.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

});

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.datetime;
    this.description = cityObj.weather.description;
    this.low_temp = cityObj.low_temp;
    this.high_temp = cityObj.high_temp;
  }
}
