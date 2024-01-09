// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
// import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

const API =  API_URL + '/api/company/courses';

export const getAllCoursesList = async (id) => {
  
  try {
    const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};

export const getById = async (id) => {

  try {
    const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};
