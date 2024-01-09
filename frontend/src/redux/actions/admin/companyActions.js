import { getAllCompaniesList, deleteCompany, editCompany, getProfileById, addCompany } from '../../../services/admin/comapnyService';

// Action Types

export const COMPANY_LIST_REQUEST = 'COMPANY_LIST_REQUEST';
export const COMPANY_LIST_SUCCESS = 'COMPANY_LIST_SUCCESS';
export const COMPANY_LIST_FAILURE = 'COMPANY_LIST_FAILURE';

export const COMPANY_DELETE_REQUEST = 'COMPANY_DELETE_REQUEST';
export const COMPANY_DELETE_SUCCESS = 'COMPANY_DELETE_SUCCESS';
export const COMPANY_DELETE_FAILURE = 'COMPANY_DELETE_FAILURE';

export const COMPANY_EDIT_REQUEST = 'COMPANY_EDIT_REQUEST';
export const COMPANY_EDIT_SUCCESS = 'COMPANY_EDIT_SUCCESS';
export const COMPANY_EDIT_FAILURE = 'COMPANY_EDIT_FAILURE';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const COMPANY_ADD_REQUEST = 'COMPANY_ADD_REQUEST';
export const COMPANY_ADD_SUCCESS = 'COMPANY_ADD_SUCCESS';
export const COMPANY_ADD_FAILURE = 'COMPANY_ADD_FAILURE';

export const RESET_ADMIN_COMPANY_REQUEST = 'RESET_ADMIN_COMPANY_REQUEST';
export const RESET_ADMIN_COMPANY_SUCCESS = 'RESET_ADMIN_COMPANY_SUCCESS';
export const RESET_ADMIN_COMPANY_FAILURE = 'RESET_ADMIN_COMPANY_FAILURE';
// Action Creators

export const companyListRequest = () => ({
  type: COMPANY_LIST_REQUEST,
});

export const companyListSuccess = (list) => ({
  type: COMPANY_LIST_SUCCESS,
  payload: list,
});

export const companyListFailure = (error) => ({
  type: COMPANY_LIST_FAILURE,
  payload: error,
});

export const companyDeleteRequest = () => ({
  type: COMPANY_DELETE_REQUEST,
});

export const companyDeleteSuccess = (employeeId) => ({
  type: COMPANY_DELETE_SUCCESS,
  payload: employeeId,
});

export const companyDeleteFailure = (error) => ({
  type: COMPANY_DELETE_FAILURE,
  payload: error,
});

export const companyEditRequest = () => ({
  type: COMPANY_EDIT_REQUEST,
});

export const companyEditSuccess = (users) => ({
  type: COMPANY_EDIT_SUCCESS,
  payload: users,
});

export const companyEditFailure = (error) => ({
  type: COMPANY_EDIT_FAILURE,
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

export const addCompanyRequest = () => ({
  type: COMPANY_ADD_REQUEST,
});

export const addCompanySuccess = (addCompany) => ({
  type: COMPANY_ADD_SUCCESS,
  payload: addCompany,
});

export const addCompanyFailure = (error) => ({
  type: COMPANY_ADD_FAILURE,
  payload: error,
});

export const adminCompanyResetRequest = () => ({
  type: RESET_ADMIN_COMPANY_REQUEST,
});

export const adminCompanyResetSuccess = () => ({
  type: RESET_ADMIN_COMPANY_SUCCESS,
  payload: null,
});

export const adminCompanyResetFailure = (error) => ({
  type: RESET_ADMIN_COMPANY_FAILURE,
  payload: error,
});

// Async Action Creator

export const getAllCompanies = () => {
  return async (dispatch) => {
    dispatch(companyListRequest());

    try {
      // Call your company list service here and pass the params
      const list = await getAllCompaniesList();
      // Dispatch the company list Success action with the user data
      dispatch(companyListSuccess(list));
      return list
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(companyListFailure(error.message));
    }
  };
};

export const deleteCompanyById = (id) => {
  return async (dispatch) => {
    dispatch(companyDeleteRequest());

    try {
      // Call your company list service here and pass the id
      const deletedCompany = await deleteCompany(id);
      // Dispatch the company list Success action with the user data
      if (deletedCompany) {
        dispatch(companyDeleteSuccess(id));
      }
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(companyDeleteFailure(error.message));
    }
  };
};

export const editCompanyById = (id, userData) => {
  return async (dispatch) => {
    dispatch(companyEditRequest());
    try {
      // Call your company list service here and pass the id
      const editedCompany = await editCompany(id, userData);
      // Dispatch the company list Success action with the user data
      if (editedCompany?.data?.data?._id) {
        dispatch(companyEditSuccess(editedCompany?.data?.data));
      }
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(companyEditFailure(error.message));
    }
  };
};

export const getProfile = (params) => {
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

export const CreateCompany = (params) => {
  return async (dispatch) => {
    dispatch(addCompanyRequest());
    try {
      // Call your company list service here and pass the params
      const company = await addCompany(params);
      // return company,
      // Dispatch the company list Success action with the user data
      dispatch(addCompanySuccess(company));
      return company
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(addCompanyFailure(error.message));
    }
  };
};

export const resetAdminCompany = () => {
  return async (dispatch) => {
    dispatch(adminCompanyResetRequest());
    try {
        dispatch(adminCompanyResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(adminCompanyResetFailure(error.message));
    }
  };
};