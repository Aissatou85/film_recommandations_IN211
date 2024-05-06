import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import './Navbar.css'

import SearchBar from '../SearchBar/SearchBar';

function Navbar() {

    const [showOptionsMovie, setShowOptionsMovie] = useState(false);
    const [showOptionsSeries, setShowOptionsSeries] = useState(false); 
    
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

    const Navdata = [
    {
        id: 1,
        headername: "Genres",
        Name: "Genres",
        link : "genres"
    },
    {
        id: 2,
        headername: "Trending",
        Name: "Trending",
        link:"trending"
    },
    {
        id: 3,
        headername: "Favorite",
        Name: "Favorites",
        link:"favorite"
    }]

    return (
    <nav className='navbar'>
      <Link to='/' className='nav-item'>
        <LocalActivityIcon styles={{ fontSize: '64px' }} className='logo' />
      </Link>
      <Link className='nav-item' to="/about">
        About Us
      </Link>
      <Link className='nav-item' to="/addMovie">
        New Movie
      </Link>
      <Link className='nav-item' onMouseEnter={handleMouseEnterMovie} onMouseLeave={handleMouseLeaveMovie}>
        <span>Movies</span>
        {showOptionsMovie && (
          <div className='menu-drop'>
          {Navdata.map((data) => (
            <Link className='menu-item' key={data.id} to={`/movies/${data.link}`}>{data.Name}</Link>
          ))}
        </div>
        )}
      </Link>
      <Link className='nav-item' onMouseEnter={handleMouseEnterSeries} onMouseLeave={handleMouseLeaveSeries}>
        Series
        {showOptionsSeries && (
          <div className='menu-drop'>
            {Navdata.map((data) => (
              <Link className='menu-item' key={data.id} to={`/series/${data.link}`}>{data.Name}</Link>
            ))}
          </div>
        )}
      </Link>
      <div className='nav-item'>
        <SearchBar className='nav-item'/>
      </div>
    </nav>
    )
}

export default Navbar