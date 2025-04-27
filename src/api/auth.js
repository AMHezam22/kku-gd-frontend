import apiClient from './client';
import { AUTH_REGISTER, AUTH_LOGIN, USER_ME } from './endpoints';

export const authService = {
  register: async (userData) => {
    const response = await apiClient.post(AUTH_REGISTER, userData);
    return response.data;
  },
  
  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await apiClient.post(AUTH_LOGIN, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Store the token
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get(USER_ME);
    return response.data;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};