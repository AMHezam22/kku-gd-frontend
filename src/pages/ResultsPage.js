import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, MODEL_GET_IMAGE } from '../api/endpoints';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Generate unique timestamp to avoid browser caching
  const timestamp = new Date().getTime();
  const apiUrl = BASE_URL || 'http://localhost:8080';
  const imageUrl = `${apiUrl}${MODEL_GET_IMAGE}?t=${timestamp}`;

  useEffect(() => {
    // Preload the image to check if it exists
    const img = new Image();
    img.onload = () => setImageLoading(false);
    img.onerror = () => {
      setImageLoading(false);
      setImageError(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  if (!prediction) {
    // If accessed directly without data, redirect to input page
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 p-4 rounded-md mb-6">
          <p className="text-yellow-700">No prediction data available. Please submit data first.</p>
          <button 
            onClick={() => navigate('/input')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Input Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Prediction Results</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Model Prediction</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-lg">
            <span className="font-semibold">Result:</span> {prediction.sum}
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          {imageLoading ? (
            <div className="flex justify-center py-10">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : imageError ? (
            <p className="text-red-500 text-center py-10">
              Image is not available yet. The model may still be processing.
            </p>
          ) : (
            <div className="flex justify-center">
              <img 
                src={imageUrl} 
                alt="Model output" 
                className="max-w-full h-auto shadow-lg rounded"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => navigate('/input')}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Input
        </button>
      </div>
    </div>
  );
};

export default ResultPage;