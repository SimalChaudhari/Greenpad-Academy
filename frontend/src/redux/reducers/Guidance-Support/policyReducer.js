// Import any necessary dependencies
import {
    POLICY_REQUEST,
    POLICY_SUCCESS,
    POLICY_FAILURE,
    POLICY_RESET_REQUEST,
    POLICY_RESET_SUCCESS,
    POLICY_RESET_FAILURE,
  } from "../../actions/Guidance-Support/policyActions.js";
  
  const initialState = {
    loading: false,
    error: null,
    list: [],
  };
  
  const policyReducer = (state = initialState, action) => {
    switch (action.type) {
        
      case POLICY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case POLICY_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      case POLICY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case POLICY_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case POLICY_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case POLICY_RESET_FAILURE:
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
  