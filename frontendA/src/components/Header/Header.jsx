import { useState } from 'react';

import Navbar from '../Navbar/navbar';
import UsersPopup from '../UsersOption/UsersPopUp';

import './Header.css';

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedIn, setLogged] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='header'>
      <Navbar />
      <div className='horizontal-div'>
        <div className='userImg nav-item' onClick={handleImageClick}>
            <img />
        </div>
      </div>
      {showPopup && <UsersPopup onClose={handleClosePopup}/>}
    </div>
  );
};

export default Header;
