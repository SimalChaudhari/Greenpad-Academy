// Import any necessary dependencies
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  EMPLOYEES_DELETE_REQUEST,
  EMPLOYEES_DELETE_SUCCESS,
  EMPLOYEES_DELETE_FAILURE,
  EMPLOYEES_EDIT_REQUEST,
  EMPLOYEES_EDIT_SUCCESS,
  EMPLOYEES_EDIT_FAILURE,
  EMPLOYEES_NOTE_EDIT_REQUEST,
  EMPLOYEES_NOTE_EDIT_SUCCESS,
  EMPLOYEES_NOTE_EDIT_FAILURE,
  EMPLOYEE_RESET_REQUEST,
  EMPLOYEE_RESET_SUCCESS,
  EMPLOYEE_RESET_FAILURE,
} from "../../actions/employee/employeeActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case PROFILE_FAILURE:
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
      const empList = state.list?.data;
      
      if (empList._id === editedEmployee._id) {
        const editedEmployee1 = action.payload;
        // return editedEmployee;
        return {
          ...state,
          loading: false,
          list: { ...state.list, data: editedEmployee1 },
        };
      }
      return {
        ...state,
        loading: false,
        list: { ...state.list, data: editedEmployee },
      };

    case EMPLOYEES_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case EMPLOYEES_NOTE_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMPLOYEES_NOTE_EDIT_SUCCESS:
      const editedEmployeeNote = action.payload;
      const empNoteList = state.list?.data?.module_progress;
      
      const updatedList = empNoteList.map((item) => {
        if (item.module === editedEmployeeNote.module) {
          return editedEmployeeNote;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        list: { ...state.list, data: updatedList },
      };

    case EMPLOYEES_NOTE_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case EMPLOYEE_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EMPLOYEE_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case EMPLOYEE_RESET_FAILURE:
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
