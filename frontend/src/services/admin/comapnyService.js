// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

const API =  API_URL + '/api/admin/company';

export const getAllCompaniesList = async () => {

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

export const editCompany = async (id, userData) => {
  try {
    const response = await axios.put(`${API}/${id}`, userData, { headers: { authorization: getToken() }} );
    toast.success("Company Edit Successfully.");
    return response;
  } catch (error) {
    toast.error("Company Edit Failed.Try Again.");
    throw error.response;
  }
};

export const deleteCompany = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() }} );
    toast.success("Company Delete Successfully.");
    return response;
  } catch (error) {
    toast.error(error.response.data.message || "Company Delete Failed.Try Again.");
    throw error.response;
  }
};

export const addCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API}`, companyData, { headers: { authorization: getToken() }} );
    toast.success("Company Added Successfully.");
    
    return response;
  } catch (error) {
    toast.error("Company Added Failed.Try Again.");
    throw error.response;
  }
};