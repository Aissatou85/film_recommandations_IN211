import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Comment from '../entities/comments.js';
import commentsRouter from './comments.js';
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
    id:req.body.id,
    title: req.body.title,
    date: req.body.date,
    posterPath: req.body.posterPath,
    average: req.body.average,
    description: req.body.description
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
          message: 'Movie with id "${newMovie.id}" already exists',
        });
      } else {
        res.status(500).json({ message: 'Error while adding the Movie' });
      }
    });
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
    router.get('/update', async (req, res) => {
      try {
        const movieRepository = appDataSource.getRepository(Movie);
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a');
        const movies = response.data.results;
        const moviesToInsert= movieRepository.create(movies.map(movie => ({
          title: movie.title,
          date: movie.release_date,
          posterPath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          average: movie.vote_count,
          description: movie.overview

        })))
        await movieRepository.insert(moviesToInsert); 
        console.log('Films insérés avec succès dans la base de données.');
            res.status(200).send('Films insérés avec succès dans la base de données.');
        } catch (error) {
            console.error('Erreur lors de la récupération ou de l\'insertion des films:', error.message);
            res.status(500).send('Erreur lors de la récupération ou de l\'insertion des films.');
        }
    });
    router.get('/initialize', async (req, res) => {
      try {
        // Supprimer les commentaires tout en respectant les contraintes de clé étrangère
        await appDataSource.getRepository(Comment).createQueryBuilder().delete().execute();
    
        // Effacer la table des films
        await appDataSource.getRepository(Movie).createQueryBuilder().delete().execute();
    
        console.log("Toutes les entrées de la table 'Comment' ont été supprimées, avec ses références à la table 'Movie'.");
        console.log("Toutes les entrées de la table 'Movie' ont été supprimées.");
    
        res.status(200).send("Initialisation réussie.");
      } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
        res.status(500).send("Erreur lors de l'initialisation.");
      }
    });
    
    router.use('/:movieId/comments', commentsRouter);
    

export default router;