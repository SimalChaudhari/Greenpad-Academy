// Import any necessary dependencies
import {
  FILEUPLOAD_REQUEST,
  FILEUPLOAD_SUCCESS,
  FILEUPLOAD_FAILURE,
  EMPLOYEES_LIST_REQUEST,
  EMPLOYEES_LIST_SUCCESS,
  EMPLOYEES_LIST_FAILURE,
  EMPLOYEES_DELETE_REQUEST,
  EMPLOYEES_DELETE_SUCCESS,
  EMPLOYEES_DELETE_FAILURE,
  EMPLOYEES_EDIT_REQUEST,
  EMPLOYEES_EDIT_SUCCESS,
  EMPLOYEES_EDIT_FAILURE,
} from "../actions/employeeActions";

const initialState = {
  loading: false,
  users: null,
  error: null,
  list: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILEUPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FILEUPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FILEUPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EMPLOYEES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case EMPLOYEES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EMPLOYEES_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES_DELETE_SUCCESS:
      const list = state.list.data;
      const data = list.filter((item) => item._id !== action.payload);
      return {
        ...state,
        loading: false,
        list: { ...list, data: data },
      };
    case EMPLOYEES_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EMPLOYEES_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEES_EDIT_SUCCESS:
      const editedEmployee = action.payload;
      const empList = state.list.data;
      const updatedList = empList.map((item) => {
        if (item._id === editedEmployee._id) {
          return editedEmployee;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        list: { ...empList, data: updatedList },
      };
    case EMPLOYEES_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
