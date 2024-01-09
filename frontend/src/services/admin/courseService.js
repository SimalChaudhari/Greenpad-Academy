// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';

const API =  API_URL + '/api/admin/courses';

export const getAllCoursesList = async () => {

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

export const editCourses = async ( id, courseData) => {
  try {
    const response = await axios.put(`${API}/${id}`, courseData, { headers: { authorization: getToken() }} );
    toast.success("Caurse Edit Successfully.");
    return response;
  } catch (error) {
    toast.error("Caurse Edit Failed.Try Again.");
    throw error.response;
  }
};

export const deleteCourses = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`, { headers: { authorization: getToken() }} );
    toast.success("Caurse Deleted Successfully.");
    return response;
  } catch (error) {
    // toast.error("Caurse Deleted Failed.Try Again.");
    toast.error("First Delete Associated Modules!");
    throw error.response;
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API}`, courseData, { headers: { authorization: getToken() }} );
    console.log('response: ', response);
    toast.success("Caurse Added Successfully.");
    
    return response;
  } catch (error) {
    toast.error("Caurse Added Failed.Try Again.");
    throw error.response;
  }
};

export const editCoursesModule = async ( id, courseData) => {
  try {
    const response = await axios.put(`${API}/update_course/${id}`, courseData, { headers: { authorization: getToken() }} );
    toast.success("Caurse Module Edit Successfully.");
    return response;
  } catch (error) {
    toast.error("Caurse Module Edit Failed.Try Again.");
    throw error.response;
  }
};

export const deleteCoursesModule = async (courseData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API}/delete_course/${courseData.data}`,courseData, {
      headers: {
        authorization: token,
      },
    });
    toast.success("Course Module Deleted Successfully.");
    return response;
  } catch (error) {
    {error?.response?.data?.message ? 
      toast.error(`${error?.response?.data?.message}`) :
      toast.error("Course Module Delete Failed. Try Again.")
    }
    throw error.response;
  }
};

export const addCoursesModule = async (courseData) => {
  try {
    const response = await axios.put(`${API}/add_course/${courseData.courseId}`, courseData, { headers: { authorization: getToken() }} );
    toast.success("Caurse Module Added Successfully.");
    return response;
  } catch (error) {
    toast.error("Caurse Module Added Failed.Try Again.");
    throw error.response;
  }
};