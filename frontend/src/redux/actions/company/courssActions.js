import { getAllCoursesList, getById } from '../../../services/company/courseService';

// Action Types
export const COURSE_LIST_REQUEST = 'COURSE_LIST_REQUEST';
export const COURSE_LIST_SUCCESS = 'COURSE_LIST_SUCCESS';
export const COURSE_LIST_FAILURE = 'COURSE_LIST_FAILURE';

export const GET_COURSE_REQUEST = 'GET_COURSE_REQUEST';
export const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
export const GET_COURSE_FAILURE = 'GET_COURSE_FAILURE';

export const COMPANY_COURSES_RESET_REQUEST = 'COMPANY_COURSES_RESET_REQUEST';
export const COMPANY_COURSES_RESET_SUCCESS = 'COMPANY_COURSES_RESET_SUCCESS';
export const COMPANY_COURSES_RESET_FAILURE = 'COMPANY_COURSES_RESET_FAILURE';

// Action Creators

export const coursesListRequest = () => ({
  type: COURSE_LIST_REQUEST,
});

export const coursesListSuccess = (list) => ({
  type: COURSE_LIST_SUCCESS,
  payload: list,
});

export const coursesListFailure = (error) => ({
  type: COURSE_LIST_FAILURE,
  payload: error,
});

// get by Id
export const courseRequest = () => ({
  type: GET_COURSE_REQUEST,
});

export const courseSuccess = (course) => ({
  type: GET_COURSE_SUCCESS,
  payload: course,
});

export const courseFailure = (error) => ({
  type: GET_COURSE_FAILURE,
  payload: error,
});


export const companyCoursesResetRequest = () => ({
  type: COMPANY_COURSES_RESET_REQUEST,
});

export const companyCoursesResetSuccess = () => ({
  type: COMPANY_COURSES_RESET_SUCCESS,
  payload: null,
});

export const companyCoursesResetFailure = (error) => ({
  type: COMPANY_COURSES_RESET_FAILURE,
  payload: error,
});


export const getAllConpanyCourses = () => {
  return async (dispatch) => {
    dispatch(coursesListRequest());

    try {
      // Call your courses list service here and pass the params
      const list = await getAllCoursesList();

      // Dispatch the courses list Success action with the user data
      dispatch(coursesListSuccess(list));
      return list
    } catch (error) {
      // Dispatch the courses list Failure action with the error message
      dispatch(coursesListFailure(error.message));
    }
  };
};

export const getCoursesById = (params) => {
  return async (dispatch) => {
    dispatch(courseRequest());

    try {
      const data = await getById(params);
      dispatch(courseSuccess(data));
      return data
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(courseFailure(error.message));
    }
  };
};


export const resetCompanyCourses = () => {
  return async (dispatch) => {
    dispatch(companyCoursesResetRequest());
    try {
        dispatch(companyCoursesResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(companyCoursesResetFailure(error.message));
    }
  };
};