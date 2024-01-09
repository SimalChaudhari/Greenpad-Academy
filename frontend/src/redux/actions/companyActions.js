import { getAllCompaniesList, deleteCompany, editCompany } from '../../services/comapnyService';

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
      if (deletedCompany?.data?.user?._id) {
        dispatch(companyDeleteSuccess(deletedCompany?.data?.user?._id));
      }
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(companyDeleteFailure(error.message));
    }
  };
};

export const editCompanyById = (id) => {
  return async (dispatch) => {
    dispatch(companyEditRequest());
    try {
      // Call your company list service here and pass the id
      const editedCompany = await editCompany(id);
      // Dispatch the company list Success action with the user data
      if (editedCompany?.data?.user[0]?._id) {
        dispatch(companyEditSuccess(editedCompany?.data?.user[0]));
      }
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(companyEditFailure(error.message));
    }
  };
};
