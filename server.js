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

app.listen(PORT, () => console.log(`port: ${PORT}`));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my server!');
});

app.get('/weather', (req, res, next) => {
  
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;
    
    class Forecast {
      constructor(cityObj) {
        // this.description = `Low of ${cityObj.data[0].low_temp}, high of ${cityObj.data[0].high_temp} with ${cityObj.data[0].weather.description}`;
        this.valid_date = cityObj.data[0].valid_date;
      }
    }

    let foundCity = weatherData.find(city => (city.city_name === searchQuery) || (city.lon === lon) || (city.lat === lat));
    let dataToSend = new Forecast(foundCity);
    res.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

});
