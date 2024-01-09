// Import any necessary dependencies
import {
    COMPANY_LIST_REQUEST,
    COMPANY_LIST_SUCCESS,
    COMPANY_LIST_FAILURE,
    COMPANY_EDIT_REQUEST,
    COMPANY_EDIT_SUCCESS,
    COMPANY_EDIT_FAILURE,
    COMPANY_DELETE_REQUEST,
    COMPANY_DELETE_SUCCESS,
    COMPANY_DELETE_FAILURE,
    } from '../actions/companyActions';
  
  const initialState = {
    loading: false,
    users: null,
    error: null,
    list: [],
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMPANY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case COMPANY_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      case COMPANY_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case COMPANY_EDIT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case COMPANY_EDIT_SUCCESS:
        const editedCompany = action.payload;
        const empList = state.list.data;
        const updatedList = empList.map((item) => {
          if (item._id === editedCompany._id) {
            return editedCompany;
          }
          return item;
        });
        return {
          ...state,
          loading: false,
          list: { ...empList, data: updatedList },
        };
      case COMPANY_EDIT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case COMPANY_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case COMPANY_DELETE_SUCCESS:
        const list = state.list.data;
        const data = list.filter((item) => item._id !== action.payload);
        return {
          ...state,
          loading: false,
          list: { ...list, data: data },
        };
      case COMPANY_DELETE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default companyReducer;
  