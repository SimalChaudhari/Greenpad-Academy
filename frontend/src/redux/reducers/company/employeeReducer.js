// Import any necessary dependencies
import {
  COMPANY_FILEUPLOAD_REQUEST,
  COMPANY_FILEUPLOAD_SUCCESS,
  COMPANY_FILEUPLOAD_FAILURE,
  EMPLOYEES_LIST_REQUEST,
  EMPLOYEES_LIST_SUCCESS,
  EMPLOYEES_LIST_FAILURE,
  EMPLOYEES_DELETE_REQUEST,
  EMPLOYEES_DELETE_SUCCESS,
  EMPLOYEES_DELETE_FAILURE,
  COMPANY_EMPLOYEES_EDIT_REQUEST,
  COMPANY_EMPLOYEES_EDIT_SUCCESS,
  COMPANY_EMPLOYEES_EDIT_FAILURE,
  CREATE_COMPANY_EMPLOYEE_REQUEST,
  CREATE_COMPANY_EMPLOYEE_SUCCESS,
  CREATE_COMPANY_EMPLOYEE_FAILURE,
  EMPLOYEES_RESET_REQUEST,
  EMPLOYEES_RESET_SUCCESS,
  EMPLOYEES_RESET_FAILURE,
} from "../../actions/company/employeeActions";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FILEUPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMPANY_FILEUPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        list: {
          ...state.list,
          data: [...state.list.data, ...action.payload.data],
        },
      };
    case COMPANY_FILEUPLOAD_FAILURE:
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
    const existingList = state.list.data;
    const updatedData = existingList.filter(
      (item) => item._id !== action.payload
    );
    let NewListUpdatedData = state.list;
    NewListUpdatedData["totalRecods"] = updatedData.length;
    NewListUpdatedData["data"] = updatedData;
    return {
      ...state,
      loading: false,
      list: NewListUpdatedData,
    };

    case EMPLOYEES_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COMPANY_EMPLOYEES_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMPANY_EMPLOYEES_EDIT_SUCCESS:
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
        list: { data: updatedList },
      };
    case COMPANY_EMPLOYEES_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_COMPANY_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_COMPANY_EMPLOYEE_SUCCESS:
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
    case CREATE_COMPANY_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case EMPLOYEES_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EMPLOYEES_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case EMPLOYEES_RESET_FAILURE:
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
