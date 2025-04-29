import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage'; // Tareq Add this import
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import InputPage from './pages/InputPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} /> {/* Tareq Add this route */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;