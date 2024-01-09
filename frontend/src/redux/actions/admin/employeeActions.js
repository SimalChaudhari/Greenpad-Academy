import { addEmployeesSheet, getAllEmployeesList, getProfileById, editEmployee, deleteEmp, addEmployee} from '../../../services/admin/employeeService';

// Action Types
export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
export const CREATE_EMPLOYEE_FAILURE = 'CREATE_EMPLOYEE_FAILURE';

export const GET_EMPLOYEE_REQUEST = 'GET_EMPLOYEE_REQUEST';
export const GET_EMPLOYEE_SUCCESS = 'GET_EMPLOYEE_SUCCESS';
export const GET_EMPLOYEE_FAILURE = 'GET_EMPLOYEE_FAILURE';

export const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE_REQUEST';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';

export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';

export const GET_LISTING_REQUEST = 'GET_LISTING_REQUEST';
export const GET_LISTING_SUCCESS = 'GET_LISTING_SUCCESS';
export const GET_LISTING_FAILURE = 'GET_LISTING_FAILURE';

export const FILEUPLOAD_REQUEST = 'FILEUPLOAD_REQUEST';
export const FILEUPLOAD_SUCCESS = 'FILEUPLOAD_SUCCESS';
export const FILEUPLOAD_FAILURE = 'FILEUPLOAD_FAILURE';

export const RESET_ADMIN_EMPLOYEE_REQUEST = 'RESET_ADMIN_EMPLOYEE_REQUEST';
export const RESET_ADMIN_EMPLOYEE_SUCCESS = 'RESET_ADMIN_EMPLOYEE_SUCCESS';
export const RESET_ADMIN_EMPLOYEE_FAILURE = 'RESET_ADMIN_EMPLOYEE_FAILURE';

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

export const getListingRequest = () => ({
  type: GET_LISTING_REQUEST,
});

export const getListingSuccess = (listings) => ({
  type: GET_LISTING_SUCCESS,
  payload: listings,
});

export const getListingFailure = (error) => ({
  type: GET_LISTING_FAILURE,
  payload: error,
});

export const createEmployeeRequest = () => ({
  type: CREATE_EMPLOYEE_REQUEST,
});

export const createEmployeeSuccess = (employee) => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const createEmployeeFailure = (error) => ({
  type: CREATE_EMPLOYEE_FAILURE,
  payload: error,
});

export const getEmployeeRequest = () => ({
  type: GET_EMPLOYEE_REQUEST,
});

export const getEmployeeSuccess = (employee) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const getEmployeeFailure = (error) => ({
  type: GET_EMPLOYEE_FAILURE,
  payload: error,
});

export const updateEmployeeRequest = () => ({
  type: UPDATE_EMPLOYEE_REQUEST,
});

export const updateEmployeeSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const updateEmployeeFailure = (error) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});

export const deleteEmployeeRequest = () => ({
  type: DELETE_EMPLOYEE_REQUEST,
});

export const deleteEmployeeSuccess = (employeeId) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: employeeId,
});

export const deleteEmployeeFailure = (error) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});

export const adminEmployeeResetRequest = () => ({
  type: RESET_ADMIN_EMPLOYEE_REQUEST,
});

export const adminEmployeeResetSuccess = () => ({
  type: RESET_ADMIN_EMPLOYEE_SUCCESS,
  payload: null,
});

export const adminEmployeeResetFailure = (error) => ({
  type: RESET_ADMIN_EMPLOYEE_FAILURE,
  payload: error,
});


// Async Action Creators
export const fileupload = (data) => {
  return async (dispatch) => {
    dispatch(fileuploadRequest());

    try {
      // Call your fileupload service here and pass the credentials
      const users = await addEmployeesSheet(data);
      // Dispatch the fileuploadSuccess action with the user data
      dispatch(fileuploadSuccess(users.data));
      return true
    } catch (error) {
      // Dispatch the fileuploadFailure action with the error message
      dispatch(fileuploadFailure(error.message));
      return false;
    }
  };
};

export const getListing = () => {
  return async (dispatch) => {
    dispatch(getListingRequest());

    try {
      // Call your listing service here to fetch the listings
      const listings = await getAllEmployeesList();
      
      // Dispatch the get listing Success action with the fetched listings data
      dispatch(getListingSuccess(listings));

      // Return the fetched listings data if needed
      return listings;
    } catch (error) {
      // Dispatch the get listing Failure action with the error message
      dispatch(getListingFailure(error.message));
    }
  };
};

export const createEmployee = (employeeData) => {
  return async (dispatch) => {
    dispatch(createEmployeeRequest());

    try {
      // Call your create employee service here and pass the employee data
      const createdEmployee = await addEmployee(employeeData);
      const data1 = {
        data: [createdEmployee.data.data]
      }
      // Dispatch the create employee Success action with the created employee data
      dispatch(createEmployeeSuccess(data1));

      // Return the created employee data if needed
      return createdEmployee;
    } catch (error) {
      // Dispatch the create employee Failure action with the error message
      dispatch(createEmployeeFailure(error.message));
      return false;
    }
  };
};

export const getEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(getEmployeeRequest());

    try {
      // Call your get employee service here and pass the employee ID
      const employee = await getProfileById(employeeId);

      // Dispatch the get employee Success action with the employee data
      dispatch(getEmployeeSuccess(employee));

      // Return the employee data if needed
      return employee;
    } catch (error) {
      // Dispatch the get employee Failure action with the error message
      dispatch(getEmployeeFailure(error.message));
    }
  };
};

export const updateEmployee = (employeeId, updatedData) => {
  return async (dispatch) => {
    dispatch(updateEmployeeRequest());

    try {
      // Call your update employee service here and pass the employee ID and updated data
      const updatedEmployee = await editEmployee(employeeId, updatedData);

      // Dispatch the update employee Success action with the updated employee data
      dispatch(updateEmployeeSuccess(updatedEmployee));
      await dispatch(getListing());
      // Return the updated employee data if needed
      return updatedEmployee;
    } catch (error) {
      // Dispatch the update employee Failure action with the error message
      dispatch(updateEmployeeFailure(error.message));
    }
  };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(deleteEmployeeRequest());

    try {
      // Call your delete employee service here and pass the employee ID
      await deleteEmp(employeeId);

      // Dispatch the delete employee Success action with the employee ID
      dispatch(deleteEmployeeSuccess(employeeId));
    } catch (error) {
      // Dispatch the delete employee Failure action with the error message
      dispatch(deleteEmployeeFailure(error.message));
    }
  };
};

export const resetAdminEmployee = () => {
  return async (dispatch) => {
    dispatch(adminEmployeeResetRequest());
    try {
        dispatch(adminEmployeeResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(adminEmployeeResetFailure(error.message));
    }
  };
};