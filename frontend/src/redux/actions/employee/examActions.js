import { getExam } from '../../../services/employee/ExamService';
import { getToken } from '../../../services/authService';
const Auth = { authorization: getToken() }


// Action Types

export const EXAM_REQUEST = 'EXAM_REQUEST';
export const EXAM_SUCCESS = 'EXAM_SUCCESS';
export const EXAM_FAILURE = 'EXAM_FAILURE';

export const EXAM_RESET_REQUEST = 'EXAM_RESET_REQUEST';
export const EXAM_RESET_SUCCESS = 'EXAM_RESET_SUCCESS';
export const EXAM_RESET_FAILURE = 'EXAM_RESET_FAILURE';
// Action Creators


export const examRequest = () => ({
  type: EXAM_REQUEST,
});

export const examSuccess = (exam) => ({
  type: EXAM_SUCCESS,
  payload: exam,
});

export const examFailure = (error) => ({
  type: EXAM_FAILURE,
  payload: error,
});

export const examResetRequest = () => ({
  type: EXAM_RESET_REQUEST,
});

export const examResetSuccess = () => ({
  type: EXAM_RESET_SUCCESS,
  payload: null,
});

export const examResetFailure = (error) => ({
  type: EXAM_RESET_FAILURE,
  payload: error,
});

// Async Action Creator

export const getEmployeeExam = () => {
  return async (dispatch) => {
    dispatch(examRequest());
    try {
      // Call your company list service here and pass the params
      const exam = await getExam();
      // return exam,

      // Dispatch the company list Success action with the user data
      dispatch(examSuccess(exam));
      return exam
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(examFailure(error.message));
    }
  };
};

export const resetExam = () => {
  return async (dispatch) => {
    dispatch(examResetRequest());
    try {
        dispatch(examResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(examResetFailure(error.message));
    }
  };
};
