import { getAllModule, deleteModule, editModule, getModuleById, addModule } from '../../../services/admin/moduleService';

// Action Types

export const MODULE_LIST_REQUEST = 'MODULE_LIST_REQUEST';
export const MODULE_LIST_SUCCESS = 'MODULE_LIST_SUCCESS';
export const MODULE_LIST_FAILURE = 'MODULE_LIST_FAILURE';

export const MODULE_DELETE_REQUEST = 'MODULE_DELETE_REQUEST';
export const MODULE_DELETE_SUCCESS = 'MODULE_DELETE_SUCCESS';
export const MODULE_DELETE_FAILURE = 'MODULE_DELETE_FAILURE';

export const MODULE_EDIT_REQUEST = 'MODULE_EDIT_REQUEST';
export const MODULE_EDIT_SUCCESS = 'MODULE_EDIT_SUCCESS';
export const MODULE_EDIT_FAILURE = 'MODULE_EDIT_FAILURE';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

export const MODULE_ADD_REQUEST = 'MODULE_ADD_REQUEST';
export const MODULE_ADD_SUCCESS = 'MODULE_ADD_SUCCESS';
export const MODULE_ADD_FAILURE = 'MODULE_ADD_FAILURE';

export const RESET_ADMIN_MODULE_REQUEST = 'RESET_ADMIN_MODULE_REQUEST';
export const RESET_ADMIN_MODULE_SUCCESS = 'RESET_ADMIN_MODULE_SUCCESS';
export const RESET_ADMIN_MODULE_FAILURE = 'RESET_ADMIN_MODULE_FAILURE';

// Action Creators

export const moduleListRequest = () => ({
  type: MODULE_LIST_REQUEST,
});

export const moduleListSuccess = (list) => ({
  type: MODULE_LIST_SUCCESS,
  payload: list,
});

export const moduleListFailure = (error) => ({
  type: MODULE_LIST_FAILURE,
  payload: error,
});

export const moduleDeleteRequest = () => ({
  type: MODULE_DELETE_REQUEST,
});

export const moduleDeleteSuccess = (employeeId) => ({
  type: MODULE_DELETE_SUCCESS,
  payload: employeeId,
});

export const moduleDeleteFailure = (error) => ({
  type: MODULE_DELETE_FAILURE,
  payload: error,
});

export const moduleEditRequest = () => ({
  type: MODULE_EDIT_REQUEST,
});

export const moduleEditSuccess = (users) => ({
  type: MODULE_EDIT_SUCCESS,
  payload: users,
});

export const moduleEditFailure = (error) => ({
  type: MODULE_EDIT_FAILURE,
  payload: error,
});

export const moduleRequest = () => ({
  type: GET_MODULE_REQUEST,
});

export const moduleSuccess = (module) => ({
  type: GET_MODULE_SUCCESS,
  payload: module,
});

export const moduleFailure = (error) => ({
  type: GET_MODULE_FAILURE,
  payload: error,
});

export const addModuleRequest = () => ({
  type: MODULE_ADD_REQUEST,
});

export const addModuleSuccess = (addModule) => ({
  type: MODULE_ADD_SUCCESS,
  payload: addModule,
});

export const addModuleFailure = (error) => ({
  type: MODULE_ADD_FAILURE,
  payload: error,
});

export const adminModuleResetRequest = () => ({
  type: RESET_ADMIN_MODULE_REQUEST,
});

export const adminModuleResetSuccess = () => ({
  type: RESET_ADMIN_MODULE_SUCCESS,
  payload: null,
});

export const adminModuleResetFailure = (error) => ({
  type: RESET_ADMIN_MODULE_FAILURE,
  payload: error,
});


// Async Action Creator

export const getAll = (id) => { 
  return async (dispatch) => {
    dispatch(moduleListRequest());

    try {
      // Call your MODULE list service here and pass the params
      const list = await getAllModule(id);
      
      // Dispatch the MODULE list Success action with the user data
      dispatch(moduleListSuccess(list));
      return list
    } catch (error) {
      // Dispatch the MODULE list Failure action with the error message
      dispatch(moduleListFailure(error?.message));
    }
  };
};

export const deleteModuleById = (data) => {
  return async (dispatch) => {
    dispatch(moduleDeleteRequest());

    try {
      // Call your MODULE list service here and pass the id
      const response = await deleteModule(data);
      dispatch(getAll(data?.CourseId));
      // Dispatch the MODULE list Success action with the user data
      if (response) {
        dispatch(moduleDeleteSuccess(data._id));
      }
    } catch (error) {
      // Dispatch the MODULE list Failure action with the error message
      dispatch(moduleDeleteFailure(error.message));
    }
  };
};

export const editModuleById = (formData) => {
  return async (dispatch) => {
    dispatch(moduleEditRequest());
    try {
      // Call your MODULE list service here and pass the formData
      const editedModule = await editModule(formData);
      if (editedModule) {
        dispatch(moduleEditSuccess(editedModule.data));
      }
    } catch (error) {
      // Dispatch the MODULE list Failure action with the error message
      dispatch(moduleEditFailure(error.message));
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

export const CreateModule = (courseId, params) => { 
  return async (dispatch) => {
    dispatch(addModuleRequest());
    try {
      // Call your MODULE list service here and pass the params
      const module = await addModule(courseId, params);
      // return MODULE,
      // Dispatch the MODULE list Success action with the user data
      dispatch(addModuleSuccess(module));
      return module
    } catch (error) {
      // Dispatch the module list Failure action with the error message
      dispatch(addModuleFailure(error.message));
    }
  };
};

export const resetAdminModule = () => {
  return async (dispatch) => {
    dispatch(adminModuleResetRequest());
    try {
        dispatch(adminModuleResetSuccess());
    } catch (error) {
      // Dispatch the employees list Failure action with the error message
      dispatch(adminModuleResetFailure(error.message));
    }
  };
};
