import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Optimize Urban Planning with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            OptiUrban helps urban planners make data-driven decisions for better city development
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="btn-primary text-lg px-6 py-3">
              Get Started
            </Link>
            <Link to="/input" className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 text-lg px-6 py-3">
              Try Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
              <p className="text-gray-600">
                Process and analyze complex urban data sets with our advanced algorithms.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Map Integration</h3>
              <p className="text-gray-600">
                Visualize results with integrated mapping tools for better spatial understanding.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Predictions</h3>
              <p className="text-gray-600">
                Use machine learning to predict optimal locations for urban facilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Ready to optimize your urban planning?</h2>
        <Link to="/signup" className="btn-primary text-lg px-8 py-3">
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;