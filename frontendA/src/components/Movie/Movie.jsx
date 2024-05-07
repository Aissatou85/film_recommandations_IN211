import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Movie.css';

import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

import AddUserForm from '../AddUserForm/AddUserForm.jsx';
import AddMovieForm from '../AddMovieForm/AddMovieForm.jsx';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [commentSection, setCommentSection] = useState(false);
  const [movieName, setMovieName] = useState("popular");
  const [comments, setComments] = useState([]);
  const [names, setNames] = useState([]);
  const [commentText, setCommentText] = useState('');
  const scrollRef = useRef(null);
  const [showOptionsMovie, setShowOptionsMovie] = useState(false);
  const [showOptionsSeries, setShowOptionsSeries] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [addMovie, setAddMovie] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [bestMoviesSelected, setBestMoviesSelected] = useState(false);


  useEffect(() => {
    axios
      .get('http://localhost:8081/api/movies')
      .then((response) => {
        setMovies(response.data.movies);
        setFilteredMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occurred while fetching Movies.');
        console.error(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
    setNoResults(filtered.length === 0);
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

  // const fetchComments = (movieId) => {
  //   // Fetch comments
  //   axios
  //     .get(`http://localhost:8081/api/movies/${movieId}/comments`)
  //     .then((response) => {
  //       const commentsData = response.data; // Extract comments array from response
  //       setComments(commentsData); // Set comments array to state
  
  //       // Fetch users
  //       axios
  //         .get('http://localhost:8081/api/users')
  //         .then(response => {
  //           const users = response.data.users;
  
  //           // Find users whose IDs match with comments
  //           const relevantUsers = users.filter(user => commentsData.some(comment => comment.userId === user.id_u));
  
  //           // Extract first names of relevant users
  //           const firstNames = relevantUsers.map(user => user.firstname);
  
  //           console.log("First names of users who commented:", firstNames);
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching users:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching comments:', error);
  //     });
  // }

  const fetchComments = (movieId) => {
    Promise.all([
      axios.get(`http://localhost:8081/api/movies/${movieId}/comments`),
      axios.get('http://localhost:8081/api/users')
    ])
      .then((responses) => {
        const commentsData = responses[0].data; 
        const users = responses[1].data.users;
  
        const commentsWithNames = commentsData.map(comment => {
          const user = users.find(user => user.id_u === comment.userId);
          if (user) {
            return { ...comment, firstName: user.firstname };
          } else {
            return { ...comment, firstName: 'Unknown' };
          }
        });

        setComments(commentsWithNames);

        console.log("Comments with first names:", commentsWithNames);
      })
      .catch((error) => {
        console.error('Error fetching comments and/or users:', error);
      });
  };
  
  
  

  const addCommentToMovie = (movieId, userId, commentText) => {
    const commentData = {
      movieId: movieId,
      userId: userId,
      text: commentText
    };

    axios.post(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}/comments`, commentData)
      .then(() => {
        // displayCommentSuccessMessage();
        // clearCommentTextArea();
      })
      .catch((error) => {
        console.error('An error occurred while adding comment:', error);
        // handleCommentError();
      });
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
    // addCommentToMovie(selectedMovie.id_m, user.id_u, commentText);
  };

  const handleSendComment = () => {
    console.log("c'est bon?\n")
    addCommentToMovie(selectedMovie.id_m, user.id_u, commentText);
    setCommentText('');
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    container.scrollLeft += container.clientWidth / 4;
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    container.scrollLeft -= container.clientWidth / 4;
  };

  const handleClickMovie = (movie) => {
    console.log(comments);
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

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return `${day}/${month}/${year}`;
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

  const handleConnectionDisconnection = () => {
    setUser(null);
    setUserConnected(!userConnected);
  };

  const handleAddMovie = () => {
    setAddMovie(!addMovie);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleConnection = () => {
    axios.get('http://localhost:8081/api/users')
      .then(response => {
        const users = response.data.users;

        const user = users.find(user => user.email === email && user.firstname === firstname);

        if (user) {
          console.log(user);
          setUserConnected(true);
          setUser(user);
        } else {

          console.error('User not found');

        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSignIn = () => {
    setSignIn(!signIn);
  };

  const handleBestMoviesClick = () => {
    setBestMoviesSelected(true);
    const sorted = [...movies].sort((a, b) => b.average - a.average);
    setFilteredMovies(sorted);
  };

  return (
    <div className="Home">
      <div className='header'>
        <Link to='/'>
          <LocalActivityIcon styles={{ fontSize: '64px' }} className='logo' />
        </Link>
        <div className='index'>
          <Link className='item' onMouseEnter={handleMouseEnterMovie} onMouseLeave={handleMouseLeaveMovie}>
            <span>Filter</span>
            {showOptionsMovie && (
              <div className='options'>
                <button onClick={handleBestMoviesClick} className='option'>Best Movies</button>               
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
            <PersonIcon />
          </div>
          {showOptions && (
  <div className='optionsUser'>
    {userConnected ? (
      <>
        {addMovie ? (
          <>
            <AddMovieForm />
            <div className='signUpContainer'>
              <button className='leaveSignUp' onClick={handleAddMovie}><ArrowBackIcon /></button>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleAddMovie} className='addMovie'>Add Movie</button>
            <button onClick={handleConnectionDisconnection} className='connect'>Disconnect</button>
          </>
        )}
      
      </>
    ) : (
      <>
        {signUp ? (
          <>
            <AddUserForm />
            <div className='signUpContainer'>
              <button className='leaveSignUp' onClick={handleSignUp}><ArrowBackIcon /></button>
            </div>
          </>
        ) : (
          <>
            {signIn ? (
              
                  <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <form className='formSignIn'>
                      <input
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <input
                        placeholder='Name'
                        value={firstname}
                        onChange={handleNameChange}
                      />
                    </form>
                    <button onClick={handleConnection} className='connect'>Sign in</button>
                    <div className='signUpContainer'>
                      <button className='leaveSignUp' onClick={handleSignIn}><ArrowBackIcon /></button>
                    </div>
                  </div>
                
              
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <button onClick={handleSignIn} className='connect'>Sign in</button>
                      <button className='signUp' onClick={handleSignUp}>Sign up</button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
        </div>
      </div>
      <div className="scroll-container">
        <h1>Movies in our theaters</h1>
        <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
        <div className="Home-horizontal-scroll" ref={scrollRef}>
          {filteredMovies.map(movie => (
            <div className="MovieItem" key={movie.id} onClick={() => handleClickMovie(movie)}>
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
                <p style={{ fontWeight: '700' }}>Release Date:</p>
                <p>{formatDate(selectedMovie.date)}</p>
                <p style={{ fontWeight: '700' }}>Vote Count:</p>
                <p>{selectedMovie.average}</p>
                <p style={{ fontWeight: '700' }}>Overview:</p>
                <p style={{ fontSize: '16px', textAlign: 'left', padding: '0.5rem' }}>{selectedMovie.overview}</p>
                <p style={{ fontSize: '16px' }}>{selectedMovie.description}</p>
              </div>
              <div className='icons'>
                <button className='icon-circle' onClick={handleCommentSection}>
                  <CommentIcon />
                </button>
                {/* <div className='icon-circle'>
                  <ThumbDownIcon />
                </div>
                <div className='icon-circle'>
                  <ThumbUpIcon />
                </div> */}
              </div>
            </div>
          </div>
          {commentSection && (
            <div className='commentSection'>
              <div className='commentContainer'>
                {comments && comments.map(comment => (
                  <div className='comment' key={comment.id_c}>
                    <div className='userImgComment'>
                      <PersonIcon/>
                    </div>
                    <div className='commentText'>
                      <p style={{fontSize:'10px'}}>{comment.text}</p>
                      <p style={{fontSize:'10px', color:'rgb(17, 118, 206)'}}>{comment.firstName}</p>
                    </div>
                    
                  </div>
                ))}
              </div>
              <div className='commentInsertion'>
                <textarea
                  placeholder={userConnected ? 'What are your thoughts?' : 'Connect yourself to participate :)'}
                  className='inputComment'
                  value={commentText}
                  onChange={handleCommentChange}
                  disabled={!userConnected}
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
