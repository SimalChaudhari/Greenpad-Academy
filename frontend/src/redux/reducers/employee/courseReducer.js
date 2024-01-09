// Import any necessary dependencies
import {
  EMPLOYEE_COURSE_LIST_REQUEST,
  EMPLOYEE_COURSE_LIST_SUCCESS,
  EMPLOYEE_COURSE_LIST_FAILURE,

  EMPLOYEE_COURSES_RESET_REQUEST,
  EMPLOYEE_COURSES_RESET_SUCCESS,
  EMPLOYEE_COURSES_RESET_FAILURE,

} from "../../actions/employee/courssActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
  progress_list: [],
};

const employeeCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEE_COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case EMPLOYEE_COURSE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case EMPLOYEE_COURSES_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EMPLOYEE_COURSES_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
          progress_list: null,
        };
      case EMPLOYEE_COURSES_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };


    default:
      return state;
  }
};

export default employeeCourseReducer;
