import logo from './logo.svg';
import './Home.css';
import React, {useEffect, useState} from 'react';


function Home() {
  const [movieName, setMovieName] = useState('');
  const[Movies, getMovieList] = useState('');
  useEffect(() => {
    console.log("test");
  });
  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
  
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
      </header>
    </div>
  );
}

export default Home;
