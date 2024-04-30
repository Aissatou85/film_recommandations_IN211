import { Link } from 'react-router-dom';
import { useState } from 'react';

import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SearchIcon from '@mui/icons-material/Search';

import './Header.css';

const Header = () => {
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

  const handleSubmitSearch = () => {
    console.log("search");
  }

  return (
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
            <input type="search" required />
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
  );
};

export default Header;
