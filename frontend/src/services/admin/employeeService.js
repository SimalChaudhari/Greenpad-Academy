import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

const API =  API_URL + '/api/admin/employee';
// const HDR = { 'Content-Type': 'application/json', authorization: getToken() };
const HDR_formData = { 'Content-Type': 'multipart/form-data', authorization: getToken() };

// Register a new user
export const addEmployeesSheet = async (userData) => {
  try {
    const response = await axios.post(API, userData, { headers: { 'Content-Type': 'multipart/form-data', authorization: getToken() } });
    toast.success(`Sheet Added Successfully. failureCount : ${response?.data?.failureCount}, successCount : ${response?.data?.successCount}`);
    return response;
  } catch (error) {
    toast.error("Sheet Added Failed. Try again");
    return false;
  }
};

export const getAllEmployeesList = async () => {
  try {
    const response = await axios.get(API, { headers: { authorization: getToken() } });
    // toast.success("Successfully fetched employees list.");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee added Failed. Try Again.");
    throw error.response;
  }
};

export const getProfileById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() } });
    // toast.success("Successfully fetched employee profile.");
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const editEmployee = async (employeeId, userData) => {
  try {
    const response = await axios.put(`${API}/${employeeId}`, userData, { headers: { authorization: getToken() } });
    toast.success("Employee Update Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Update Failed. Try again");
    throw error.response;
  }
};

export const deleteEmp = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() } });
    toast.success("Employee Delete Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee Delete Failed. Try again");
    throw error.response;
  }
};

export const addEmployee = async (data) => {
  try {
    const response = await axios.post(API + '/create', data, { headers: { authorization: getToken() } });
    toast.success("Employee Added Successfully.");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Employee added Failed. Try Again.");
    throw error.response;
  }
};
