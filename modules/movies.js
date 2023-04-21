'use strict';

const axios = require('axios');

let cache = {};

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
    let key = `${city}-city`;


    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      console.log('Cash was hit!', cache);
      res.status(200).send(cache[key].data);

    } else {
      console.log('Cache was missed!');
      let movieUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

      let foundMovie = await axios.get(movieUrl);

      let movieToSend = foundMovie.data.results.map(obj => new Movie(obj));

      cache[key] = {
        data: movieToSend,
        timestamp: Date.now()
      };

      res.status(200).send(movieToSend);

    }

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovies
};

