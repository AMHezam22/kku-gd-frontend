// src/pages/LandingPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleStartClick = () => {
    navigate('/signin');
  };
  
  return (
    <div className="landing-page">
      <div className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-text"
            >
              <div className="star-icon">✦</div>
              <h1>Smart Solutions<br />Better<br />Neighborhoods</h1>
              <p>Optimizing Services for Every society</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="login-btn"
                onClick={handleStartClick}
              >
                START
              </motion.button>
              
              <div className="create-account">
                <span>Already have an account?  </span>{' '}
                <Link to="/signin" > Log in</Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-image"
          >
            <img
              src="/images/neighborhood-map.jpeg"
              alt="Neighborhood map with data visualization"
              className="map-image"
            />
          </motion.div>
        </div>
      </div>

      <footer>
        <p>©2025 OptiUrban</p>
      </footer>
    </div>
  );
};

export default LandingPage;