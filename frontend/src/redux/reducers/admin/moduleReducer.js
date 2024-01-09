// Import any necessary dependencies
import {
    MODULE_LIST_REQUEST,
    MODULE_LIST_SUCCESS,
    MODULE_LIST_FAILURE,

    MODULE_EDIT_REQUEST,
    MODULE_EDIT_SUCCESS,
    MODULE_EDIT_FAILURE,

    MODULE_DELETE_REQUEST,
    MODULE_DELETE_SUCCESS,
    MODULE_DELETE_FAILURE,

    MODULE_ADD_REQUEST,
    MODULE_ADD_SUCCESS,
    MODULE_ADD_FAILURE,

    RESET_ADMIN_MODULE_REQUEST,
    RESET_ADMIN_MODULE_SUCCESS,
    RESET_ADMIN_MODULE_FAILURE,
  
    } from '../../actions/admin/modulesActions';
  
  const initialState = {
    loading: false,
    users: null,
    error: null,
    list: [],
  };
  
  const moduleReducer = (state = initialState, action) => {
    switch (action.type) {
      case MODULE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case MODULE_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      case MODULE_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case MODULE_EDIT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case MODULE_EDIT_SUCCESS:
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
        
      case MODULE_EDIT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case MODULE_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case MODULE_DELETE_SUCCESS:
        const moduleslist = state.list.modules;
        const statelist = state.list;
        const data = moduleslist.filter((item) => item._id !== action.payload);
        return {
          ...state,
          loading: false,
          list: { ...statelist, modules: data },
        };
      case MODULE_DELETE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case MODULE_ADD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case MODULE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        // list: {
        //   ...state.list,
        //   modules: [...state.list.modules, action.payload.data], // Corrected line
        // },
      };
      case MODULE_ADD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    
        case RESET_ADMIN_MODULE_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case RESET_ADMIN_MODULE_SUCCESS:
          return {
            ...state,
            loading: false,
            list: null,
          };
        case RESET_ADMIN_MODULE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    
      default:
        return state;
    }
  };
  
  export default moduleReducer;
  