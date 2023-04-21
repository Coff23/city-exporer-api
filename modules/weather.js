'use strict';

const axios = require('axios');

let cache = {};


class Forecast {
  constructor(cityObj) {
    this.date = cityObj.datetime;
    this.description = cityObj.weather.description;
    this.low_temp = cityObj.low_temp;
    this.high_temp = cityObj.high_temp;
  }
}
// TODO: create a key for each query
// TODO: if the results exist AND they are within a valid timeframe... send that data from the cache
// TODO: if the results do not exist, hit API, and then add that info to the cache

async function getWeather(req, res, next) {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;
    let key = `lat:${lat}-lon:${lon}-weather`;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      console.log('Cash was hit!', cache);
      res.status(200).send(cache[key].data);

    } else {
      console.log('Cache was missed!');
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}`;

      let foundCity = await axios.get(url);

      console.log('lat', lat, 'lon', lon, 'searchQuery', searchQuery);
      let dataToSend = foundCity.data.data.map(newWeather => new Forecast(newWeather));

      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      };

      res.status(200).send(dataToSend);
    }





  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWeather
};
