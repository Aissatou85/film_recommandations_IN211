import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import axios from 'axios';

const router = express.Router();

router.get('/', function (req, res) {
    appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    })
    .catch(function (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching the list of movies'});
    })
  });

router.post('/new', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    const newMovie = movieRepository.create({
    id: req.body.id,
    title: req.body.title,
    date: req.body.date,
    });

    movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json({
        message: "Movie succesfully added ",
        document : newDocument
    })
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with id "${newMovie.id}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the Movie' });
      }
    });
    router.delete('/:id', function (req, res) {
        appDataSource
          .getRepository(Movie)
          .delete({ id: req.params.id })
          .then(function () {
            res.status(204).json({ message: 'Movie successfully deleted' });
          })
          .catch(function () {
            res.status(500).json({ message: 'Error while deleting the Movie' });
          });
      });
      async function fetchMoviesFromAPI(){
        axios
        .get('https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a')
        .then((response) => {
            movieRepository
            .insert(response.data);
        })
      }
      
});

export default router;