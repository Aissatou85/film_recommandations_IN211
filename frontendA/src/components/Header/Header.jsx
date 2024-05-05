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

  // console.log(user)
  const Navdata = [
    {
        id: 1,
        headername: "Genres",
        Name: "Genres",
        link : "/"
    },
    {
        id: 2,
        headername: "Trending Movies",
        Name: "Trending",
        link:"/trending"
    },
    {
        id: 3,
        headername: "Favorite Movies",
        Name: "Favorites",
        link:"/favorite"
    }
  ]

  return (
    <div className='header'>
      <Link to='/'>
        <LocalActivityIcon styles={{ fontSize: '64px' }} className='logo' />
      </Link>
      <nav className={`${activemobile ? 'block' : 'hidden'} fixed bg-black/90 md:bg-black h-full w-full md:w-[15rem] z-30 md:block`}>
                <motion.div
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link to="/" className="logo flex flex-col justify-center items-center m-7 gap-2" onClick={() => setActivemobile(!activemobile)}>
                        <img src={logo} alt="logo" className="w-24" />
                        <h1 className="text-gray-400/70 font-bold text-2xl text-center">BlueBird Movies</h1>
                    </Link>
                </motion.div>

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
      </nav>
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
