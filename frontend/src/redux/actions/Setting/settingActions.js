import { getSetting } from '../../../services/setting/settingServices';

// Action Types
export const SETTING_REQUEST = 'SETTING_REQUEST';
export const SETTING_SUCCESS = 'SETTING_SUCCESS';
export const SETTING_FAILURE = 'SETTING_FAILURE';

export const SETTING_RESET_REQUEST = 'SETTING_RESET_REQUEST';
export const SETTING_RESET_SUCCESS = 'SETTING_RESET_SUCCESS';
export const SETTING_RESET_FAILURE = 'SETTING_RESET_FAILURE';

// Action Creators

export const settingListRequest = () => ({
  type: SETTING_REQUEST,
});

export const settingListSuccess = (listings) => ({
  type: SETTING_SUCCESS,
  payload: listings,
});

export const settingListFailure = (error) => ({
  type: SETTING_FAILURE,
  payload: error,
});

export const settingResetRequest = () => ({
  type: SETTING_RESET_REQUEST,
});

export const settingResetSuccess = () => ({
  type: SETTING_RESET_SUCCESS,
  payload: null,
});

export const settingResetFailure = (error) => ({
  type: SETTING_RESET_FAILURE,
  payload: error,
});


// Async Action Creator
export const getEmpSetting = () => {
  return async (dispatch) => {
    dispatch(settingListRequest());
    
    try {
      const listings = await getSetting();
      dispatch(settingListSuccess(listings));
      return listings
    } catch (error) {
      dispatch(settingListFailure(error.message));
    }
  };
};

export const resetSetting = () => {
  return async (dispatch) => {
    dispatch(settingResetRequest());
    try {
        dispatch(settingResetSuccess());
    } catch (error) {
      dispatch(settingResetFailure(error.message));
    }
  };
};


