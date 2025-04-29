import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api/client';
import { MODEL_GET_IMAGE } from '../api/endpoints';

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { message: 'Please sign in to access this page' } });
      return;
    }

    // Get results from session storage
    const storedResults = sessionStorage.getItem('predictionResults');
    const storedInputData = sessionStorage.getItem('inputData');
    
    if (!storedResults) {
      navigate('/input', { state: { message: 'Please input data first' } });
      return;
    }
    
    try {
      setResults(JSON.parse(storedResults));
      if (storedInputData) {
        setInputData(JSON.parse(storedInputData));
      }
      
      // Fetch healthcare centers map
      fetchMap();
    } catch (err) {
      console.error('Error parsing stored data:', err);
      setError('Error loading results. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const fetchMap = async () => {
    try {
      const response = await apiClient.get(MODEL_GET_IMAGE);
      setMapImage(response.data);
    } catch (err) {
      console.error('Error fetching map:', err);
      // Don't set general error - just log it
    }
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    // Here you would typically fetch or calculate data based on the selected year
    console.log(`Selected year: ${year}`);
  };

  // Mock data for demonstration - replace with actual data from your API
  const mockOptimalLocations = [
    { id: 1, name: 'Location A', score: 92, lat: 24.7136, lng: 46.6753 },
    { id: 2, name: 'Location B', score: 87, lat: 24.7225, lng: 46.6428 },
    { id: 3, name: 'Location C', score: 81, lat: 24.6911, lng: 46.7081 }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg inline-block">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 btn-primary"
            onClick={() => navigate('/input')}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <button 
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          onClick={() => navigate('/input')}
        >
          New Analysis
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Optimal Score</h3>
          <p className="text-3xl font-bold">{results?.sum || 85}/100</p>
        </div>
        
        <div className="card bg-green-50 border border-green-100">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Facilities Needed</h3>
          <p className="text-3xl font-bold">{Math.round(((inputData?.population || 50000) / 10000) * 1.5)}</p>
        </div>
        
        <div className="card bg-purple-50 border border-purple-100">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Coverage Estimate</h3>
          <p className="text-3xl font-bold">{Math.round((results?.sum || 85) * 0.95)}%</p>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Optimal Locations Map</h2>
        
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          {/* This would ideally be replaced with a proper map component */}
          {mapImage ? (
            <img 
              src={`data:image/png;base64,${mapImage}`} 
              alt="Healthcare Centers Map" 
              className="w-full h-full object-cover" 
            />
          ) : inputData?.imagePreview ? (
            <div className="relative w-full h-96">
              <img 
                src={inputData.imagePreview} 
                alt="Uploaded Map" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="bg-white bg-opacity-75 p-4 rounded">
                  Map visualization processing... Results shown are based on analytical data.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-96 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No map data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Estimation Section */}
      <div className="card bg-amber-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Estimation</h2>
        <p className="text-gray-600 mb-8">
          Estimate Services Demands within Expected Interval with its Estimate Allocation.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button 
            className={`bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors ${selectedYear === 1 ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
            onClick={() => handleYearSelect(1)}
          >
            1 yrs
          </button>
          <button 
            className={`bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors ${selectedYear === 2 ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
            onClick={() => handleYearSelect(2)}
          >
            2 yrs
          </button>
          <button 
            className={`bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors ${selectedYear === 5 ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
            onClick={() => handleYearSelect(5)}
          >
            5 yrs
          </button>
          <button 
            className={`bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors ${selectedYear === 8 ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
            onClick={() => handleYearSelect(8)}
          >
            8 yrs
          </button>
          <button 
            className={`bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors ${selectedYear === 10 ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
            onClick={() => handleYearSelect(10)}
          >
            10 yrs
          </button>
        </div>
        
        {selectedYear && (
          <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Projected Needs for {selectedYear} Years</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Estimated Population</p>
                <p className="font-medium">{Math.round((inputData?.population || 50000) * (1 + selectedYear * 0.02))}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Additional Facilities</p>
                <p className="font-medium">{Math.ceil(selectedYear / 2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Budget</p>
                <p className="font-medium">${(selectedYear * 1.5).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optimal Locations Table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recommended Optimal Locations</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOptimalLocations.map((location) => (
                <tr key={location.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {location.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.lat}, {location.lng}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      location.score >= 90 ? 'bg-green-100 text-green-800' : 
                      location.score >= 80 ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {location.score}/100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Input Parameters Summary */}
      {inputData && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Population</p>
              <p className="font-medium">{inputData.population}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-medium">{inputData.area} km²</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Density</p>
              <p className="font-medium">{inputData.density}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Accessibility Score</p>
              <p className="font-medium">{inputData.accessibility}/10</p>
            </div>
          </div>
        </div>
      )}

      {/* Export and Actions */}
      <div className="flex justify-end space-x-4">
        <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
          Export PDF
        </button>
        <button className="btn-primary">
          Share Results
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;