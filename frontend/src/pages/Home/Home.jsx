import logo from './logo.svg';
import './Home.css';
import React, {useEffect, useState} from 'react';
import Movie from '../../components/Movie/Movie';


function Home() {
  /*const [movieName, setMovieName] = useState('');
  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
  */
  return (
    <div className="App">
      <header className="App-header">
        <Movie />
      </header>
    </div>
  );
}

export default Home;
