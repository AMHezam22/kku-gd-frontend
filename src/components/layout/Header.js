import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl font-bold text-white hover:text-gray-200">
              OptiUrban
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/input" className="text-white hover:text-gray-200">
                  Input Data
                </Link>
                <Link to="/results" className="text-white hover:text-gray-200">
                  Results
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-white hover:text-gray-200">
                    <span>{user?.name || user?.username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-white hover:text-gray-200">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;