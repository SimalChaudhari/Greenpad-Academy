// Import any necessary dependencies
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAILURE,
} from "../actions/AdmincourssActions";

const initialState = {
  loading: false,
  courses: null,
  error: null,
  list: [],
};

const AdmincourseReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default AdmincourseReducer;
