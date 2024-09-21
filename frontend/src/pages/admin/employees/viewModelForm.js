import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../Components/Layout.js";
import { useDispatch } from "react-redux";
import { getEmployee } from "../../../redux/actions/admin/employeeActions";
import { DEF_URL, IMAGE_URL } from "../../../config/config";
import PROFILE from "../../../Common/default-user.png";
import { Hourglass } from "react-loader-spinner";
import './ViewModelForm.css'; // Custom CSS for styling

const ViewModelForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [empData, setEmpData] = useState({});
  const [empCoursesData, setEmpCoursesData] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const EmployeeId = location.pathname.split("/")[3];

  useEffect(() => {
    if (EmployeeId) {
      const fetchEmployeeData = async () => {
        setLoading(true);
        const data = await dispatch(getEmployee(EmployeeId));
        if (data) {
          setEmpData(data?.data || {});
          setEmpCoursesData(data?.coursesData || []);
        }
        setLoading(false);
      };
      fetchEmployeeData();
    }
  }, [EmployeeId, dispatch]);

  const toggleCollapse = (id) => {
    setCollapsedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getModuleStatus = (moduleId) => {
    const module = empData?.module_progress?.find((item) => item?.module === moduleId);
    return module?.is_completed ? "Complete" : "Pending";
  };

  const calculateCourseProgress = (moduleList, courseId) => {
    // Get the list of progress entries for the current course
    const modulesForCourse = empData?.module_progress?.filter(
      (item) => item?.course === courseId
    ) || [];
  
    // Ensure we are counting the modules from the actual course (moduleList)
    const totalModules = moduleList?.length || 0;
  
    // Avoid division by 0 when there are no modules
    if (totalModules === 0) {
      return 0;
    }
  
    // Count the number of completed modules
    const completedModules = modulesForCourse?.filter(
      (module) => module?.is_completed
    )?.length || 0;
  
    // Calculate the progress percentage
    const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2);
  
    // Ensure progress is capped at 100%
    return Math.min(progressPercentage, 100);
  };
  
  const renderPersonalDetails = () => (
    <div className="tab_profile">
      <div className="t_profile_top white_bg p-3">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <img
              className="profile-img"
              src={empData?.image ? `${IMAGE_URL}/${empData?.image}` : `${DEF_URL}${PROFILE}`}
              alt={`${empData?.first_name} ${empData?.last_name}`}
            />
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="user-details">
              <li>
                <i className="far fa-address-card site_color"></i>
                <span>{empData?.department || "N/A"}</span>
              </li>
              <li>
                <i className="far fa-envelope site_color"></i>
                <span>{empData?.email || "N/A"}</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt site_color"></i>
                <span>{`${empData?.address || "N/A"}, ${empData?.country || "N/A"}`}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="t_profile_bottom p-3">
        <div className="row">
          <div className="col-lg-6">
            <h5>{empData?.first_name} {empData?.last_name}</h5>
          </div>
          <div className="col-lg-6 text-right">
            <span className="site_color">{empData?.job_title || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseModules = (modules, courseId) => (
    <div className="modules-list">
      {modules?.length > 0 ? (
        modules?.map((module, index) => (
          <li key={index} className="mb-2">
            {module?.title?.length > 65 ? `${module?.title.substring(0, 65)}...` : module?.title}
            <span className="status">{getModuleStatus(module?._id)}</span>
          </li>
        ))
      ) : (
        <li>No modules found</li>
      )}
    </div>
  );

  const renderCourses = () => (
    empCoursesData?.length > 0 ? (
      empCoursesData.map((course, index) => {
        const isCollapsed = collapsedItems[course?._id];

        return (
          <div key={index} className="card mb-2">
            <div className="card-header">
              <a
                href="#!"
                onClick={() => toggleCollapse(course?._id)}
                className="course-header"
              >
                {course?.name}
                <i className={`fas fa-angle-${isCollapsed ? "down" : "up"}`}></i>
              </a>
              <div className="progress-view">
                <label>
                  Progress: <span>{calculateCourseProgress(course?.modules, course?._id)}%</span>
                </label>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${calculateCourseProgress(course?.modules, course?._id)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={`collapse ${isCollapsed ? "" : "show"}`}>
              <div className="card-body">
                <h6><b>Modules</b></h6>
                <ul>{renderCourseModules(course?.modules, course?._id)}</ul>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center p-3">No courses assigned</div>
    )
  );

  return (
    <Layout>
      <section className="view-employee grey_bg pt-5 pb-5">
        <div className="container">
          {loading ? (
            <div className="text-center">
              <Hourglass
                visible={true}
                height={80}
                width={80}
                ariaLabel="hourglass-loading"
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div className="section-title mb-3 site_bg color_white">Personal Details</div>
                {renderPersonalDetails()}
              </div>

              <div id="accordion" className="courses-accordion">
                {renderCourses()}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ViewModelForm;
