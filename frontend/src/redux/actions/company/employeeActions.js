import { addEmployeesSheet, getAllEmployeesList, deleteEmployee, editEmployee, getProfileById, addCompanyEmployee } from '../../../services/company/employeeService';

// Action Types
export const COMPANY_FILEUPLOAD_REQUEST = 'COMPANY_FILEUPLOAD_REQUEST';
export const COMPANY_FILEUPLOAD_SUCCESS = 'COMPANY_FILEUPLOAD_SUCCESS';
export const COMPANY_FILEUPLOAD_FAILURE = 'COMPANY_FILEUPLOAD_FAILURE';

export const EMPLOYEES_LIST_REQUEST = 'EMPLOYEES_LIST_REQUEST';
export const EMPLOYEES_LIST_SUCCESS = 'EMPLOYEES_LIST_SUCCESS';
export const EMPLOYEES_LIST_FAILURE = 'EMPLOYEES_LIST_FAILURE';

export const EMPLOYEES_DELETE_REQUEST = 'EMPLOYEES_DELETE_REQUEST';
export const EMPLOYEES_DELETE_SUCCESS = 'EMPLOYEES_DELETE_SUCCESS';
export const EMPLOYEES_DELETE_FAILURE = 'EMPLOYEES_DELETE_FAILURE';

export const COMPANY_EMPLOYEES_EDIT_REQUEST = 'COMPANY_EMPLOYEES_EDIT_REQUEST';
export const COMPANY_EMPLOYEES_EDIT_SUCCESS = 'COMPANY_EMPLOYEES_EDIT_SUCCESS';
export const COMPANY_EMPLOYEES_EDIT_FAILURE = 'COMPANY_EMPLOYEES_EDIT_FAILURE';

// Action Types

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const CREATE_COMPANY_EMPLOYEE_REQUEST = 'CREATE_COMPANY_EMPLOYEE_REQUEST';
export const CREATE_COMPANY_EMPLOYEE_SUCCESS = 'CREATE_COMPANY_EMPLOYEE_SUCCESS';
export const CREATE_COMPANY_EMPLOYEE_FAILURE = 'CREATE_COMPANY_EMPLOYEE_FAILURE';

export const EMPLOYEES_RESET_REQUEST = 'EMPLOYEES_RESET_REQUEST';
export const EMPLOYEES_RESET_SUCCESS = 'EMPLOYEES_RESET_SUCCESS';
export const EMPLOYEES_RESET_FAILURE = 'EMPLOYEES_RESET_FAILURE';

// Action Creators
export const fileuploadRequest = () => ({
  type: COMPANY_FILEUPLOAD_REQUEST,
});

export const fileuploadSuccess = (users) => ({
  type: COMPANY_FILEUPLOAD_SUCCESS,
  payload: users,
});

export const fileuploadFailure = (error) => ({
  type: COMPANY_FILEUPLOAD_FAILURE,
  payload: error,
});

export const employeesListRequest = () => ({
  type: EMPLOYEES_LIST_REQUEST,
});

export const employeesListSuccess = (listings) => ({
  type: EMPLOYEES_LIST_SUCCESS,
  payload: listings,
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
  type: COMPANY_EMPLOYEES_EDIT_REQUEST,
});

export const employeesEditSuccess = (users) => ({
  type: COMPANY_EMPLOYEES_EDIT_SUCCESS,
  payload: users,
});

export const employeesEditFailure = (error) => ({
  type: COMPANY_EMPLOYEES_EDIT_FAILURE,
  payload: error,
});


export const profileRequest = () => ({
  type: PROFILE_REQUEST,
});

export const profileSuccess = (profile) => ({
  type: PROFILE_SUCCESS,
  payload: profile,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  payload: error,
});

export const createCompanyEmployeeRequest = () => ({
  type: CREATE_COMPANY_EMPLOYEE_REQUEST,
});

export const createCompanyEmployeeSuccess = (employee) => ({
  type: CREATE_COMPANY_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const createCompanyEmployeeFailure = (error) => ({
  type: CREATE_COMPANY_EMPLOYEE_FAILURE,
  payload: error,
});


export const employeesResetRequest = () => ({
  type: EMPLOYEES_RESET_REQUEST,
});

export const employeesResetSuccess = () => ({
  type: EMPLOYEES_RESET_SUCCESS,
  payload: null,
});

export const employeesResetFailure = (error) => ({
  type: EMPLOYEES_RESET_FAILURE,
  payload: error,
});

// Async Action Creator
export const fileuploadByComapny = (credentials) => {
  return async (dispatch) => {
    dispatch(fileuploadRequest());

    try {
      // Call your fileupload service here and pass the credentials
      const users = await addEmployeesSheet(credentials);

      // Dispatch the fileuploadSuccess action with the user data
      dispatch(fileuploadSuccess(users.data));
      return users
    } catch (error) {
      // Dispatch the fileuploadFailure action with the error message
      dispatch(fileuploadFailure(error.message));
    }
  };
};

export const getAllEmployeesByComapny = () => {
  return async (dispatch) => {
    dispatch(employeesListRequest());
    
    try {
      // Call your employees listings service here and pass the params
      const listings = await getAllEmployeesList();
      
      // Dispatch the employees listings Success action with the user data
      dispatch(employeesListSuccess(listings));
      return listings
    } catch (error) {
      // Dispatch the employees listings Failure action with the error message
      dispatch(employeesListFailure(error.message));
    }
  };
};

export const deleteEmployeeByIdByComapny = (id) => {
  return async (dispatch) => {
    dispatch(employeesDeleteRequest());

    try {
      // Call your employees list service here and pass the id
      const deletedEmployee = await deleteEmployee(id);
      // Dispatch the employees list Success action with the user data
      if (deletedEmployee) {
        dispatch(employeesDeleteSuccess(id));
      }
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesDeleteFailure(error.message));
    }
  };
};

export const editEmployeeByIdByComapny = (id, userData) => {
  return async (dispatch) => {
    dispatch(employeesEditRequest());

    try {
      // Call your employees list service here and pass the id
      const editedEmployeeCompany = await editEmployee(id, userData);
      // Dispatch the employees list Success action with the user data
      if (editedEmployeeCompany?.data?.data?._id) {
        dispatch(employeesEditSuccess(editedEmployeeCompany?.data?.data));
      }
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesEditFailure(error.message));
    }
  };
};

export const getProfileByComapny = (params) => {
  return async (dispatch) => {
    dispatch(profileRequest());

    try {
      // Call your company list service here and pass the params
      const profile = await getProfileById(params);
      // return profile,

      // Dispatch the company list Success action with the user data
      dispatch(profileSuccess(profile));
      return profile
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(profileFailure(error.message));
    }
  };
};


export const createCompanyEmployee = (employeeData) => {
  return async (dispatch) => {
    dispatch(createCompanyEmployeeRequest()); 

    try {
      const createdEmployee = await addCompanyEmployee(employeeData);
      dispatch(createCompanyEmployeeSuccess(createdEmployee.data));

      return createdEmployee;
    } catch (error) {
      // dispatch(createCompanyEmployeeFailure(error.response ? error.response.data.message : "An error occurred"));
      dispatch(createCompanyEmployeeFailure(error.message));
      return false;
    }
  };
};


export const resetCompanyEmployee = () => {
  return async (dispatch) => {
    dispatch(employeesResetRequest());
    try {
        dispatch(employeesResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesResetFailure(error.message));
    }
  };
};