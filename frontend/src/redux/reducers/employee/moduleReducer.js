// Import any necessary dependencies
import {
  EMPLOYEE_MODULE_LIST_REQUEST,
  EMPLOYEE_MODULE_LIST_SUCCESS,
  EMPLOYEE_MODULE_LIST_FAILURE,
  MODULE_PROGRESS_LIST_REQUEST,
  MODULE_PROGRESS_LIST_SUCCESS,
  MODULE_PROGRESS_LIST_FAILURE,
  UPDATE_EMPLOYEE_MODULE_REQUEST,
  UPDATE_EMPLOYEE_MODULE_SUCCESS,
  UPDATE_EMPLOYEE_MODULE_FAILURE,
  EMPLOYEES_NOTE_EDIT_REQUEST,
  EMPLOYEES_NOTE_EDIT_SUCCESS,
  EMPLOYEES_NOTE_EDIT_FAILURE,
  EMPLOYEE_MODULE_RESET_REQUEST,
  EMPLOYEE_MODULE_RESET_SUCCESS,
  EMPLOYEE_MODULE_RESET_FAILURE,
} from "../../actions/employee/modulesActions";

const initialState = {
  loading: false,
  error: null,
  list: [],
  progress_list: [], // Initialize the progress list array
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_MODULE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMPLOYEE_MODULE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case EMPLOYEE_MODULE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // New cases for module progress list
    case MODULE_PROGRESS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MODULE_PROGRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        progress_list: action.payload, // Set the progress list
      };
    case MODULE_PROGRESS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // New cases for module progress list
    case UPDATE_EMPLOYEE_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_EMPLOYEE_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        progress_list: action.payload.moduleProgressForCourse, // Set the progress list
      };
    case UPDATE_EMPLOYEE_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EMPLOYEES_NOTE_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMPLOYEES_NOTE_EDIT_SUCCESS:
      const editedEmployeeNote = action.payload;
      const empNoteList = state?.progress_list;
      const updatedEmpNoteList = empNoteList.map((note) => {
        if (note.module === editedEmployeeNote.module) {
          // Filter out duplicate notes and push only non-duplicate notes
          const newNotes = editedEmployeeNote.notes.filter((newNote) => {
            return !note.notes.some(
              (existingNote) => existingNote._id === newNote._id
            );
          });

          note.notes.push(...newNotes);
        }
        return note;
      });

      return {
        ...state,
        progress_list: updatedEmpNoteList,
      };

    case EMPLOYEES_NOTE_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case EMPLOYEE_MODULE_RESET_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case EMPLOYEE_MODULE_RESET_SUCCESS:
        return {
          ...state,
          loading: false,
          list: null,
          progress_list: null,
        };
      case EMPLOYEE_MODULE_RESET_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default moduleReducer;
