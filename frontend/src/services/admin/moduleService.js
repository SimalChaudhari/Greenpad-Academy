// employeeService.js

import axios from 'axios';
import { getToken } from '../authService';
import { API_URL } from '../../config/config';
import { toast } from 'react-toastify';

const API = API_URL + '/api/admin/modules';

// export const getAllModule = async (courseId) => {
    export const getAllModule = async (id) => {

    try {
        // const response = await axios.get(`${API}/${courseId}`, { headers: Auth });
        const response = await axios.get(`${API}/${id}`, { headers: { authorization: getToken() }} );
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

export const editModule = async (data) => {
    try {
        const response = await axios.put(`${API}/${data._id}`, data, { headers: { authorization: getToken() } });
        toast.success("Module Edit Successfully.");
        return response;
    } catch (error) {
        toast.error("Module Edit Failed.Try Again.");
        throw error.response;
    }
};

export const deleteModule = async (data) => {
    try {
        const response = await axios.post(`${API}/delete/${data._id}`, data, { headers: { authorization: getToken() } });
        toast.success("Module Delete Successfully.");
        return response;
    } catch (error) {
        toast.error("Module Delete Failed.Try Again.");
        throw error.response;
    }
};

export const addModule = async (courseId, data) => {
    try {
        const response = await axios.post(`${API}/${courseId}`, data, { headers: { authorization: getToken() } });
        toast.success("Module Added Successfully.");

        return response;
    } catch (error) {
        toast.error("Module Added Failed.Try Again.");
        throw error.response;
    }
};