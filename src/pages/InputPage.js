import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api/client';
import { MODEL_PREDICT, MODEL_UPLOAD_IMAGE } from '../api/endpoints';

const InputPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      population: '',
      area: '',
      density: '',
      accessibility: '5',
      infrastructure: '5',
      landUse: '5',
      publicTransport: '5'
    }
  });
  
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Watch form values for calculated fields
  const population = watch('population');
  const area = watch('area');
  
  // Calculate density if both population and area are provided
  const calculatedDensity = population && area ? (population / area).toFixed(2) : '';

  // Check for messages from other pages
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { message: 'Please sign in to access this page' } });
    }
  }, [isAuthenticated, navigate]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSubmitError(null);
      
      // Create a complete data object
      const formData = {
        ...data,
        density: calculatedDensity || data.density,
        imagePreview: imagePreview
      };
      
      // Upload image if available
      if (data.image && data.image.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('image', data.image[0]);
        
        try {
          const imageResponse = await apiClient.post(MODEL_UPLOAD_IMAGE, imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          formData.imagePath = imageResponse.data;
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          // Continue without image if upload fails
        }
      }
      
      // Store input data in session storage
      sessionStorage.setItem('inputData', JSON.stringify(formData));
      
      // Make prediction API call
      const features = [
        parseFloat(data.population) || 0,
        parseFloat(data.area) || 0,
        parseFloat(data.density) || parseFloat(calculatedDensity) || 0,
        parseFloat(data.accessibility) || 0,
        parseFloat(data.infrastructure) || 0,
        parseFloat(data.landUse) || 0,
        parseFloat(data.publicTransport) || 0
      ];
      
      const response = await apiClient.post(MODEL_PREDICT, { features });
      
      // Store prediction results in session storage
      sessionStorage.setItem('predictionResults', JSON.stringify(response.data));
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitError('Error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Urban Planning Input Data</h1>
      
      {successMessage && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {submitError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {submitError}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Basic data */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div>
              <label htmlFor="population" className="form-label">Population</label>
              <input
                id="population"
                type="number"
                className={`input-field ${errors.population ? 'border-red-500' : ''}`}
                placeholder="e.g. 50000"
                {...register('population', { 
                  required: 'Population is required',
                  min: { value: 1, message: 'Population must be positive' }
                })}
              />
              {errors.population && (
                <p className="mt-1 text-sm text-red-600">{errors.population.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="area" className="form-label">Area (km²)</label>
              <input
                id="area"
                type="number"
                step="0.01"
                className={`input-field ${errors.area ? 'border-red-500' : ''}`}
                placeholder="e.g. 25.5"
                {...register('area', { 
                  required: 'Area is required',
                  min: { value: 0.01, message: 'Area must be positive' }
                })}
              />
              {errors.area && (
                <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="density" className="form-label">Population Density (people/km²)</label>
              <input
                id="density"
                type="number"
                step="0.01"
                className="input-field bg-gray-100"
                placeholder="Calculated automatically"
                value={calculatedDensity}
                readOnly
              />
              <p className="mt-1 text-xs text-gray-500">Calculated from population and area</p>
            </div>
            
            <div>
              <label htmlFor="image" className="form-label">Upload Area Map (JPEG/PNG)</label>
              <input
                id="image"
                type="file"
                accept="image/jpeg, image/png"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleImageChange}
                {...register('image')}
              />
              <p className="mt-1 text-xs text-gray-500">Optional: Upload a map of the area for visualization</p>
            </div>
            
            {imagePreview && (
              <div className="mt-4">
                <p className="form-label">Map Preview</p>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Area map preview" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Right column - Ratings table */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Area Ratings</h2>
            <p className="text-sm text-gray-600 mb-4">
              Rate the following aspects of the area on a scale of 1-10
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Factor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating (1-10)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Accessibility</div>
                      <div className="text-xs text-gray-500">Ease of access to the area</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        {...register('accessibility')}
                      />
                      <div className="text-center mt-1">{watch('accessibility')}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Infrastructure</div>
                      <div className="text-xs text-gray-500">Quality of existing infrastructure</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        {...register('infrastructure')}
                      />
                      <div className="text-center mt-1">{watch('infrastructure')}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Land Use</div>
                      <div className="text-xs text-gray-500">Efficiency of current land use</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        {...register('landUse')}
                      />
                      <div className="text-center mt-1">{watch('landUse')}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Public Transport</div>
                      <div className="text-xs text-gray-500">Availability of public transportation</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        {...register('publicTransport')}
                      />
                      <div className="text-center mt-1">{watch('publicTransport')}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Analyze Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPage;