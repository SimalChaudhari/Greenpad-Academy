import React, { useState, useEffect } from "react";
import SubLayout from "./SubLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllModulesProgress } from "../../../redux/actions/employee/modulesActions";

const MyAcademy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.employeeCourses);

  const progress_list = useSelector(
    (state) => state.employeemodule?.progress_list || []
  );

  const [collapsedCourses, setCollapsedCourses] = useState({});
  const [collapsedModules, setCollapsedModules] = useState({});

  useEffect(() => {
    dispatch(getAllModulesProgress());
  }, [dispatch]);

  // Toggle course collapse
  const toggleCourseCollapse = (courseId) => {
    setCollapsedCourses((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  // Toggle module collapse
  const toggleModuleCollapse = (moduleId) => {
    setCollapsedModules((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId],
    }));
  };

  // Function to determine module status
  const getModuleStatus = (moduleId) => {
    const moduleEntry = progress_list.find((item) => item.module === moduleId);
    return moduleEntry?.is_completed ? "Complete" : "Pending";
  };

  // Calculate course progress percentage
  const calculateCourseProgress = (modules, courseId) => {
    const totalModules = modules.flatMap((m) => m.module).length;
    
    if (totalModules === 0) return 0;

    const completedModules = progress_list.filter(
      (progress) => progress.course === courseId && progress.is_completed
    ).length;
    console.log({modules});
    return ((completedModules / totalModules) * 100).toFixed(2);
  };

  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              ENROLLED COURSES
            </div>

            <div id="accordion" className="courses_accordion">
              {courses?.list?.data?.map((course, index) => {
                const isCourseCollapsed = collapsedCourses[course._id];

                return (
                  <div className="card mb-2" key={course._id}>
                    <div className="card-header">
                      <a
                        className="card-link"
                        onClick={() => toggleCourseCollapse(course._id)}
                      >
                        <b>{course.name}</b>
                        <i
                          className={`fas fa-angle-${
                            isCourseCollapsed ? "down" : "up"
                          }`}
                          style={{ float: "right" }}
                        ></i>
                      </a>

                      <div className="courses_progress">
                        <div className="progress_view">
                          <label>
                            Progress{" "}
                            <span>
                              {calculateCourseProgress(course.modules, course._id)}%
                            </span>
                          </label>
                          <div className="progress">
                            <div
                              className="progress-bar orange"
                              style={{
                                width: `${calculateCourseProgress(
                                  course.modules,
                                  course._id
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id={`collapseCourse${index}`}
                      className={`collapse ${isCourseCollapsed ? "" : "show"}`}
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <h6 className="mb-3"></h6>

                        <div id="accordion" className="courses_accordion">
                          {course.modules?.map((moduleItem, moduleIndex) => {
                            const isModuleCollapsed = collapsedModules[moduleItem._id];

                            return (
                              <div className="card mb-2" key={moduleItem._id}>
                                <div className="card-header">
                                  <a
                                    className="card-link"
                                    onClick={() => toggleModuleCollapse(moduleItem._id)}
                                  >
                                    <b>{moduleItem.module_title}</b>
                                    <i
                                      className={`fas fa-angle-${
                                        isModuleCollapsed ? "down" : "up"
                                      }`}
                                      style={{ float: "right" }}
                                    ></i>
                                  </a>
                                </div>

                                <div
                                  id={`collapseModule${moduleIndex}`}
                                  className={`collapse ${
                                    isModuleCollapsed ? "" : "show"
                                  }`}
                                  data-parent="#accordion"
                                >
                                  <div className="card-body">
                                    <ul className="modules_process pointer">
                                      {moduleItem?.module?.length > 0 ? (
                                        moduleItem.module.map(
                                          (module, moduleIndex) => (
                                            <li className="mb-2" key={moduleIndex}>
                                              {module.title.length > 65
                                                ? `${module.title.substring(0, 65)}...`
                                                : module.title}
                                              <span>
                                                {" "}
                                                {getModuleStatus(module._id)}
                                              </span>
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <li>Module Not Found</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default MyAcademy;
