import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, MODEL_UPLOAD_IMAGE, MODEL_PREDICT } from '../api/endpoints';

const InputPage = () => {
  // List of cities for the dropdown
  const cities = [
    "Riyadh",
    "Makkah",
    "Madinah",
    "Qassim",
    "Eastern Region",
    "Asir",
    "Tabuk",
    "Hail",
    "Northern Borders",
    "Jazan",
    "Najran",
    "Al Baha",
    "Al Jouf"
  ];

  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    setIsAuthChecking(false);
  }, [navigate]);

  // Handle city selection change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const apiUrl = BASE_URL || 'http://localhost:8080';
      
      // Step 1: Upload the image
      const imageFormData = new FormData();
      imageFormData.append('image', selectedImage);
      
      const imageResponse = await fetch(`${apiUrl}${MODEL_UPLOAD_IMAGE}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: imageFormData
      });
      
      if (!imageResponse.ok) {
        throw new Error('Failed to upload image');
      }
      
      // Step 2: Send the prediction request with city as string
      const predictionResponse = await fetch(`${apiUrl}${MODEL_PREDICT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: selectedCity })
      });
      
      if (!predictionResponse.ok) {
        throw new Error('Failed to get prediction');
      }
      
      const predictionResult = await predictionResponse.json();
      
      // Step 3: Redirect to result page with data
      navigate('/result', { 
        state: { 
          prediction: predictionResult,
          city: selectedCity
        } 
      });
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred during submission. Please try again.');
      setIsLoading(false);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Input Data</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City Dropdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select City</h2>
            <div>
              <label className="form-label">City:</label>
              <select 
                value={selectedCity}
                onChange={handleCityChange}
                className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Image Upload Field */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Upload Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
                required
              />
              {selectedImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected: {selectedImage.name}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPage;