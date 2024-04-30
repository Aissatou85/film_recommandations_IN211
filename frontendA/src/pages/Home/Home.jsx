import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function Home() {
  const[movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [noResults, setNoResults] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [commentSection, setCommentSection] = useState(false);
  const [movieName, setMovieName] = useState("popular");
  const scrollRef = useRef(null);
  const [showOptionsMovie, setShowOptionsMovie] = useState(false);
  const [showOptionsSeries, setShowOptionsSeries] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/movies')
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
      const filtered = movies.filter(movie =>
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

  const scrollRight = () => {
    const container = scrollRef.current;
    container.scrollLeft += container.clientWidth / 4; // Scroll by the width of the container
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    container.scrollLeft -= container.clientWidth / 4; // Scroll by the width of the container
  };

  // const handleChange = (e) => {
  //   const searchItem = e.target.value;
  //   setMovieName(searchItem);
  // };

  const handleClickMovie = (movie) => {
    setSelectedMovie(movie);
    const img = new Image();
  img.onload = function() {
    console.log("Image size:", img.naturalWidth, "x", img.naturalHeight);
  };
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  };

  const handleLeaveMovie = () => {
    setSelectedMovie(null);
  };
  
  const handleCommentSection = () => {
    setCommentSection(!commentSection);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date in the local date format
  };

  const scaleVoteAverage = (voteAverage) => {
    // Scale the vote average from 0 to 5
    return (voteAverage / 2).toFixed(1); // Assuming the vote average is out of 10, so dividing by 2
  };

  
  const handleMouseEnterMovie = () => {
    setShowOptionsMovie(true);
  };

  const handleMouseLeaveMovie = () => {
    setShowOptionsMovie(false);
  };

  const handleMouseEnterSeries = () => {
    setShowOptionsSeries(true);
  };

  const handleMouseLeaveSeries = () => {
    setShowOptionsSeries(false);
  };

  const handleSubmitSearch = () => {
    console.log("search");
  }
  

  return (
    
    <div className="Home">
      <div className='header'>
      <Link to='/'>
        <LocalActivityIcon styles={{ fontSize: '64px' }} className='logo' />
      </Link>
      <div className='index'>

        <Link className='item' onMouseEnter={handleMouseEnterMovie} onMouseLeave={handleMouseLeaveMovie}>
          <span>Movies</span>

          {showOptionsMovie && (
            <div className='options'>
              <Link to='/option1' className='option'>Best Movies</Link>
              <Link to='/option2' className='option'>Option 2</Link>
              <Link to='/option3' className='option'>Option 3</Link>
            </div>
          )}
        </Link>
        <Link className='item' onMouseEnter={handleMouseEnterSeries} onMouseLeave={handleMouseLeaveSeries}>
          Series
          {showOptionsSeries && (
            <div className='options'>
              <Link to='/option1' className='option'>Option 1</Link>
              <Link to='/option2' className='option'>Option 2</Link>
              <Link to='/option3' className='option'>Option 3</Link>
            </div>
          )}
        </Link>
      </div>
      <div className='containerSearchUser'>
        <div className='search'>
          <form action="">
            <input type="search" required
            value={searchQuery}
            onChange={handleSearchChange} />
             <button class="fa fa-search" onClick={handleSubmitSearch}>
              <SearchIcon className='icon' />
            </button> 

          </form>
        </div>

        <div className='user'>
          <img />
        </div>

      </div>
    </div>
      <div className="scroll-container">
        <h1>Movies in our theaters</h1>
        <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
        <div className="Home-horizontal-scroll" ref={scrollRef}>
          { filteredMovies.map(movie => (
            <div className="MovieItem" key={movie.id} onClick={() => handleClickMovie(item)}>
              <img src={movie.posterPath} alt={movie.title} />
              <div className="Movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
      </div>
      {selectedMovie && (
        <div className="overlay">
          <div className="movie">
            <div className='xIcon' onClick={handleLeaveMovie}>
              <CloseIcon />
            </div>
            <img className="movie-image" src={selectedMovie.posterPath} alt={selectedMovie.title} />
            <div className='move-details'>
              <div className="movie-info">
                <h2>{selectedMovie.title}</h2>
                <p style={{fontWeight:'700'}}>Release Date:</p>
                <p>{formatDate(selectedMovie.release_date)}</p>
                <p style={{fontWeight:'700'}}>Vote Average:</p>
                {/* <p>{scaleVoteAverage(selectedMovie.vote_average)}</p> */}
                <p style={{fontWeight:'700'}}>Overview:</p>
<<<<<<< Updated upstream
                <p style={{fontSize:'16px', textAlign:'left', padding:'0.5rem'}}>{selectedMovie.overview}</p>      
=======
                {/* <p style={{fontSize:'16px'}}>{selectedMovie.overview}</p>       */}
>>>>>>> Stashed changes
              </div> 
              <div className='icons'>
                <button className='icon-circle' onClick={handleCommentSection}>
                  <CommentIcon />
                </button>
                <div className='icon-circle'>
                  <ThumbDownIcon />
                </div>
                <div className='icon-circle'>
                  <ThumbUpIcon />
                </div>
              </div>         
            </div>
          </div>
          {commentSection && (
            <div className='commentSection'>
              <div className='comment'>
                <div className='userImgComment'>
                  {/* <img/> */}
                </div>
                <div className='commentText'>
                  <p>ashjbdbasbasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddhj</p>
                </div>
                
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home;

