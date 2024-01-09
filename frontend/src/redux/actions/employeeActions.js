import {addEmployeesSheet, getAllEmployeesList, deleteEmployee, editEmployee } from '../../services/employeeService';

// Action Types
export const FILEUPLOAD_REQUEST = 'FILEUPLOAD_REQUEST';
export const FILEUPLOAD_SUCCESS = 'FILEUPLOAD_SUCCESS';
export const FILEUPLOAD_FAILURE = 'FILEUPLOAD_FAILURE';

export const EMPLOYEES_LIST_REQUEST = 'EMPLOYEES_LIST_REQUEST';
export const EMPLOYEES_LIST_SUCCESS = 'EMPLOYEES_LIST_SUCCESS';
export const EMPLOYEES_LIST_FAILURE = 'EMPLOYEES_LIST_FAILURE';

export const EMPLOYEES_DELETE_REQUEST = 'EMPLOYEES_DELETE_REQUEST';
export const EMPLOYEES_DELETE_SUCCESS = 'EMPLOYEES_DELETE_SUCCESS';
export const EMPLOYEES_DELETE_FAILURE = 'EMPLOYEES_DELETE_FAILURE';

export const EMPLOYEES_EDIT_REQUEST = 'EMPLOYEES_EDIT_REQUEST';
export const EMPLOYEES_EDIT_SUCCESS = 'EMPLOYEES_EDIT_SUCCESS';
export const EMPLOYEES_EDIT_FAILURE = 'EMPLOYEES_EDIT_FAILURE';

// Action Creators
export const fileuploadRequest = () => ({
  type: FILEUPLOAD_REQUEST,
});

export const fileuploadSuccess = (users) => ({
  type: FILEUPLOAD_SUCCESS,
  payload: users,
});

export const fileuploadFailure = (error) => ({
  type: FILEUPLOAD_FAILURE,
  payload: error,
});

export const employeesListRequest = () => ({
  type: EMPLOYEES_LIST_REQUEST,
});

export const employeesListSuccess = (list) => ({
  type: EMPLOYEES_LIST_SUCCESS,
  payload: list,
});

export const employeesListFailure = (error) => ({
  type: EMPLOYEES_LIST_FAILURE,
  payload: error,
});

export const employeesDeleteRequest = () => ({
  type: EMPLOYEES_DELETE_REQUEST,
});

export const employeesDeleteSuccess = (employeeId) => ({
  type: EMPLOYEES_DELETE_SUCCESS,
  payload: employeeId,
});

export const employeesDeleteFailure = (error) => ({
  type: EMPLOYEES_DELETE_FAILURE,
  payload: error,
});

export const employeesEditRequest = () => ({
  type: EMPLOYEES_EDIT_REQUEST,
});

export const employeesEditSuccess = (users) => ({
  type: EMPLOYEES_EDIT_SUCCESS,
  payload: users,
});

export const employeesEditFailure = (error) => ({
  type: EMPLOYEES_EDIT_FAILURE,
  payload: error,
});

// Async Action Creator
export const fileupload = (credentials) => {
  return async (dispatch) => {
    dispatch(fileuploadRequest());

    try {
      // Call your fileupload service here and pass the credentials
      const users = await addEmployeesSheet(credentials);

      // Dispatch the fileuploadSuccess action with the user data
      dispatch(fileuploadSuccess(users));
      return users
    } catch (error) {
      // Dispatch the fileuploadFailure action with the error message
      dispatch(fileuploadFailure(error.message));
    }
  };
};

export const getAllEmployees = () => {
  return async (dispatch) => {
    dispatch(employeesListRequest());

    try {
      // Call your employees list service here and pass the params
      const list = await getAllEmployeesList();
     
      // Dispatch the employees list Success action with the user data
      dispatch(employeesListSuccess(list));
      return list
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesListFailure(error.message));
    }
  };
};

export const deleteEmployeeById = (id) => {
  return async (dispatch) => {
    dispatch(employeesDeleteRequest());

    try {
      // Call your employees list service here and pass the id
      const deletedEmployee = await deleteEmployee(id);

      // Dispatch the employees list Success action with the user data
      if (deletedEmployee?.data?.user?._id) {
        dispatch(employeesDeleteSuccess(deletedEmployee?.data?.user?._id));
      }
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesDeleteFailure(error.message));
    }
  };
};

export const editEmployeeById = (id) => {
  return async (dispatch) => {
    dispatch(employeesEditRequest());

    try {
      // Call your employees list service here and pass the id
      const editedEmployee = await editEmployee(id);
      // Dispatch the employees list Success action with the user data
      if (editedEmployee?.data?.user[0]?._id) {
        dispatch(employeesEditSuccess(editedEmployee?.data?.user[0]));
      }
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesEditFailure(error.message));
    }
  };
};
