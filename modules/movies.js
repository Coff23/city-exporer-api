'use strict';

const axios = require('axios');

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

async function getMovies(req, res, next) {
  try {
    let city = req.query.city;
    console.log(city);

    let movieUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    let foundMovie = await axios.get(movieUrl);

    let movieToSend = foundMovie.data.results.map(obj => new Movie(obj));

    res.status(200).send(movieToSend);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovies
};

