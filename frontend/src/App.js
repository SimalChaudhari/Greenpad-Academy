import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

// Admin Component
import Home from "./pages/admin/Home/Home";
import Courses from "./pages/admin/courses/index";

// Company Component
import CompanyHome from "./pages/company/Home/Home";
import CompanyCourses from "./pages/company/courses/index";
import Edit from "./pages/company/Edit";
import AdminEdit from "./pages/admin/Edit";
import EmployeeEdit from "./pages/employee/Edit";
import EmployeeResetPassword from "./pages/employee/ResetPassword";
import CompanyResetPassword from "./pages/employee/ResetPassword";
import AdminResetPassword from "./pages/employee/ResetPassword";
import Plans from "./pages/admin/plans/index";

// Employee Components
import Reports from "./pages/employee/reports/index";
import TrackingDashboard from "./pages/employee/tracking-dashboard/index";
import GuidanceSupport from "./pages/employee/guidance-support/index";
import Forum from "./pages/employee/forum/index";
import MyAcademy from "./pages/employee/myAcademy";
import SustainablePlan from "./pages/employee/reports/SustainablePlan";
import MyAcademySustainablePlan from "./pages/employee/myAcademy/SustainablePlan";
import Certificates from "./pages/employee/reports/Certificates";
import SustainablePlan2 from "./pages/employee/reports/SustainablePlan2";
import EmployeeHome from "./pages/employee/Home/Home";
import EmpModulesIndex from "./pages/employee/courses/modules";
import EmpCourseModulesIndex from "./pages/employee/courses/modules/sunmoduleindex";

import Reading from "./pages/employee/myAcademy/Reading";
import SavedNotes from "./pages/employee/myAcademy/SavedNotes";
import MyProfile from "./pages/MyProfile";
import OrganisationalSustainability from "./pages/OrganisationalSustainability";
import YouthSustainability from "./pages/YouthSustainability";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import CompanyManagement from "./pages/admin/company/index";
import CompanyEmployeeManagement from "./pages/admin/company/CompanyEmployee";
import Employees from "./pages/admin/employees/index";
import CompanyEmployees from "./pages/company/employees/index";
import EmployeeIndex from "./pages/employee/myAcademy/profile";
import ViewModelForm from "./pages/admin/employees/viewModelForm";
import ViewModelCompanyForm from "./pages/company/viewModelForm";
import ViewModelCourseForm from "./pages/courses/viewModelForm";
import Modules from "./pages/admin/courses/modules/index";
import SubModules from "./pages/admin/courses/modulesArray/index";
import { ROLES } from "./config/roles";
import NotFound from "./pages/NotFound";

// PrivateRoute component for routes that require authentication
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

