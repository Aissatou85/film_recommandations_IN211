import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

function Movie() {
    const[Movies, setMovies] = useState([]);
    const [moviesLoadingError, setMoviesLoadingError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(Movies);
    const [noResults, setNoResults] = useState(false);
    
    useEffect(() => {
      axios
        .get('https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a')
        .then((response) => {
          setMovies(response.data.results);
          setFilteredMovies(Movies);
        })
        .catch((error) => {
          setMoviesLoadingError('An error occured while fetching Movies.');
          console.error(error);
        });
    }, []);
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Filtrer les films en fonction de la requête de recherche
        const filtered = Movies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filtered);
        setNoResults(filtered.length == 0);
    };

    return (
        <div>
            <header>
                <h1>Liste des films populaires</h1>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </header>
            <ul>
                {/* Afficher les films filtrés */}
                {noResults ? (
                    <p>Aucun résultat trouvé.</p>
                ) : (
                    filteredMovies.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>Date de sortie : {movie.release_date}</p>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    </li>
                )))}
            </ul>
        </div>
    )
  }


export default Movie;