// Import any necessary dependencies
import {
    EPC_REQUEST,
    EPC_SUCCESS,
    EPC_FAILURE,
    EPC_RESET_REQUEST,
    EPC_RESET_SUCCESS,
    EPC_RESET_FAILURE,
  } from "../../actions/Guidance-Support/programmecontactsActions.js";
  
  const initialState = {
    loading: false,
    error: null,
    list: [],
  };
  
  const programmecontactsReducer = (state = initialState, action) => {
    switch (action.type) {
        
      case EPC_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EPC_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      case EPC_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
        case EPC_RESET_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case EPC_RESET_SUCCESS:
          return {
            ...state,
            loading: false,
            list: null,
          };
        case EPC_RESET_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default programmecontactsReducer;
  