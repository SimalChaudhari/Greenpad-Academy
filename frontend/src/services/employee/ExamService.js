// examService.js

import axios from 'axios';
import { getToken } from '../authService';
import { API_URL } from '../../config/config';

// Define the base API URL for exams
const API = API_URL + '/api/useremp/exam';

/**
 * Fetch exams based on module ID
 * @param {string} moduleId - The ID of the module to fetch exams for
 * @returns {Promise<object>} - The fetched exam data
 */
export const getExamByModuleId = async (moduleId) => {
  try {
    // const response1 = await axios.post(`${API}/insert-default-questions`, {},{
    //   headers: { authorization: getToken() },
    // });

    const response = await axios.get(`${API}/modules/${moduleId}`, {
      headers: { authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

//need to remove
export const getExam = async () => {
  try {
    const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};