// authService.js

import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/auth';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API}/registration`, userData);
    
    return response;
  } catch (error) {
    toast.error("Registration failed. Please try again.");
    throw error.response;
  }
};

// Log in with user credentials
export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API}/login`, credentials);
    const token = response.data.token;
    saveToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userForgotPassword = async (credentials) => {
  try {
    const response = await axios.post(`${API}/forgotPassword`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const userForgotPasswordValidate = async (credentials) => {
  try {
    const response = await axios.get(`${API}/reset-password/validate?token=${credentials}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const userresetPassword = async (credentials) => {
  try {
    const response = await axios.post(`${API}/resetPassword`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get the user's authentication token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save the user's authentication token to local storage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove the user's authentication token from local storage
export const removeToken = () => {
  localStorage.removeItem('persist:root');
  localStorage.removeItem('token');
};

// Check if the user is logged in
export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

// Log out the user
export const logout = () => {
  removeToken();
  // Perform any additional cleanup or redirect
};
// Log out the user
export const Userlogout = () => {
  removeToken();try {
    const response = axios.post(`${API}/logout`,);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
  // Perform any additional cleanup or redirect
};
