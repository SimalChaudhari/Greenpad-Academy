// employeeService.js

import axios from 'axios';
import { getToken } from './authService';
import { API_URL } from '../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/users';
const HDR =  { 'Content-Type': 'multipart/form-data', authorization: getToken(), "Accept": "multipart/form-data"};

// Register a new user
export const addEmployeesSheet = async (userData) => {
  try {
    const response = await axios.post(`${API}/addEmployeesSheet`, userData, { headers: HDR},  );
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getAllEmployeesList = async () => {

  try {
    const response = await axios.get(`${API}/getAllEmployees`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};


export const editEmployee = async (userData) => {
  try {
    const response = await axios.put(`${API}/updateProfile/${userData._id}`, userData, { headers: { authorization: getToken() }} );
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API}/removeProfile/${id}`, { headers: { authorization: getToken() }} );
    return response;
  } catch (error) {
    throw error.response;
  }
};