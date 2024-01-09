// Import any necessary dependencies
import {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
  
  CONTACTUS_ADD_REQUEST,
  CONTACTUS_ADD_SUCCESS,
  CONTACTUS_ADD_FAILURE,

  CONTACTUS_RESET_REQUEST,
  CONTACTUS_RESET_SUCCESS,
  CONTACTUS_RESET_FAILURE,

} from "../../actions/Guidance-Support/contactusActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const contactusReducer = (state = initialState, action) => {
  switch (action.type) {

    case LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


      case CONTACTUS_ADD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CONTACTUS_ADD_SUCCESS:
        return {
          ...state,
          loading: false,
          list: {
            ...state.list,
            data: [...state.list.data, ...[action.payload.data.data]],
          },
        };
      case CONTACTUS_ADD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case CONTACTUS_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CONTACTUS_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
        };
      case CONTACTUS_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default contactusReducer;
