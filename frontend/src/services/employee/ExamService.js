// examService.js

import axios from 'axios';
import { getToken } from '../authService';
import { API_URL } from '../../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/useremp/exam';

export const getExam = async () => {
  try {
    const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};