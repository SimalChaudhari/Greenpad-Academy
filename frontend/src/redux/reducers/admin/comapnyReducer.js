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
  COMPANY_ADD_REQUEST,
  COMPANY_ADD_SUCCESS,
  COMPANY_ADD_FAILURE,
  RESET_ADMIN_COMPANY_REQUEST,
  RESET_ADMIN_COMPANY_SUCCESS,
  RESET_ADMIN_COMPANY_FAILURE,
} from "../../actions/admin/companyActions";

const initialState = {
  loading: false,
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
        list: { data: updatedList },
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
        list: { data: data },
      };
    case COMPANY_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COMPANY_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMPANY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        list: {
          ...state.list,
          data: [...state.list.data, ...[action.payload.data.data]],
        },
      };
    case COMPANY_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_ADMIN_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_ADMIN_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: null,
      };
    case RESET_ADMIN_COMPANY_FAILURE:
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
