import axios from 'axios';
import { BASE_URL } from './endpoints';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized errors (expired token)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login (you can use history or window.location)
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiClient;