// Import any necessary dependencies
import {
  FILEUPLOAD_REQUEST,
  FILEUPLOAD_SUCCESS,
  FILEUPLOAD_FAILURE,
  GET_LISTING_REQUEST,
  GET_LISTING_SUCCESS,
  GET_LISTING_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  RESET_ADMIN_EMPLOYEE_REQUEST,
  RESET_ADMIN_EMPLOYEE_SUCCESS,
  RESET_ADMIN_EMPLOYEE_FAILURE,
} from "../../actions/admin/employeeActions";

const initialState = {
  loading: false,
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
      let oldData = state.list.data;
      let newData = action.payload.data;
      let finalData = oldData.concat(newData);
      let newList = state.list;
      newList["totalRecods"] = finalData.length;
      newList["data"] = finalData;
      return {
        ...state,
        loading: false,
        list: newList,
      };

    case FILEUPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_LISTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      const existingList = state.list.data;
      const updatedData = existingList.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        loading: false,
        list: { ...state.list, data: updatedData },
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      const editedEmployee = action.payload;
      const currentList = state.list.data;
      const updatedList = currentList.map((item) => {
        if (item._id === editedEmployee._id) {
          return editedEmployee;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        list: { ...state.list, data: updatedList },
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_EMPLOYEE_SUCCESS:
      let OldData = state.list.data;
      let NewData = action.payload.data;
      let FinalData = OldData.concat(NewData);
      let NewList = state.list;
      NewList["totalRecods"] = FinalData.length;
      NewList["data"] = FinalData;
      return {
        ...state,
        loading: false,
        list: NewList,
      };
      
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case RESET_ADMIN_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case RESET_ADMIN_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case RESET_ADMIN_EMPLOYEE_FAILURE:
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
