import { getAllModule, getModuleById, updateModuleProgress, getAllModuleProgress, getModuleProgress, editEmployeeNotes, deleteEmployeeNotes, editEmployeeNotes1 } from '../../../services/employee/moduleService';

export const EMPLOYEE_MODULE_LIST_REQUEST = 'EMPLOYEE_MODULE_LIST_REQUEST';
export const EMPLOYEE_MODULE_LIST_SUCCESS = 'EMPLOYEE_MODULE_LIST_SUCCESS';
export const EMPLOYEE_MODULE_LIST_FAILURE = 'EMPLOYEE_MODULE_LIST_FAILURE';

export const EMPLOYEE_MODULE_DELETE_REQUEST = 'EMPLOYEE_MODULE_DELETE_REQUEST';
export const EMPLOYEE_MODULE_DELETE_SUCCESS = 'EMPLOYEE_MODULE_DELETE_SUCCESS';
export const EMPLOYEE_MODULE_DELETE_FAILURE = 'EMPLOYEE_MODULE_DELETE_FAILURE';

export const EMPLOYEE_MODULE_EDIT_REQUEST = 'EMPLOYEE_MODULE_EDIT_REQUEST';
export const EMPLOYEE_MODULE_EDIT_SUCCESS = 'EMPLOYEE_MODULE_EDIT_SUCCESS';
export const EMPLOYEE_MODULE_EDIT_FAILURE = 'EMPLOYEE_MODULE_EDIT_FAILURE';

export const GET_EMPLOYEE_MODULE_REQUEST = 'GET_EMPLOYEE_MODULE_REQUEST';
export const GET_EMPLOYEE_MODULE_SUCCESS = 'GET_EMPLOYEE_MODULE_SUCCESS';
export const GET_EMPLOYEE_MODULE_FAILURE = 'GET_EMPLOYEE_MODULE_FAILURE';

export const EMPLOYEE_MODULE_ADD_REQUEST = 'EMPLOYEE_MODULE_ADD_REQUEST';
export const EMPLOYEE_MODULE_ADD_SUCCESS = 'EMPLOYEE_MODULE_ADD_SUCCESS';
export const EMPLOYEE_MODULE_ADD_FAILURE = 'EMPLOYEE_MODULE_ADD_FAILURE';

export const UPDATE_EMPLOYEE_MODULE_REQUEST = 'UPDATE_EMPLOYEE_MODULE_REQUEST';
export const UPDATE_EMPLOYEE_MODULE_SUCCESS = 'UPDATE_EMPLOYEE_MODULE_SUCCESS';
export const UPDATE_EMPLOYEE_MODULE_FAILURE = 'UPDATE_EMPLOYEE_MODULE_FAILURE';

export const MODULE_PROGRESS_LIST_REQUEST = 'MODULE_PROGRESS_LIST_REQUEST';
export const MODULE_PROGRESS_LIST_SUCCESS = 'MODULE_PROGRESS_LIST_SUCCESS';
export const MODULE_PROGRESS_LIST_FAILURE = 'MODULE_PROGRESS_LIST_FAILURE';

export const EMPLOYEES_NOTE_EDIT_REQUEST = 'EMPLOYEES_NOTE_EDIT_REQUEST';
export const EMPLOYEES_NOTE_EDIT_SUCCESS = 'EMPLOYEES_NOTE_EDIT_SUCCESS';
export const EMPLOYEES_NOTE_EDIT_FAILURE = 'EMPLOYEES_NOTE_EDIT_FAILURE';

export const EMPLOYEE_MODULE_RESET_REQUEST = 'EMPLOYEE_MODULE_RESET_REQUEST';
export const EMPLOYEE_MODULE_RESET_SUCCESS = 'EMPLOYEE_MODULE_RESET_SUCCESS';
export const EMPLOYEE_MODULE_RESET_FAILURE = 'EMPLOYEE_MODULE_RESET_FAILURE';

export const EMPLOYEES_NOTE_EDIT_1_REQUEST = 'EMPLOYEES_NOTE_EDIT_1_REQUEST';
export const EMPLOYEES_NOTE_EDIT_1_SUCCESS = 'EMPLOYEES_NOTE_EDIT_1_SUCCESS';
export const EMPLOYEES_NOTE_EDIT_1_FAILURE = 'EMPLOYEES_NOTE_EDIT_1_FAILURE';

