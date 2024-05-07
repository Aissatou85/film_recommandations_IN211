import React, { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  title: '',
  date: '',
  average: '',
  description: '',
  // posterPath: ''
};

const useSaveMovie = () => {
  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie added successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event, formValues, setFormValues) => {
    event.preventDefault();
    setMovieCreationError(null);

    if (formValues.title === '') {
      console.error('Missing title, this field is required');
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setMovieCreationError('An error occurred while adding a new movie.');
        console.error(error);
      });
  };

  return { saveMovie, movieCreationError, movieCreationSuccess };
};

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveMovie, movieCreationError, movieCreationSuccess } = useSaveMovie();

  return (
    <div>
      <form
        className="formAddMovie"
        onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
      >
        <input
          type="title"
          placeholder="Title"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        />
        <input
          type="number"
          placeholder="Average"
          value={formValues.average}
          onChange={(event) =>
            setFormValues({ ...formValues, average: event.target.value })
          }
        />
        {/* <input
          type="number"
          placeholder="Poster Path"
          value={formValues.posterPath}
          onChange={(event) =>
            setFormValues({ ...formValues, posterPath: event.target.value })
          }
        /> */}
        <textarea
          placeholder="Description"
          value={formValues.description}
          onChange={(event) =>
            setFormValues({ ...formValues, description: event.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date"
          value={formValues.date}
          onChange={(event) =>
            setFormValues({ ...formValues, date: event.target.value })
          }
        />
        <button type="submit">
          Add Movie
        </button>
      </form>
      {movieCreationSuccess !== null && (
        <div className="movie-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError !== null && (
        <div className="movie-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
