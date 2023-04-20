'use strict';

// require is like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
// variable of app === server
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`port: ${PORT}`));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my server!');
});

app.get('/forecast', async (req, res, next) => {

  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}`;

    let foundCity = await axios.get(url);

    console.log('lat', lat, 'lon', lon, 'searchQuery', searchQuery);
    let dataToSend = foundCity.data.data.map(newWeather => new Forecast(newWeather));
    res.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

});

app.get('/movies', async (req, res, next) => {
  try {
    let city = req.query.city;
    console.log(city);

    let movieUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${city}`;

    let foundMovie = await axios.get(movieUrl);

    let movieToSend = foundMovie.data.results.map(obj => new Movie(obj));

    res.status(200).send(movieToSend);

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

class Movie {
  constructor(movieObj) {
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.avgVotes = movieObj.vote_average;
    this.totalVotes = movieObj.vote_count;
    this.imgUrl = movieObj.poster_path;
    this.popularity = movieObj.popularity;
    this.releaseDate = movieObj.release_date;
  }
}
