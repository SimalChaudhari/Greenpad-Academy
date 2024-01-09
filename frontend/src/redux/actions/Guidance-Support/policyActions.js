import { getPolicy } from '../../../services/Guidance-Support/policyServices';

// Action Types
export const POLICY_REQUEST = 'POLICY_REQUEST';
export const POLICY_SUCCESS = 'POLICY_SUCCESS';
export const POLICY_FAILURE = 'POLICY_FAILURE';


export const POLICY_RESET_REQUEST = 'POLICY_RESET_REQUEST';
export const POLICY_RESET_SUCCESS = 'POLICY_RESET_SUCCESS';
export const POLICY_RESET_FAILURE = 'POLICY_RESET_FAILURE';
// Action Creators

export const policyListRequest = () => ({
  type: POLICY_REQUEST,
});

export const policyListSuccess = (listings) => ({
  type: POLICY_SUCCESS,
  payload: listings,
});

export const policyListFailure = (error) => ({
  type: POLICY_FAILURE,
  payload: error,
});

export const policyListResetRequest = () => ({
  type: POLICY_RESET_REQUEST,
});

export const policyListResetSuccess = () => ({
  type: POLICY_RESET_SUCCESS,
  payload: null,
});

export const policyListResetFailure = (error) => ({
  type: POLICY_RESET_FAILURE,
  payload: error,
});


// Async Action Creator
export const getEmployeesPolicy = () => {
  return async (dispatch) => {
    dispatch(policyListRequest());
    
    try {
      const listings = await getPolicy();
      dispatch(policyListSuccess(listings));
      return listings
    } catch (error) {
      dispatch(policyListFailure(error));
    }
  };
};


export const resetEmployeesPolicy = () => {
  return async (dispatch) => {
    dispatch(policyListResetRequest());
    try {
        dispatch(policyListResetSuccess());
    } catch (error) {
      dispatch(policyListResetFailure(error.message));
    }
  };
};

