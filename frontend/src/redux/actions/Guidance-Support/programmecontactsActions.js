import { getProgrammeContacts } from '../../../services/Guidance-Support/programmecontactsServices';

// Action Types
export const EPC_REQUEST = 'EPC_REQUEST';
export const EPC_SUCCESS = 'EPC_SUCCESS';
export const EPC_FAILURE = 'EPC_FAILURE';

export const EPC_RESET_REQUEST = 'EPC_RESET_REQUEST';
export const EPC_RESET_SUCCESS = 'EPC_RESET_SUCCESS';
export const EPC_RESET_FAILURE = 'POLICY_RESET_FAILURE';
// Action Creators

export const programmecontactsListRequest = () => ({
  type: EPC_REQUEST,
});

export const programmecontactsListSuccess = (listings) => ({
  type: EPC_SUCCESS,
  payload: listings,
});

export const programmecontactsListFailure = (error) => ({
  type: EPC_FAILURE,
  payload: error,
});

export const programmecontactsListResetRequest = () => ({
  type: EPC_RESET_REQUEST,
});

export const programmecontactsListResetSuccess = () => ({
  type: EPC_RESET_SUCCESS,
  payload: null,
});

export const programmecontactsListResetFailure = (error) => ({
  type: EPC_RESET_FAILURE,
  payload: error,
});


// Async Action Creator
export const getEmployeesProgrammeContacts = () => {
  return async (dispatch) => {
    dispatch(programmecontactsListRequest());
    
    try {
      const listings = await getProgrammeContacts();
      dispatch(programmecontactsListSuccess(listings));
      return listings
    } catch (error) {
      dispatch(programmecontactsListFailure(error));
    }
  };
};

export const resetProgrammeContactsList = () => {
  return async (dispatch) => {
    dispatch(programmecontactsListResetRequest());
    try {
        dispatch(programmecontactsListResetSuccess());
    } catch (error) {
      dispatch(programmecontactsListResetFailure(error.message));
    }
  };
};