function App() {
  const role = useSelector((state) => state.auth.user?.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            {role === ROLES.ADMIN ? (
              <>
                <Route path="/" element={<Home />} />

                <Route
                  path="/courses"
                  element={<PrivateRoute element={Courses} />}
                />
                <Route
                  path="/courses/view/:id"
                  element={<PrivateRoute element={ViewModelCourseForm} />}
                />
                <Route
                  path="/courses/modules/:id"
                  element={<PrivateRoute element={Modules} />}
                />
                <Route
                  path="/courses/submodules/:id/modules/:id"
                  element={<PrivateRoute element={SubModules} />}
                />

                <Route
                  path="/employees"
                  element={<PrivateRoute element={Employees} />}
                />
                <Route
                  path="/employees/view/:id"
                  element={<PrivateRoute element={ViewModelForm} />}
                />
                <Route
                  path="/companies"
                  element={<PrivateRoute element={CompanyManagement} />}
                />
                <Route
                  path="/company/view/:id"
                  element={<PrivateRoute element={ViewModelCompanyForm} />}
                />
                <Route
                  path="/company/Employee/view/:id"
                  element={<PrivateRoute element={CompanyEmployeeManagement} />}
                />

                <Route
                  path="/admin/edit/:id"
                  element={<PrivateRoute element={AdminEdit} />}
                />

                <Route
                  path="/admin/reset-password/:id"
                  element={<PrivateRoute element={AdminResetPassword} />}
                />
                
                <Route
                  path="/plans"
                  element={<PrivateRoute element={Plans} />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            ) : role === ROLES.COMPANY ? (
              <>
                <Route path="/" element={<CompanyHome />} />
                <Route
                  path="/courses"
                  element={<PrivateRoute element={CompanyCourses} />}
                />

                <Route
                  path="/courses/modules/:id"
                  element={<PrivateRoute element={Modules} />}
                />
                
                <Route
                  path="/courses/submodules/:id/modules/:id"
                  element={<PrivateRoute element={SubModules} />}
                />

                <Route
                  path="/reading"
                  element={<PrivateRoute element={Reading} />}
                />

                <Route
                  path="/saved-notes"
                  element={<PrivateRoute element={SavedNotes} />}
                />

                <Route
                  path="/sustainable-plan"
                  element={<PrivateRoute element={SustainablePlan} />}
                />

                <Route
                  path="/my-profile"
                  element={<PrivateRoute element={MyProfile} />}
                />

                <Route
                  path="/certificates"
                  element={<PrivateRoute element={Certificates} />}
                />

                <Route
                  path="/sustainable-plan-2"
                  element={<PrivateRoute element={SustainablePlan2} />}
                />

                <Route
                  path="/organisational-sustainability"
                  element={
                    <PrivateRoute element={OrganisationalSustainability} />
                  }
                />

                <Route
                  path="/youth-sustainability"
                  element={<PrivateRoute element={YouthSustainability} />}
                />

                <Route
                  path="/company-management"
                  element={<PrivateRoute element={CompanyManagement} />}
                />

                <Route
                  path="/employees"
                  element={<PrivateRoute element={CompanyEmployees} />}
                />

                <Route
                  path="/employees/view/:id"
                  element={<PrivateRoute element={ViewModelForm} />}
                />

                <Route
                  path="/company/edit/:id"
                  element={<PrivateRoute element={Edit} />}
                />

                <Route
                  path="/company/reset-password/:id"
                  element={<PrivateRoute element={CompanyResetPassword} />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            ) : role === ROLES.EMPLOYEE ? (
              <>
                <Route path="/" element={<EmployeeHome />} />
                <Route
                  path="/my-academy"
                  element={<PrivateRoute element={MyAcademy} />}
                />
                <Route
                  path="/my-profile"
                  element={<PrivateRoute element={EmployeeIndex} />}
                />
                <Route
                  path="/employee/courses/modules/:id"
                  element={<PrivateRoute element={EmpCourseModulesIndex} />}
                />
                <Route
                  path="/employee/modules/:id/courses/:id"
                  element={<PrivateRoute element={EmpModulesIndex} />}
                />
                <Route
                  path="/reading"
                  element={<PrivateRoute element={Reading} />}
                />
                <Route
                  path="/saved-notes"
                  element={<PrivateRoute element={SavedNotes} />}
                />
                <Route
                  path="/sustainable-plan"
                  element={<PrivateRoute element={MyAcademySustainablePlan} />}
                />
                <Route
                  path="/employee/certificates"
                  element={<PrivateRoute element={Certificates} />}
                />
                <Route
                  path="/employee/sustainable-plan-2"
                  element={<PrivateRoute element={SustainablePlan2} />}
                />
                <Route
                  path="/employee/reports"
                  element={<PrivateRoute element={Reports} />}
                />
                <Route
                  path="/employee/tracking-dashboard"
                  element={<PrivateRoute element={TrackingDashboard} />}
                />
                <Route
                  path="/employee/guidance-support"
                  element={<PrivateRoute element={GuidanceSupport} />}
                />
                <Route
                  path="/employee/forum"
                  element={<PrivateRoute element={Forum} />}
                />
                <Route
                  path="/employee/edit/:id"
                  element={<PrivateRoute element={EmployeeEdit} />}
                />
                <Route
                  path="/employee/reset-password/:id"
                  element={<PrivateRoute element={EmployeeResetPassword} />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            ) : null}
          </>
        ) : (
          <>
            <Route path="*" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/registration" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
