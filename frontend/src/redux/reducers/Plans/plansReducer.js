// Import any necessary dependencies
import {
  PLANS_REQUEST,
  PLANS_SUCCESS,
  PLANS_FAILURE,
  PLANS_RESET_REQUEST,
  PLANS_RESET_SUCCESS,
  PLANS_RESET_FAILURE,
  PLANS_ADD_REQUEST,
  PLANS_ADD_SUCCESS,
  PLANS_ADD_FAILURE,
  PLANS_EDIT_REQUEST,
  PLANS_EDIT_SUCCESS,
  PLANS_EDIT_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from "../../actions/Plans/plansActions.js";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const plansReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLANS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case PLANS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PLANS_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PLANS_ADD_SUCCESS:
      let OldData = state.list.data;
      let NewData = action.payload.data;
      let FinalData = OldData.concat(NewData);
      let NewList = state.list;
      NewList["totalRecods"] = FinalData.length;
      NewList["data"] = FinalData;
      return {
        ...state,
        loading: false,
        list: NewList,
      };
    case PLANS_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PLANS_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PLANS_EDIT_SUCCESS:
      const editedPlans = action.payload;
      const planList = state.list.data;
      const updatedList = planList.map((item) => {
        if (item._id === editedPlans._id) {
          return editedPlans;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        list: { data: updatedList },
      };

    case PLANS_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case DELETE_PLAN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_PLAN_SUCCESS:
        const existingList = state.list.data;
        const updatedData = existingList.filter(
          (item) => item._id !== action.payload
          );
        return {
          ...state,
          loading: false,
          list: { ...state.list, data: updatedData },
        };
      case DELETE_PLAN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    case PLANS_RESET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PLANS_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        list: null,
      };
    case PLANS_RESET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default plansReducer;
