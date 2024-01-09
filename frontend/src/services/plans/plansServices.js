// settingService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/plans';

export const getPlans = async () => {
    try {
      const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
      return response.data;
      
    } catch (error) {
      throw error.response;
    }
  };
  
export const addPlans = async (PlansData) => {
  try {
    const response = await axios.post(`${API}/create`, PlansData, { headers: { authorization: getToken() }} );
    toast.success("Plans Added Successfully.");
    
    return response;
  } catch (error) {
    console.log('error: ', error);
    toast.error("Plans Added Failed.Try Again.");
    throw error.response;
  }
};

export const getPlansById = async (id) => {

  try {
    const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() }} );
    // toast.success("Successfully fetched employee profile.");
    return response.data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Plans Update Failed. Try again");
    throw error.response;
  }
};

export const updatePlansById = async (id, plansData) => {

  try {
    const response = await axios.put(`${API}/${id}`, plansData, { headers: { authorization: getToken() }} );
    toast.success("Successfully Update Plan Details.");
    return response.data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Plans Update Failed. Try again");
    throw error.response;
  }
};

export const deletePlan = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() } });
    toast.success("Plan Delete Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Plan Delete Failed. Try again");
    throw error.response;
  }
};