import { toast } from 'react-toastify';
import { userLogin, Userlogout, userForgotPassword, userForgotPasswordValidate, userresetPassword } from './../../services/authService';
import { resetCompanyEmployee } from '../actions/company/employeeActions';
import { resetCompanyCourses, getAllConpanyCourses } from '../actions/company/courssActions';
import { resetAdminEmployee } from '../actions/admin/employeeActions';
import { resetAdminCompany } from '../actions/admin/companyActions';
import { resetAdminCourse, getAllCourses } from '../actions/admin/courssActions';
import { resetAdminModule } from '../actions/admin/modulesActions';
import { resetEmployeeCourses, getAllEmployeeCourses } from '../actions/employee/courssActions';
import { resetEmployee } from '../actions/employee/employeeActions';
import { resetEmployeeModule } from '../actions/employee/modulesActions';
import { resetExam } from '../actions/employee/examActions';
import { resetSetting } from '../actions/Setting/settingActions';
import { resetEmployeesPolicy } from '../actions/Guidance-Support/policyActions';
import { resetProgrammeContactsList } from '../actions/Guidance-Support/programmecontactsActions';
import { resetContactus } from '../actions/Guidance-Support/contactusActions';
import { resetPlans } from '../actions/Plans/plansActions';
import { ROLES } from '../../config/roles';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// LogOut

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const FORGOT_PASSWORD_VALIDATE_REQUEST = 'FORGOT_PASSWORD_VALIDATE_REQUEST';
export const FORGOT_PASSWORD_VALIDATE_SUCCESS = 'FORGOT_PASSWORD_VALIDATE_SUCCESS';
export const FORGOT_PASSWORD_VALIDATE_FAILURE = 'FORGOT_PASSWORD_VALIDATE_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPasswordValidateRequest = () => ({
  type: FORGOT_PASSWORD_VALIDATE_REQUEST,
});

export const forgotPasswordValidateSuccess = () => ({
  type: FORGOT_PASSWORD_VALIDATE_SUCCESS,
});

export const forgotPasswordValidateFailure = (error) => ({
  type: FORGOT_PASSWORD_VALIDATE_FAILURE,
  payload: error,
});

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

// Logout Action Creators
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: null,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

// Async Action Creator
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      // Call your login service here and pass the credentials
      const user = await userLogin(credentials);
      if(user.role === ROLES.ADMIN) {
        dispatch(getAllCourses());
      }
      else if(user.role === ROLES.COMPANY) {
        dispatch(getAllConpanyCourses());
      }
      else if(user.role === ROLES.EMPLOYEE) {
        dispatch(getAllEmployeeCourses());
      }

      // Dispatch the loginSuccess action with the user data
      dispatch(loginSuccess(user));
      
      return user
    } catch (error) {
      // Dispatch the loginFailure action with the error message
      dispatch(loginFailure(error.message));
      toast.error(error.message);
    }
  };
};

// Async Action Creator
export const forgotPassword = (credentials) => {
  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      // Call your forgotPassword service here and pass the credentials
      const user = await userForgotPassword(credentials);

      // Dispatch the forgotPasswordSuccess action with the user data
      dispatch(forgotPasswordSuccess(user));
      return user
    } catch (error) {
      // Dispatch the forgotPasswordFailure action with the error message
      dispatch(forgotPasswordFailure(error.message));
    }
  };
};

// Async Action Creator
export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());

    try {
      // Call your logout service here and pass the credentials
      Userlogout();
      // Dispatch the logoutSuccess action with the user data
      dispatch(logoutSuccess());
      dispatch(resetCompanyEmployee());
      dispatch(resetCompanyCourses());
      dispatch(resetAdminEmployee());
      dispatch(resetAdminCompany());
      dispatch(resetAdminCourse());
      dispatch(resetAdminModule());
      dispatch(resetEmployeeCourses());
      dispatch(resetEmployee());
      dispatch(resetEmployeeModule());
      dispatch(resetExam());
      dispatch(resetSetting());
      dispatch(resetEmployeesPolicy());
      dispatch(resetProgrammeContactsList());
      dispatch(resetContactus());
      dispatch(resetPlans());
    } catch (error) {
      // Dispatch the logoutFailure action with the error message
      dispatch(logoutFailure(error.message));
      toast.error(error.message);
    }
  };
};

// Async Action Creator
export const forgotPasswordValidate = (credentials) => {
  return async (dispatch) => {
    dispatch(forgotPasswordValidateRequest());

    try {
      // Call your forgotPassword service here and pass the credentials
      const user = await userForgotPasswordValidate(credentials);

      // Dispatch the forgotPasswordSuccess action with the user data
      dispatch(forgotPasswordValidateSuccess(user));
      return user
    } catch (error) {
      // Dispatch the forgotPasswordFailure action with the error message
      dispatch(forgotPasswordValidateFailure(error.message));
    }
  };
};

// Async Action Creator
export const resetPassword = (credentials) => {
  return async (dispatch) => {
    dispatch(resetPasswordRequest());

    try {
      // Call your forgotPassword service here and pass the credentials
      const user = await userresetPassword(credentials);

      // Dispatch the forgotPasswordSuccess action with the user data
      dispatch(resetPasswordSuccess());
      return user
    } catch (error) {
      // Dispatch the forgotPasswordFailure action with the error message
      dispatch(resetPasswordFailure(error.message));
    }
  };
};