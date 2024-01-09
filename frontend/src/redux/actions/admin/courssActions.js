import { getAllCoursesList, editCourses, deleteCourses, getById, addCourse, editCoursesModule, deleteCoursesModule, addCoursesModule } from '../../../services/admin/courseService';
import { getAll } from '../../actions/admin/modulesActions';

// Action Types
export const COURSE_LIST_REQUEST = 'COURSE_LIST_REQUEST';
export const COURSE_LIST_SUCCESS = 'COURSE_LIST_SUCCESS';
export const COURSE_LIST_FAILURE = 'COURSE_LIST_FAILURE';

export const COURSE_DELETE_REQUEST = 'COURSE_DELETE_REQUEST';
export const COURSE_DELETE_SUCCESS = 'COURSE_DELETE_SUCCESS';
export const COURSE_DELETE_FAILURE = 'COURSE_DELETE_FAILURE';

export const COURSE_EDIT_REQUEST = 'COURSE_EDIT_REQUEST';
export const COURSE_EDIT_SUCCESS = 'COURSE_EDIT_SUCCESS';
export const COURSE_EDIT_FAILURE = 'COURSE_EDIT_FAILURE';

export const COURSE_ADD_REQUEST = 'COURSE_ADD_REQUEST';
export const COURSE_ADD_SUCCESS = 'COURSE_ADD_SUCCESS';
export const COURSE_ADD_FAILURE = 'COURSE_ADD_FAILURE';

export const GER_COURSE_REQUEST = 'GER_COURSE_REQUEST';
export const GER_COURSE_SUCCESS = 'GER_COURSE_SUCCESS';
export const GER_COURSE_FAILURE = 'GER_COURSE_FAILURE';

export const RESET_ADMIN_COURSE_REQUEST = 'RESET_ADMIN_COURSE_REQUEST';
export const RESET_ADMIN_COURSE_SUCCESS = 'RESET_ADMIN_COURSE_SUCCESS';
export const RESET_ADMIN_COURSE_FAILURE = 'RESET_ADMIN_COURSE_FAILURE';

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
  type: GER_COURSE_REQUEST,
});

export const courseSuccess = (course) => ({
  type: GER_COURSE_SUCCESS,
  payload: course,
});

export const courseFailure = (error) => ({
  type: GER_COURSE_FAILURE,
  payload: error,
});


export const courseDeleteRequest = () => ({
  type: COURSE_DELETE_REQUEST,
});

export const courseDeleteSuccess = (employeeId) => ({
  type: COURSE_DELETE_SUCCESS,
  payload: employeeId,
});

export const courseDeleteFailure = (error) => ({
  type: COURSE_DELETE_FAILURE,
  payload: error,
});

export const courseEditRequest = () => ({
  type: COURSE_EDIT_REQUEST,
});

export const courseEditSuccess = (users) => ({
  type: COURSE_EDIT_SUCCESS,
  payload: users,
});

export const courseEditFailure = (error) => ({
  type: COURSE_EDIT_FAILURE,
  payload: error,
});

export const addCourseRequest = () => ({
  type: COURSE_ADD_REQUEST,
});

export const addCourseSuccess = (addCourse) => ({
  type: COURSE_ADD_SUCCESS,
  payload: addCourse,
});

export const addCourseFailure = (error) => ({
  type: COURSE_ADD_FAILURE,
  payload: error,
});

export const adminCourseResetRequest = () => ({
  type: RESET_ADMIN_COURSE_REQUEST,
});

export const adminCourseResetSuccess = () => ({
  type: RESET_ADMIN_COURSE_SUCCESS,
  payload: null,
});

export const adminCourseResetFailure = (error) => ({
  type: RESET_ADMIN_COURSE_FAILURE,
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

export const deleteCoursesById = (id) => {
  return async (dispatch) => {
    dispatch(courseDeleteRequest());

    try {
      // Call your course list service here and pass the id
      const deletedCourses = await deleteCourses(id);

      // Dispatch the course list Success action with the user data
      if (deletedCourses) {
        dispatch(courseDeleteSuccess(id));
      }
    } catch (error) {
      // Dispatch the course list Failure action with the error message
      dispatch(courseDeleteFailure(error.message));
    }
  };
};

export const editCoursesById = (id, courseData) => {
  return async (dispatch) => {
    dispatch(courseEditRequest());
    try {
      // Call your course list service here and pass the id
      const editedCourses = await editCourses(id, courseData);
      // Dispatch the course list Success action with the user data
      if (editedCourses?.data?.data?._id) {
        dispatch(courseEditSuccess(editedCourses?.data?.data));
      }
    } catch (error) {
      // Dispatch the course list Failure action with the error message
      dispatch(courseEditFailure(error.message));
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

export const CreateCourse = (params) => {
  return async (dispatch) => {
    dispatch(addCourseRequest());
    try {
      // Call your company list service here and pass the params
      const course = await addCourse(params);
      // return course,
      // Dispatch the company list Success action with the user data
      dispatch(addCourseSuccess(course));
      return course
    } catch (error) {
      // Dispatch the company list Failure action with the error message
      dispatch(addCourseFailure(error.message));
    }
  };
};

export const resetAdminCourse = () => {
  return async (dispatch) => {
    dispatch(adminCourseResetRequest());
    try {
        dispatch(adminCourseResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(adminCourseResetFailure(error.message));
    }
  };
};

export const editCoursesModuleById = (id, courseData) => {
  return async (dispatch) => {
    try {
      const editedCourses = await editCoursesModule(id, courseData);
      dispatch(getAll(editedCourses?.data?.data?._id));
    } catch (error) {
    }
  };
};

export const deleteCoursesModuleById = (courseData) => {
  return async (dispatch) => {
    try {
      const deletedCourses = await deleteCoursesModule(courseData);
      dispatch(getAll(deletedCourses?.data?.data?._id));
    } catch (error) {
      console.log('error: ', error?.data?.message);
    }
  };
};


export const addCoursesModuleById = (courseData) => {
  return async (dispatch) => {
    try {
      const addedCourseCourses = await addCoursesModule(courseData);
      dispatch(getAll(addedCourseCourses?.data?.data?._id));
    } catch (error) {
      console.log('error: ', error.data.message);
    }
  };
};