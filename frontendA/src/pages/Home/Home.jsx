import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';

import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const apiKey = '42ff6929ce2def3df213d68aaf2a3ec5';

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  return { movies };
};

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [commentSection, setCommentSection] = useState(false);
  const [movieName, setMovieName] = useState("popular");
  const { movies } = useFetchMovies();
  const scrollRef = useRef(null);

  const scrollRight = () => {
    const container = scrollRef.current;
    container.scrollLeft += container.clientWidth / 4; // Scroll by the width of the container
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    container.scrollLeft -= container.clientWidth / 4; // Scroll by the width of the container
  };

  const handleChange = (e) => {
    const searchItem = e.target.value;
    setMovieName(searchItem);
  };

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

  return (
    <div className="Home">
      <div className="scroll-container">
        <h1>Movies in our theaters</h1>
        <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
        <div className="Home-horizontal-scroll" ref={scrollRef}>
          {movies.map((item) => (
            <div className="MovieItem" key={item.id} onClick={() => handleClickMovie(item)}>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.original_title || item.original_name} />
              <div className="Movie-title">{item.original_title || item.original_name}</div>
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
            <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.original_title || selectedMovie.original_name} />
            <div className='move-details'>
              <div className="movie-info">
                <h2>{selectedMovie.original_title || selectedMovie.original_name}</h2>
                <p style={{fontWeight:'700'}}>Release Date:</p>
                <p>{formatDate(selectedMovie.release_date)}</p>
                <p style={{fontWeight:'700'}}>Vote Average:</p>
                <p>{scaleVoteAverage(selectedMovie.vote_average)}</p>
                <p style={{fontWeight:'700'}}>Overview:</p>
                <p style={{fontSize:'16px', textAlign:'left', padding:'0.5rem'}}>{selectedMovie.overview}</p>      
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
