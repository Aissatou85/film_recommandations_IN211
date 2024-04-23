
import './AddMovie.css';
import React, {useEffect, useState} from 'react';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';


function AddMovie() {
  return (
    <div className="App">
      <header className="App-header">
        <AddMovieForm />
      </header>
    </div>
  );
}

export default AddMovie;
