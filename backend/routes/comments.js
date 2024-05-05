import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import Comment from '../entities/comments.js';
import User from '../entities/user.js';
import axios from 'axios';


const router = express.Router();


router.post('/movies/:movieId/comments', async(req,res) => {
    const { movieId } = req.params;
    const { userId, text } = req.body;
    try {
        const comment = await Comment.create({
          movieId: movieId,
          userId: userId,
          text: text
        }).save();
    
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).send("Erreur lors de l'ajout du commentaire.");
      }
    });
    
    router.get('/movies/:movieId/comments', async (req, res) => {
      const { movieId } = req.params;
    
      try {
        // Récupérer tous les commentaires associés au film spécifié
        const comments = await Comment.find({ where: { movieId: movieId } });
        res.status(200).json(comments);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        res.status(500).send("Erreur lors de la récupération des commentaires.");
      }
    });