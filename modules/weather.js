'use strict';

const axios = require('axios');

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.datetime;
    this.description = cityObj.weather.description;
    this.low_temp = cityObj.low_temp;
    this.high_temp = cityObj.high_temp;
  }
}

async function getWeather(req, res, next) {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}`;

    let foundCity = await axios.get(url);

    console.log('lat', lat, 'lon', lon, 'searchQuery', searchQuery);
    let dataToSend = foundCity.data.data.map(newWeather => new Forecast(newWeather));
    res.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWeather
};
