// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

const API =  API_URL + '/api/company/employee';
// const HDR =  { 'Content-Type': 'multipart/form-data', authorization: getToken(), "Accept": "multipart/form-data"};
const HDR_formData = { 'Content-Type': 'multipart/form-data', authorization: getToken() };

// Register a new user
export const addEmployeesSheet = async (userData) => {
  try {
    const response = await axios.post(API, userData, { headers: { 'Content-Type': 'multipart/form-data', authorization: getToken() } });
    toast.success(`Sheet Added Successfully. FailureCount : ${response?.data?.failureCount}, SuccessCount : ${response?.data?.successCount}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getAllEmployeesList = async () => {
  try {
    const response = await axios.get(`${API}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};

export const getProfileById = async (id) => {

  try {
    const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() }} );
    return response.data;
    
  } catch (error) {
    throw error.response;
  }
};

export const editEmployee = async (id, userData) => {
  try {
    const response = await axios.put(`${API}/${id}`, userData, { headers: { authorization: getToken() }} );
    toast.success("Employee Update Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Update Failed. Try again");
    throw error.response;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() }} );
    toast.success("Employee Delete Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Delete Failed. Try again");
    throw error.response;
  }
};

export const addCompanyEmployee = async (data) => {
  try {
    const response = await axios.post(`${API}/create`, data, { headers: { authorization: getToken() } });
    toast.success("Employee Added Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Added Failed. Try Again.");
    throw error?.response?.data?.message;
  }
};