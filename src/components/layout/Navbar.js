import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <span className="welcome-text">
          <FaUser className="icon" /> Welcome, {user && user.name}
        </span>
      </li>
      <li>
        <Link to="/tasks/new">
          <button className="btn btn-primary">
            <FaTasks className="icon" /> New Task
          </button>
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!" className="btn btn-dark">
          <FaSignOutAlt className="icon" /> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <h1>
          <Link to="/">
            <FaTasks className="icon" /> Task Scheduler
          </Link>
        </h1>
        <div className="navbar-menu">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;