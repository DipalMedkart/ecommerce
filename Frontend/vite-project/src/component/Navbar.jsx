import React from 'react';
import '../pages/style/Navbar.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand-name">Your Brand</div>
      <div className="navbar-items">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <button className="navbar-button">Home</button>
        <button className="navbar-button">About</button>
        <button className="navbar-button">Cart</button>
        <img src="../../public/images/blank-pic.webp" alt="Profile" className="profile-pic" />
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
