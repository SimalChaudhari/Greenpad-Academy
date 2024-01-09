import {
  getPlans,
  addPlans,
  getPlansById,
  updatePlansById,
  deletePlan,
} from "../../../services/plans/plansServices";

// Action Types
export const PLANS_REQUEST = "PLANS_REQUEST";
export const PLANS_SUCCESS = "PLANS_SUCCESS";
export const PLANS_FAILURE = "PLANS_FAILURE";

export const PLANS_ADD_REQUEST = "PLANS_ADD_REQUEST";
export const PLANS_ADD_SUCCESS = "PLANS_ADD_SUCCESS";
export const PLANS_ADD_FAILURE = "PLANS_ADD_FAILURE";

export const PLANS_RESET_REQUEST = "PLANS_RESET_REQUEST";
export const PLANS_RESET_SUCCESS = "PLANS_RESET_SUCCESS";
export const PLANS_RESET_FAILURE = "PLANS_RESET_FAILURE";

export const GET_PLANS_REQUEST = "GET_PLANS_REQUEST";
export const GET_PLANS_SUCCESS = "GET_PLANS_SUCCESS";
export const GET_PLANS_FAILURE = "GET_PLANS_FAILURE";

export const PLANS_EDIT_REQUEST = "PLANS_EDIT_REQUEST";
export const PLANS_EDIT_SUCCESS = "PLANS_EDIT_SUCCESS";
export const PLANS_EDIT_FAILURE = "PLANS_EDIT_FAILURE";

export const DELETE_PLAN_REQUEST = 'DELETE_PLAN_REQUEST';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const DELETE_PLAN_FAILURE = 'DELETE_PLAN_FAILURE';
// Action Creators

export const plansListRequest = () => ({
  type: PLANS_REQUEST,
});

export const plansListSuccess = (listings) => ({
  type: PLANS_SUCCESS,
  payload: listings,
});

export const plansListFailure = (error) => ({
  type: PLANS_FAILURE,
  payload: error,
});

export const createPlansRequest = () => ({
  type: PLANS_ADD_REQUEST,
});

export const createPlansSuccess = (plans) => ({
  type: PLANS_ADD_SUCCESS,
  payload: plans,
});

export const createPlansFailure = (error) => ({
  type: PLANS_ADD_FAILURE,
  payload: error,
});

export const plansResetRequest = () => ({
  type: PLANS_RESET_REQUEST,
});

export const plansResetSuccess = () => ({
  type: PLANS_RESET_SUCCESS,
  payload: null,
});

export const plansResetFailure = (error) => ({
  type: PLANS_RESET_FAILURE,
  payload: error,
});

export const plansEditRequest = () => ({
  type: PLANS_EDIT_REQUEST,
});

export const plansEditSuccess = (useremployee) => ({
  type: PLANS_EDIT_SUCCESS,
  payload: useremployee,
});

export const plansEditFailure = (error) => ({
  type: PLANS_EDIT_FAILURE,
  payload: error,
});

export const deletePlanRequest = () => ({
  type: DELETE_PLAN_REQUEST,
});

export const deletePlanSuccess = (employeeId) => ({
  type: DELETE_PLAN_SUCCESS,
  payload: employeeId,
});

export const deletePlanFailure = (error) => ({
  type: DELETE_PLAN_FAILURE,
  payload: error,
});

export const plansRequest = () => ({
  type: GET_PLANS_REQUEST,
});

export const plansSuccess = (plans) => ({
  type: GET_PLANS_SUCCESS,
  payload: plans,
});

export const plansFailure = (error) => ({
  type: GET_PLANS_FAILURE,
  payload: error,
});

// Async Action Creator
export const fatchPlans = () => {
  return async (dispatch) => {
    dispatch(plansListRequest());

    try {
      const listings = await getPlans();
      dispatch(plansListSuccess(listings));
      return listings;
    } catch (error) {
      dispatch(plansListFailure(error.message));
    }
  };
};

export const createPlans = (plansData) => {
  return async (dispatch) => {
    dispatch(createPlansRequest());

    try {
      const createdPlans = await addPlans(plansData);
      dispatch(createPlansSuccess(createdPlans.data));

      return createdPlans;
    } catch (error) {
      // dispatch(createPlansFailure(error.response ? error.response.data.message : "An error occurred"));
      dispatch(createPlansFailure(error.message));
      return false;
    }
  };
};

export const getPlansBy = (params) => {
  return async (dispatch) => {
    dispatch(plansRequest());

    try {
      // Call your company list service here and pass the params
      const plans = await getPlansById(params);
      // return plans,

      // Dispatch the company list Success action with the user data
      dispatch(plansSuccess(plans));
      return plans;
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(plansFailure(error.message));
    }
  };
};

export const editPlansById = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(plansEditRequest());

    try {
      const editedEmployee1 = await updatePlansById(id, updatedData);
      // Dispatch the employees list Success action with the user data
      dispatch(plansEditSuccess(editedEmployee1.data));
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(
        plansEditFailure(
          error?.message || error?.data || error?.data?.message?.code
        )
      );
    }
  };
};

export const deletePlanById = (employeeId) => {
  return async (dispatch) => {
    dispatch(deletePlanRequest());

    try {
      // Call your delete employee service here and pass the employee ID
      await deletePlan(employeeId);

      // Dispatch the delete employee Success action with the employee ID
      dispatch(deletePlanSuccess(employeeId));
    } catch (error) {
      // Dispatch the delete employee Failure action with the error message
      dispatch(deletePlanFailure(error.message));
    }
  };
};

export const resetPlans = () => {
  return async (dispatch) => {
    dispatch(plansResetRequest());
    try {
      dispatch(plansResetSuccess());
    } catch (error) {
      dispatch(plansResetFailure(error.message));
    }
  };
};
