import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Comment from '../entities/comments.js';
import User from '../entities/user.js';
import axios from 'axios';
import { getRepository } from 'typeorm';


const commentsRouter = express.Router({ mergeParams: true });


commentsRouter.post('/', async(req,res) => {
    const { movieId } = req.params;
    const { userId, text } = req.body;
    
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.create({
          movieId: { id_m: movieId},
          userId: {id_u: userId},
          text: text
        });
        await commentRepository.save(comment);
        res.status(201).json(comment);
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).send("Erreur lors de l'ajout du commentaire.");
      }
    });
    
    commentsRouter.get('/', async (req, res) => {
      const { movieId } = req.params;
    
      try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comments = await commentRepository.find({ where: { movieId: movieId } });
        res.status(200).json(comments);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        res.status(500).send("Erreur lors de la récupération des commentaires.");
      }
    });

  export default commentsRouter;