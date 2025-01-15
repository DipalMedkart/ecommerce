import React from 'react';
import '../pages/style/Navbar.css'; // Import the CSS file
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({searchQuery, handleSearchQuery, cartCount, onCartClick }) => {

  // const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent
  };

  // value={searchQuery} onChange={handleSearchChange}

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    // localStorage.removeItem("role");

    window.location.href = "/login";
  };
  return (
    <nav className="navbar">
      <div className="brand-name">Medkart</div>
      <div className="navbar-items">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" value={searchQuery} onChange={(e) =>  handleSearchQuery(e.target.value)}/>
        </div>
        <button className="navbar-button">Home</button>
        <button className="navbar-button">About</button>
        <button className="navbar-button" onClick={() => navigate("/customer-deshboard/orders")}>Orders</button>
        <button className="cart-icon" onClick={onCartClick}>
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>

        <img src="../../public/images/blank-pic.webp" alt="Profile" className="profile-pic" />
        <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