export const EMPLOYEES_NOTE_DELETE_REQUEST = 'EMPLOYEES_NOTE_DELETE_REQUEST';
export const EMPLOYEES_NOTE_DELETE_SUCCESS = 'EMPLOYEES_NOTE_DELETE_SUCCESS';
export const EMPLOYEES_NOTE_DELETE_FAILURE = 'EMPLOYEES_NOTE_DELETE_FAILURE';

// Action Creators

export const moduleListRequest = () => ({
  type: EMPLOYEE_MODULE_LIST_REQUEST,
});

export const moduleListSuccess = (list) => ({
  type: EMPLOYEE_MODULE_LIST_SUCCESS,
  payload: list,
});

export const moduleListFailure = (error) => ({
  type: EMPLOYEE_MODULE_LIST_FAILURE,
  payload: error,
});

// get Progress
export const moduleProgreeListRequest = () => ({
  type: MODULE_PROGRESS_LIST_REQUEST,
});

export const moduleProgreeListSuccess = (list) => ({
  type: MODULE_PROGRESS_LIST_SUCCESS,
  payload: list,
});

export const moduleProgreeListFailure = (error) => ({
  type: MODULE_PROGRESS_LIST_FAILURE,
  payload: error,
});

export const moduleRequest = () => ({
  type: GET_EMPLOYEE_MODULE_REQUEST,
});

export const moduleSuccess = (module) => ({
  type: GET_EMPLOYEE_MODULE_SUCCESS,
  payload: module,
});

export const moduleFailure = (error) => ({
  type: GET_EMPLOYEE_MODULE_FAILURE,
  payload: error,
});

// update module progress
export const updateModuleRequest = () => ({
  type: UPDATE_EMPLOYEE_MODULE_REQUEST,
});

export const updateModuleSuccess = (module) => ({
  type: UPDATE_EMPLOYEE_MODULE_SUCCESS,
  payload: module,
});

export const updateModuleFailure = (error) => ({
  type: UPDATE_EMPLOYEE_MODULE_FAILURE,
  payload: error,
});


export const employeesNoteEditRequest = () => ({
  type: EMPLOYEES_NOTE_EDIT_REQUEST,
});

export const employeesNoteEditSuccess = (users) => {
  return {
    type: EMPLOYEES_NOTE_EDIT_SUCCESS,
    payload: users,
  };
};

export const employeesNoteEditFailure = (error) => ({
  type: EMPLOYEES_NOTE_EDIT_FAILURE,
  payload: error,
});

export const employeeModuleResetRequest = () => ({
  type: EMPLOYEE_MODULE_RESET_REQUEST,
});

export const employeeModuleResetSuccess = () => ({
  type: EMPLOYEE_MODULE_RESET_SUCCESS,
  payload: null,
});

export const employeeModuleResetFailure = (error) => ({
  type: EMPLOYEE_MODULE_RESET_FAILURE,
  payload: error,
});


export const employeesNoteEdit1Request = () => ({
  type: EMPLOYEES_NOTE_EDIT_1_REQUEST,
});

export const employeesNoteEdit1Success = (users) => {
  return {
    type: EMPLOYEES_NOTE_EDIT_1_SUCCESS,
    payload: users,
  };
};

export const employeesNoteEdit1Failure = (error) => ({
  type: EMPLOYEES_NOTE_EDIT_1_FAILURE,
  payload: error,
});

export const employeesNoteDeleteRequest = () => ({
  type: EMPLOYEES_NOTE_DELETE_REQUEST,
});

export const employeesNoteDeleteSuccess = (users) => {
  return {
    type: EMPLOYEES_NOTE_DELETE_SUCCESS,
    payload: users,
  };
};

export const employeesNoteDeleteFailure = (error) => ({
  type: EMPLOYEES_NOTE_DELETE_FAILURE,
  payload: error,
});
// Async Action Creator

export const getAll = (id) => {
  return async (dispatch) => {
    dispatch(moduleListRequest());

    try {
      const list = await getAllModule(id);

      dispatch(moduleListSuccess(list));
      return list
    } catch (error) {
      dispatch(moduleListFailure(error.message));
    }
  };
};

