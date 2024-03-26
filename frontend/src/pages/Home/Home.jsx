import logo from './logo.svg';
import './Home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const useFetchMovies = () => {
  const[Movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a')
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching Movies.');
        console.error(error);
      });
  }, []);
  return {Movies, moviesLoadingError};
};

function Home() {
  const [movieName, setMovieName] = useState('');
  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
  const {Movies, moviesLoadingError } = useFetchMovies();
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <input type = "text" id="lname" name="lname" value = {movieName} onChange = {handleMovieNameChange} placeholder='Enter movie name'></input>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>The movie is : {movieName}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2>Liste des films populaires</h2>
        <ul>
          {Movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Home;
