import { getAllCoursesList, getById } from '../../../services/employee/courseService';

// Action Types
export const EMPLOYEE_COURSE_LIST_REQUEST = 'EMPLOYEE_COURSE_LIST_REQUEST';
export const EMPLOYEE_COURSE_LIST_SUCCESS = 'EMPLOYEE_COURSE_LIST_SUCCESS';
export const EMPLOYEE_COURSE_LIST_FAILURE = 'EMPLOYEE_COURSE_LIST_FAILURE';

export const GET_EMPLOYEE_COURSE_REQUEST = 'GET_EMPLOYEE_COURSE_REQUEST';
export const GET_EMPLOYEE_COURSE_SUCCESS = 'GET_EMPLOYEE_COURSE_SUCCESS';
export const GET_EMPLOYEE_COURSE_FAILURE = 'GET_EMPLOYEE_COURSE_FAILURE';

export const EMPLOYEE_COURSES_RESET_REQUEST = 'EMPLOYEE_COURSES_RESET_REQUEST';
export const EMPLOYEE_COURSES_RESET_SUCCESS = 'EMPLOYEE_COURSES_RESET_SUCCESS';
export const EMPLOYEE_COURSES_RESET_FAILURE = 'EMPLOYEE_COURSES_RESET_FAILURE';

// Action Creators

export const coursesListRequest = () => ({
  type: EMPLOYEE_COURSE_LIST_REQUEST,
});

export const coursesListSuccess = (list) => ({
  type: EMPLOYEE_COURSE_LIST_SUCCESS,
  payload: list,
});

export const coursesListFailure = (error) => ({
  type: EMPLOYEE_COURSE_LIST_FAILURE,
  payload: error,
});

// get by Id
export const courseRequest = () => ({
  type: GET_EMPLOYEE_COURSE_REQUEST,
});

export const courseSuccess = (course) => ({
  type: GET_EMPLOYEE_COURSE_SUCCESS,
  payload: course,
});

export const courseFailure = (error) => ({
  type: GET_EMPLOYEE_COURSE_FAILURE,
  payload: error,
});

export const employeeCoursesResetRequest = () => ({
  type: EMPLOYEE_COURSES_RESET_REQUEST,
});

export const employeeCoursesResetSuccess = () => ({
  type: EMPLOYEE_COURSES_RESET_SUCCESS,
  payload: null,
});

export const employeeCoursesResetFailure = (error) => ({
  type: EMPLOYEE_COURSES_RESET_FAILURE,
  payload: error,
});


export const getAllEmployeeCourses = () => {
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


export const resetEmployeeCourses = () => {
  return async (dispatch) => {
    dispatch(employeeCoursesResetRequest());
    try {
        dispatch(employeeCoursesResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeeCoursesResetFailure(error.message));
    }
  };
};