// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { API_URL } from '../../config/config';
import { toast } from 'react-toastify';

const API = API_URL + '/api/employee/courses';

export const getAllModule = async (id) => {

    try {
        const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() } });
        return response.data;

    } catch (error) {
        throw error.response;
    }
};

export const getModuleProgress = async (id) => {

    try {
        const response = await axios.get(`${API}/get_progress/${id}`, { headers: { authorization: getToken() } });
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const getAllModuleProgress = async () => {

    try {
        const response = await axios.get(`${API}/get_all_progress`, { headers: { authorization: getToken() } });
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const getModuleById = async (id) => {

    try {
        const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() } });
        return response.data;

    } catch (error) {
        throw error.response;
    }
};

export const updateModuleProgress = async (courseData) => {

    try {
        const response = await axios.post(`${API}/update_progress/${courseData.id}`, { courseData }, { headers: { authorization: getToken() } });
        return response.data;
    } catch (error) {
        throw error.response;
    }

};

export const editEmployeeNotes = async (id, userData) => {
    try {
      const response = await axios.put(`${API}/add/note/${id}`, userData, { headers: { authorization: getToken() }} );
      toast.success("Note Add Successfully.");
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Note Add Failed. Try again");
      throw error.response;
    }
  };
  
export const deleteEmployeeNotes = async (userData) => {
    try {
      const response = await axios.post(`${API}/delete/note/${userData?.data?._id}`, userData, { headers: { authorization: getToken() }} );
      toast.success("Note Delete Successfully.");
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Note Delete Failed. Try again");
      throw error.response;
    }
  };
  
export const editEmployeeNotes1 = async (userData) => {
    try {
      const response = await axios.post(`${API}/edit/note/${userData?._id}`, userData, { headers: { authorization: getToken() }} );
      toast.success("Note Edit Successfully.");
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Note Edit Failed. Try again");
      throw error.response;
    }
  };