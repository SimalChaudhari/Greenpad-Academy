import { combineReducers } from 'redux';
import authReducer from './authReducer';
import employeeReducer from './admin/employeeReducer';
import companyemployeeReducer from './company/employeeReducer';
import companyemployeecoursesReducer from './employee/courseReducer';
import companyCoursesReducer from './company/courseReducer';
// import profileReducer from './profileReducer';
import courseReducer from './admin/courseReducer';
import companyReducer from './admin/comapnyReducer';
import moduleReducer from './admin/moduleReducer';
import policyReducer from './Guidance-Support/policyReducer';
import programmecontactsReducer from './Guidance-Support/programmecontactsReducer';
import contactusReducer from './Guidance-Support/contactusReducer';
import useremployeeReducer from './employee/employeeReducer';
import useremployeeExamReducer from './employee/examReducer';
import employeeCourses from './employee/courseReducer';
import employeeModuleReducer from './employee/moduleReducer';
import settingReducer from './Setting/settingReducer';
import plansReducer from './Plans/plansReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    company: companyReducer,
    companycourses: companyCoursesReducer,
    companyemployee: companyemployeeReducer,
    companyemployeecourses: companyemployeecoursesReducer,
    module: moduleReducer,
    programmecontacts: programmecontactsReducer,
    contactus: contactusReducer,
    policy: policyReducer,
    useremployee: useremployeeReducer,
    employeeExam: useremployeeExamReducer,
    employeeCourses: employeeCourses,
    employeemodule: employeeModuleReducer,
    // profile: profileReducer,
    course: courseReducer,
    setting: settingReducer,
    plans: plansReducer
  // Add your individual reducers here
});

export default rootReducer;
