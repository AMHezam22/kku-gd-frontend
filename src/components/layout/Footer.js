import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">OptiUrban</h3>
            <p className="text-gray-300">
              Optimizing urban planning with machine learning solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/input" className="text-gray-300 hover:text-white">
                  Input Data
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-300 hover:text-white">
                  Results
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              King Khalid University<br />
              Abha, Saudi Arabia<br />
              Email: contact@optiorban.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} OptiUrban. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;