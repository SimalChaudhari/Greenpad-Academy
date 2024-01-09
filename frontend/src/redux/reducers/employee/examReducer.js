// Import any necessary dependencies
import {
  EXAM_REQUEST,
  EXAM_SUCCESS,
  EXAM_FAILURE,
  EXAM_RESET_REQUEST,
  EXAM_RESET_SUCCESS,
  EXAM_RESET_FAILURE,
} from "../../actions/employee/examActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EXAM_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case EXAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case EXAM_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EXAM_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case EXAM_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default examReducer;
