import { getProfileById } from '../../services/profileService';

// Action Types

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// Action Creators

export const profileRequest = () => ({
  type: PROFILE_REQUEST,
});

export const profileSuccess = (profile) => ({
  type: PROFILE_SUCCESS,
  payload: profile,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  payload: error,
});

// Async Action Creator

export const getProfile = (params) => {
  return async (dispatch) => {
    dispatch(profileRequest());

    try {
      // Call your company list service here and pass the params
      const profile = await getProfileById(params);
      // return profile,

      // Dispatch the company list Success action with the user data
      dispatch(profileSuccess(profile));
      return profile
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(profileFailure(error.message));
    }
  };
};
