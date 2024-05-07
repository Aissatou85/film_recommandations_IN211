import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import moviesRouter from './routes/movies.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
import path from 'path';

const apiRouter = express.Router();

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    apiRouter.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/movies', moviesRouter);

     app.use('/api', apiRouter);

    const publicPath = new URL("./public", import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
    });

    app.use(routeNotFoundJsonHandler); 
    app.use(jsonErrorHandler); 

    const port = parseInt(process.env.PORT || '8081');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
