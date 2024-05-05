import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

function Movie() {
    const[Movies, setMovies] = useState([]);
    const [moviesLoadingError, setMoviesLoadingError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(Movies);
    const [noResults, setNoResults] = useState(false);
    const [sortBy, setSortBy] = useState('title');
    
    useEffect(() => {
      axios
        .get('http://localhost:8081/api/movies')
        .then((response) => {
          setMovies(response.data.movies);
          setFilteredMovies(response.data.movies);
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
    const handleSortChange = (event) => {
        const sortByValue = event.target.value;
        setSortBy(sortByValue);
        const sorted = [...filteredMovies].sort((a, b) => {
                if (a[sortByValue] < b[sortByValue]) return -1;
                if (a[sortByValue] > b[sortByValue]) return 1;
                return 0;
        });
        setFilteredMovies(sorted);
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
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="title">Titre</option>
                    <option value="date">Date de sortie</option>
                </select>

            </header>
            <ul>
                {/* Afficher les films filtrés */}
                {noResults ? (
                    <p>Aucun résultat trouvé.</p>
                ) : (
                    filteredMovies.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>Date de sortie : {movie.date}</p>
                        <img src={movie.posterPath} alt={movie.title} />
                    </li>
                )))}
            </ul>
        </div>
    )
  }


export default Movie;