export const getModulesProgress = (id) => {
  return async (dispatch) => {
    dispatch(moduleProgreeListRequest());

    try {
      const list = await getModuleProgress(id);

      dispatch(moduleProgreeListSuccess(list));
      return list
    } catch (error) {
      dispatch(moduleProgreeListFailure(error.message));
    }
  };
};

export const getAllModulesProgress = () => {
  return async (dispatch) => {
    dispatch(moduleProgreeListRequest());

    try {
      const list = await getAllModuleProgress();

      dispatch(moduleProgreeListSuccess(list));
      return list
    } catch (error) {
      dispatch(moduleProgreeListFailure(error.message));
    }
  };
};

export const getById = (params) => {
  return async (dispatch) => {
    dispatch(moduleRequest());

    try {
      const module = await getModuleById(params);
      dispatch(moduleSuccess(module));
      return module
    } catch (error) {
      dispatch(moduleFailure(error.message));
    }
  };
};

export const updateProgress = (courseData) => {
  return async (dispatch) => {
    dispatch(updateModuleRequest());

    try {
      const module = await updateModuleProgress(courseData);
      dispatch(updateModuleSuccess(module));
      
      dispatch(moduleProgreeListSuccess(module?.moduleProgressForCourse));
      return module
    } catch (error) {
      dispatch(updateModuleFailure(error.message));
    }
  };
};

export const getupdateProgressModule = (id) => {
  return async (dispatch) => {
    dispatch(updateModuleRequest());

    try {
      const module = await updateModuleProgress(id);
      dispatch(updateModuleSuccess(module));
      return module
    } catch (error) {
      dispatch(updateModuleFailure(error.message));
    }
  };
};

export const editEmployeeNoteById = (id, updatedData) => {
  
  return async (dispatch) => {
    
    dispatch(employeesNoteEditRequest());

    // Call your employeesNote list service here and pass the id
    const editedEmployee = await editEmployeeNotes(id, updatedData);
    console.log({updatedData})
    dispatch(getAll(updatedData.courseId));
    dispatch(getModulesProgress(updatedData.courseId));

    try { 
      // Dispatch the employeesNote list Success action with the user data
      if (editedEmployee?.data?.moduleProgressEntry?.module) {
        dispatch(employeesNoteEditSuccess(editedEmployee?.data?.moduleProgressEntry));
      }
    } catch (error) {
      // Dispatch the employeesNote list Failure action with the error message
      dispatch(employeesNoteEditFailure(error.message));
    }
  };
};


export const deleteEmployeeNoteById = (updatedData) => {
  
  return async (dispatch) => {
    
    dispatch(employeesNoteDeleteRequest());

    // Call your employeesNote list service here and pass the id
    const editedEmployee = await deleteEmployeeNotes(updatedData);
    
    dispatch(getAll(updatedData.courseId));
    dispatch(getModulesProgress(updatedData.courseId));

    try { 
      // Dispatch the employeesNote list Success action with the user data
      if (editedEmployee?.data?.moduleProgressEntry?.module) {
        dispatch(employeesNoteDeleteSuccess(editedEmployee?.data?.moduleProgressEntry));
      }
    } catch (error) {
      // Dispatch the employeesNote list Failure action with the error message
      dispatch(employeesNoteDeleteFailure(error.message));
    }
  };
};


export const EditEmployeeNote1ById = (updatedData) => {
  
  return async (dispatch) => {
    
    dispatch(employeesNoteEdit1Request());

    // Call your employeesNote list service here and pass the id
    const editedEmployee = await editEmployeeNotes1(updatedData);
    
    dispatch(getAll(updatedData?.courseId));
    dispatch(getModulesProgress(updatedData?.courseId));

    try { 
      // Dispatch the employeesNote list Success action with the user data
      if (editedEmployee) {
        dispatch(employeesNoteEdit1Success(editedEmployee?.data?.moduleProgressEntry));
      }
    } catch (error) {
      // Dispatch the employeesNote list Failure action with the error message
      dispatch(employeesNoteEdit1Failure(error.message));
    }
  };
};

export const resetEmployeeModule = () => {
  return async (dispatch) => {
    dispatch(employeeModuleResetRequest());
    try {
        dispatch(employeeModuleResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(employeeModuleResetFailure(error.message));
    }
  };
};