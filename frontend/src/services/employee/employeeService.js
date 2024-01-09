// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

// const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';
const API =  API_URL + '/api/employee';
// const HDR =  { 'Content-Type': 'multipart/form-data', authorization: getToken(), "Accept": "multipart/form-data"};

export const getProfileById = async (id) => {

  try {
    const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() }} );
    // toast.success("Successfully fetched employee profile.");
    return response.data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Update Failed. Try again");
    throw error.response;
  }
};

export const editEmployee = async (id, userData) => {
  try {
    const response = await axios.put(`${API}/${id}`, userData, { headers: { authorization: getToken() }} );
    toast.success("Profile Update Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Profile Update Failed. Try again");
    throw error.response;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() }} );
    toast.success("Employee Detelte Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Update Failed. Try again");
    throw error.response;
  }
};

export const editEmployeeNotes = async (id, userData) => {
  try {
    // const response = await axios.put(`${API}/note/${id}`, userData, { headers: { authorization: getToken() }} );
    // return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Note Add Failed. Try again");
    throw error.response;
  }
};