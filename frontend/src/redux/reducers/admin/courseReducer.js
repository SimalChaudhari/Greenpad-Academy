// Import any necessary dependencies
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAILURE,

  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAILURE,

  COURSE_EDIT_REQUEST,
  COURSE_EDIT_SUCCESS,
  COURSE_EDIT_FAILURE,
  
  COURSE_ADD_REQUEST,
  COURSE_ADD_SUCCESS,
  COURSE_ADD_FAILURE,

  RESET_ADMIN_COURSE_REQUEST,
  RESET_ADMIN_COURSE_SUCCESS,
  RESET_ADMIN_COURSE_FAILURE,

} from "../../actions/admin/courssActions";

const initialState = {
  loading: false,
  courses: null,
  error: null,
  list: [],
};

const courseReducer = (state = initialState, action) => {
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

    case COURSE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COURSE_DELETE_SUCCESS:
      const list = state.list.data;
      const data = list.filter((item) => item._id !== action.payload);
      return {
        ...state,
        loading: false,
        list: { ...list, data: data },
      };
    case COURSE_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COURSE_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COURSE_EDIT_SUCCESS:
      const editedCourse = action.payload;
      const empList = state.list.data;
      const updatedList = empList.map((item) => {
        if (item._id === editedCourse._id) {
          return editedCourse;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        list: { ...empList, data: updatedList },
      };
    case COURSE_EDIT_FAILURE:

    case COURSE_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COURSE_ADD_SUCCESS:
      let OldData = state.list.data;
      let NewData = action.payload.data.data;
      let FinalData = OldData.concat(NewData);
      let NewList = state.list;
      NewList["data"] = FinalData;
      return {
        ...state,
        loading: false,
        list: NewList,
      };

    case COURSE_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case RESET_ADMIN_COURSE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case RESET_ADMIN_COURSE_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case RESET_ADMIN_COURSE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
    default:
      return state;
  }
};

export default courseReducer;
