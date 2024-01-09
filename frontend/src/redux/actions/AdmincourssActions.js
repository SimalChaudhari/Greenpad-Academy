import { getAllCoursesList } from '../../services/AdmincourseService';

// Action Types
export const COURSE_LIST_REQUEST = 'COURSE_LIST_REQUEST';
export const COURSE_LIST_SUCCESS = 'COURSE_LIST_SUCCESS';
export const COURSE_LIST_FAILURE = 'COURSE_LIST_FAILURE';

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

export const getAllCourses = () => {
  
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

