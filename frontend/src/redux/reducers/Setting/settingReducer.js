// Import any necessary dependencies
import {
  SETTING_REQUEST,
  SETTING_SUCCESS,
  SETTING_FAILURE,
  SETTING_RESET_REQUEST,
  SETTING_RESET_SUCCESS,
  SETTING_RESET_FAILURE,
} from "../../actions/Setting/settingActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case SETTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case SETTING_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SETTING_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case SETTING_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};
export default policyReducer;
