import {
  deleteEmployee,
  editEmployee,
  editEmployeeNotes,
  getProfileById,
} from "../../../services/employee/employeeService";
import { loginSuccess } from "../../actions/authActions";
import { getToken } from "../../../services/authService";
const Auth = { authorization: getToken() };

// Action Types

export const EMPLOYEES_DELETE_REQUEST = "EMPLOYEES_DELETE_REQUEST";
export const EMPLOYEES_DELETE_SUCCESS = "EMPLOYEES_DELETE_SUCCESS";
export const EMPLOYEES_DELETE_FAILURE = "EMPLOYEES_DELETE_FAILURE";

export const EMPLOYEES_EDIT_REQUEST = "EMPLOYEES_EDIT_REQUEST";
export const EMPLOYEES_EDIT_SUCCESS = "EMPLOYEES_EDIT_SUCCESS";
export const EMPLOYEES_EDIT_FAILURE = "EMPLOYEES_EDIT_FAILURE";

export const EMPLOYEES_NOTE_EDIT_REQUEST = "EMPLOYEES_NOTE_EDIT_REQUEST";
export const EMPLOYEES_NOTE_EDIT_SUCCESS = "EMPLOYEES_NOTE_EDIT_SUCCESS";
export const EMPLOYEES_NOTE_EDIT_FAILURE = "EMPLOYEES_NOTE_EDIT_FAILURE";

// Action Types

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

export const EMPLOYEE_RESET_REQUEST = "EMPLOYEE_RESET_REQUEST";
export const EMPLOYEE_RESET_SUCCESS = "EMPLOYEE_RESET_SUCCESS";
export const EMPLOYEE_RESET_FAILURE = "EMPLOYEE_RESET_FAILURE";
// Action Creators
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

export const employeesEditSuccess = (useremployee) => ({
  type: EMPLOYEES_EDIT_SUCCESS,
  payload: useremployee,
});

export const employeesEditFailure = (error) => ({
  type: EMPLOYEES_EDIT_FAILURE,
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

export const employeesNoteEditRequest = () => ({
  type: EMPLOYEES_NOTE_EDIT_REQUEST,
});

export const employeesNoteEditSuccess = (users) => {
  return {
    type: EMPLOYEES_NOTE_EDIT_SUCCESS,
    payload: users,
  };
};

export const employeesNoteEditFailure = (error) => ({
  type: EMPLOYEES_NOTE_EDIT_FAILURE,
  payload: error,
});

export const employeeResetRequest = () => ({
  type: EMPLOYEE_RESET_REQUEST,
});

export const employeeResetSuccess = () => ({
  type: EMPLOYEE_RESET_SUCCESS,
  payload: null,
});

export const employeeResetFailure = (error) => ({
  type: EMPLOYEE_RESET_FAILURE,
  payload: error,
});

// Async Action Creator

export const deleteEmployeeByIdB = (id) => {
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

export const editEmployeeById = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(employeesEditRequest());

    try {
      const editedEmployee1 = await editEmployee(id, updatedData);

      if (
        !editedEmployee1 ||
        !editedEmployee1.data ||
        !editedEmployee1.data.data
      ) {
        throw new Error("Invalid response data");
      }

      const { data } = editedEmployee1;
      const {
        _id,
        company_name,
        username,
        first_name,
        last_name,
        email,
        role,
      } = data.data;

      let usernameValue =
        username || company_name || `${first_name} ${last_name}`;

      const user = {
        id: _id,
        username: usernameValue,
        email: email,
        role: role,
        token: Auth, // Replace with the actual token value
      };

      // Dispatch the employees list Success action with the user data
      dispatch(loginSuccess(user));
      dispatch(employeesEditSuccess(data.data));
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeesEditFailure(error?.message || error?.data || error?.data?.message?.code));
    }
  };
};

export const getEmployeeProfileById = (params) => {
  return async (dispatch) => {
    dispatch(profileRequest());

    try {
      // Call your company list service here and pass the params
      const profile = await getProfileById(params);
      // return profile,

      // Dispatch the company list Success action with the user data
      dispatch(profileSuccess(profile));
      return profile;
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(profileFailure(error.message));
    }
  };
};

export const editEmployeeNoteById1 = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(employeesNoteEditRequest());

    // Call your employeesNote list service here and pass the id
    const editedEmployee2 = await editEmployeeNotes(id, updatedData);
    try {
      // Dispatch the employeesNote list Success action with the user data
      if (editedEmployee2?.data?.moduleProgressEntry._id) {
        dispatch(
          employeesNoteEditSuccess(editedEmployee2?.data?.moduleProgressEntry)
        );
      }
    } catch (error) {
      // Dispatch the employeesNote list Failure action with the error message
      dispatch(employeesNoteEditFailure(error.message));
    }
  };
};

export const resetEmployee = () => {
  return async (dispatch) => {
    dispatch(employeeResetRequest());
    try {
      dispatch(employeeResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeeResetFailure(error.message));
    }
  };
};
