import React from 'react';
import '../CSS/navbar.css'; 
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://www.recycledevice.com/assets/images/recycledevice.svg" alt="" />
        <a href="/"></a>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Service</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
