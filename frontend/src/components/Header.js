import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css'; // Import the CSS file

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <button onClick={logoutUser} className="logout-button">Logout</button>
            <span>Hello {user.username}</span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;