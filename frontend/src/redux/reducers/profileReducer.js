// Import any necessary dependencies
import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    } from '../actions/profileActions';
  
  const initialState = {
    loading: false,
    error: null,
    profile: {},
  };
  
  const companyReducer = (state = initialState, action) => {
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
          profile: action.payload,
        };
      case PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default companyReducer;
  