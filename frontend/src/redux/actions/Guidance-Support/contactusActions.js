import { addContactus, getContactus } from '../../../services/Guidance-Support/contactusServices';

// Action Types
export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAILURE = 'LIST_FAILURE';

export const CONTACTUS_ADD_REQUEST = 'CONTACTUS_ADD_REQUEST';
export const CONTACTUS_ADD_SUCCESS = 'CONTACTUS_ADD_SUCCESS';
export const CONTACTUS_ADD_FAILURE = 'CONTACTUS_ADD_FAILURE';

export const CONTACTUS_RESET_REQUEST = 'CONTACTUS_RESET_REQUEST';
export const CONTACTUS_RESET_SUCCESS = 'CONTACTUS_RESET_SUCCESS';
export const CONTACTUS_RESET_FAILURE = 'CONTACTUS_RESET_FAILURE';
// Action Creators

export const contactusListRequest = () => ({
  type: LIST_REQUEST,
});

export const contactusListSuccess = (listings) => ({
  type: LIST_SUCCESS,
  payload: listings,
});

export const contactusListFailure = (error) => ({
  type: LIST_FAILURE,
  payload: error,
});


export const addContactusRequest = () => ({
  type: CONTACTUS_ADD_REQUEST,
});

export const addContactusSuccess = (addContactus) => ({
  type: CONTACTUS_ADD_SUCCESS,
  payload: addContactus,
});

export const addContactusFailure = (error) => ({
  type: CONTACTUS_ADD_FAILURE,
  payload: error,
});

export const contactusResetRequest = () => ({
  type: CONTACTUS_RESET_REQUEST,
});

export const contactusResetSuccess = () => ({
  type: CONTACTUS_RESET_SUCCESS,
  payload: null,
});

export const contactusResetFailure = (error) => ({
  type: CONTACTUS_RESET_FAILURE,
  payload: error,
});

// Async Action Creator
export const getContacts = () => {
  return async (dispatch) => {
    dispatch(contactusListRequest());
    
    try {
      const listings = await getContactus();
      dispatch(contactusListSuccess(listings));
      return listings
    } catch (error) {
      dispatch(contactusListFailure(error.message));
    }
  };
};


export const CreateContactus = (params) => {
  return async (dispatch) => {
    dispatch(addContactusRequest());
    try {
      const contactus = await addContactus(params);
      dispatch(addContactusSuccess(contactus));
      return contactus
    } catch (error) {
      dispatch(addContactusFailure(error.message));
    }
  };
};

export const resetContactus = () => {
  return async (dispatch) => {
    dispatch(contactusResetRequest());
    try {
        dispatch(contactusResetSuccess());
    } catch (error) {
      dispatch(contactusResetFailure(error.message));
    }
  };
};