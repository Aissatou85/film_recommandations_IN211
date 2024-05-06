import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Movie.css';

import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send';

import AddUserForm from '../AddUserForm/AddUserForm.jsx';

function Movie() {
  const[movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [noResults, setNoResults] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [commentSection, setCommentSection] = useState(false);
  const [movieName, setMovieName] = useState("popular");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const scrollRef = useRef(null);
  const [showOptionsMovie, setShowOptionsMovie] = useState(false);
  const [showOptionsSeries, setShowOptionsSeries] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [signUp, setSignUp] = useState(false);

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

  const fetchComments = (movieId) => {
    axios
      .get(`http://localhost:8081/api/movies/${movieId}/comments`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const addCommentToMovie = (movieId, userId, commentText) => {
    // Préparez les données du commentaire
    const commentData = {
      movieId: movieId,
      userId: userId,
      text: commentText
    };
  
    // Effectuez la requête POST à l'API pour ajouter le commentaire
    axios.post(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}/comments`, commentData)
      .then(() => {
        // En cas de succès, affichez un message de succès (vous pouvez définir cette fonction)
        displayCommentSuccessMessage();
        // Effacez le champ du commentaire après l'ajout
        clearCommentTextArea();
      })
      .catch((error) => {
        // En cas d'erreur, gérez l'erreur et affichez un message approprié à l'utilisateur
        console.error('An error occurred while adding comment:', error);
        handleCommentError();
      });
  };
  
  const handleCommentChange = (event) => {
    // Update the commentText state with the input value from the textarea
    setCommentText(event.target.value);
  };

  const handleSendComment = (movieId, userId) => {
    // Call the addCommentToMovie function to send the comment to the database
    // Pass the movieId, userId, and commentText as arguments to the function
    addCommentToMovie(movieId, userId, commentText);
    // Clear the textarea after sending the comment
    setCommentText('');
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    container.scrollLeft += container.clientWidth / 4; // Scroll by the width of the container
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    container.scrollLeft -= container.clientWidth / 4; // Scroll by the width of the container
  };

  const handleClickMovie = (movie) => {
    setSelectedMovie(movie);
    fetchComments(movie.id_m);
    console.log(movie);
  };

  const handleLeaveMovie = () => {
    setSelectedMovie(null);
  };
  
  const handleCommentSection = () => {
    setCommentSection(!commentSection);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDay();
  
    // Returning formatted date
    return `${day}/${month}/${year}`;
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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleUserClick = () => {
    toggleOptions();
  };

  const handleConnection = () => {
    setUserConnected(!userConnected);
  };

  const handleSignUp = () => {
    setSignUp(!signUp);
  };
 

  return (
    <div className="Home">
      {/* <Header/> */}
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
        </div>
        <div className='containerSearchUser'>
          <div className='search'>
            <form className='searchContainer' action="">
              <input className='inputSearch' type="search" required
              value={searchQuery}
              onChange={handleSearchChange} />
              <button className="fa fa-search" onClick={handleSubmitSearch}>
                <SearchIcon className='icon' />
              </button> 
            </form>
          </div>
          <div className='user' onClick={handleUserClick}>
            <img />
          </div>
          {showOptions && (
            <div className='optionsUser'>
              {userConnected ? (
                <>
                  <button className='addMovie'>Add Movie</button>
                  <button onClick={handleConnection} className='connect'>Disconnect</button>
                </>
              ) : (
                <>
                  <button onClick={handleConnection} className='connect'>Sign in</button>
                  <button className='signUp' onClick={handleSignUp}>Sign up</button>
                  {/* {signUp && <AddUserForm />} */}
                </>
                
              )}
            </div>
          )}
        </div>
      </div>
      <div className="scroll-container">
      {signUp && <AddUserForm />}
        <h1>Movies in our theaters</h1>
        <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
        <div className="Home-horizontal-scroll" ref={scrollRef}>
          { filteredMovies.map(movie => (
            <div className="MovieItem" key={movie.id} onClick={() => handleClickMovie(movie)}>
              <img src={movie.posterPath} alt={movie.title} />
              <div className="Movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
      </div>
      {signUp && 
      <div>
        <AddUserForm />
      </div>}
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
                <p>{formatDate(selectedMovie.date)}</p>
                <p style={{fontWeight:'700'}}>Vote Average:</p>
                <p>{scaleVoteAverage(selectedMovie.average)}</p> 
                <p style={{fontWeight:'700'}}>Overview:</p>
                <p style={{fontSize:'16px', textAlign:'left', padding:'0.5rem'}}>{selectedMovie.overview}</p>      
                <p style={{fontSize:'16px'}}>{selectedMovie.description}</p>      
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
              <div className='commentContainer'>
                { comments.map(comment => (
                <div className='comment' key={comment.id}>
                  <div className='userImgComment'>
                    {/* <img/> */}
                  </div> 
                  <div  className='commentText'>
                    <p>{comment.text}</p>
                  </div>
                </div>
                ))}
              </div>
              <div className='commentInsertion'>
                <textarea
                  placeholder='What are your thoughts?'
                  className='inputComment'
                  value={commentText} // Bind the textarea value to the commentText state
                  onChange={handleCommentChange} // Handle changes in the textarea
                />
                <button className='sendComment' onClick={handleSendComment}>
                  <SendIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Movie;