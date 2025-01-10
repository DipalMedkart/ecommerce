import React from "react";
import "../pages/style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navigation-bar">
      <div className="navbar-logo">MyAdminPanel</div>
      <ul className="navbar-links">
        <li onClick={() => alert("Navigating to Dashboard")}>Dashboard</li>
        <li onClick={() => alert("Navigating to Users")}>Users</li>
        <li onClick={() => alert("Navigating to Reports")}>Reports</li>
        <li onClick={() => alert("Navigating to Settings")}>Settings</li>
        <li onClick={() => alert("Logging Out")}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;