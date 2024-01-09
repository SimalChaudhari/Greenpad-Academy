// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from './../../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/contactus';
const HDR =  { 'Content-Type': 'multipart/form-data', authorization: getToken(), "Accept": "multipart/form-data"};

export const getContactus = async () => {
    try {
      const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
      return response.data;
      
    } catch (error) {
      throw error.response;
    }
  };
  
export const addContactus = async (contactusData) => {
  try {
    const response = await axios.post(`${API}`, contactusData, { headers: { authorization: getToken() }} );
    toast.success("Contactus added Successfully.");
    
    return response;
  } catch (error) {
    toast.error("Contactus added Failed.Try Again.");
    throw error.response;
  }
};