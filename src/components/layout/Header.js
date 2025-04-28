import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [hovered, setHovered] = useState(null);
  const hoverColor = '#c0a080';

  const getNavStyle = (key) => ({
    ...styles.navLink,
    color: hovered === key ? hoverColor : styles.navLink.color
  });

  const getAuthStyle = (key) => ({
    ...styles.loginButton,
    color: hovered === key ? hoverColor : styles.loginButton.color,
    borderColor: hovered === key ? hoverColor : styles.loginButton.borderColor
  });

  return (
    <header style={styles.header}>
      <Link
        to="/"
        style={styles.logo}
      >
        OptiUrban
      </Link>

      <nav style={styles.navMenu}>
        <Link
          to="/"
          style={getNavStyle('home')}
          onMouseEnter={() => setHovered('home')}
          onMouseLeave={() => setHovered(null)}
        >
          HOME
        </Link>
        <Link
          to="/About"
          style={getNavStyle('about')}
          onMouseEnter={() => setHovered('about')}
          onMouseLeave={() => setHovered(null)}
        >
          ABOUT
        </Link>
        <Link
          to="/contact"
          style={getNavStyle('contact')}
          onMouseEnter={() => setHovered('contact')}
          onMouseLeave={() => setHovered(null)}
        >
          CONNECT WITH US
        </Link>
      </nav>

      <div style={styles.authContainer}>
        <Link
          to="/signin"
          style={getAuthStyle('login')}
          onMouseEnter={() => setHovered('login')}
          onMouseLeave={() => setHovered(null)}
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          style={getAuthStyle('signup')}
          onMouseEnter={() => setHovered('signup')}
          onMouseLeave={() => setHovered(null)}
        >
          Sign up
        </Link>
      </div>

      <div style={styles.headerLine}></div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333333',
    borderBottom: '1px solid #444',
    position: 'relative',
  },
  logo: {
    fontFamily: 'Georgia, serif',
    fontSize: '2.6rem',
    color: '#c0a080',
    fontWeight: 300,
    textDecoration: 'none',
    marginRight: '2rem',
  },
  navMenu: {
    display: 'flex',
    gap: '1.5rem',
    flexGrow: 1,
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
  },
  authContainer: {
    display: 'flex',
    gap: '0.5rem',
  },
  loginButton: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    border: '1px solid #666',
    fontSize: '0.9rem',
    display: 'inline-block',
    borderColor: '#666',
  },
  signupButton: { // same as login
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    border: '1px solid #666',
    fontSize: '0.9rem',
    display: 'inline-block',
    borderColor: '#666',
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: '#555',
  },
};

export default Header;
