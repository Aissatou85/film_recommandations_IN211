import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'

function SearchBar() {
    const handleSearch = () => {
        console.log("search");
    }

    return (
        <form className="search-bar" >
          <input type="text" placeholder="Search movie" />
          <button type="submit" onClick={ handleSearch }><SearchIcon className='icon' /></button>
        </form>
    );
}

export default SearchBar;