// Import any necessary dependencies
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAILURE,

  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,

  COMPANY_COURSES_RESET_REQUEST,
  COMPANY_COURSES_RESET_SUCCESS,
  COMPANY_COURSES_RESET_FAILURE,

} from "../../actions/company/courssActions.js";

const initialState = {
  loading: false,
  courses: null,
  error: null,
  list: [],
};

const companyCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case COURSE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case COMPANY_COURSES_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case COMPANY_COURSES_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case COMPANY_COURSES_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default companyCourseReducer;
