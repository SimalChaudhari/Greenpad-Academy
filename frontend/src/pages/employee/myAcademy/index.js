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
    (state) => state.employeemodule?.progress_list || null
  );

  const [collapsedItems, setCollapsedItems] = useState({});
  const [collapsedItems1, setCollapsedItems1] = useState({});

  useEffect(() => {
    dispatch(getAllModulesProgress());
  }, []);

  const toggleCollapse = (index) => {
    setCollapsedItems((prevCollapsed) => ({
      ...prevCollapsed,
      [index]: !prevCollapsed[index],
    }));
    setCollapsedItems1((prevCollapsed) => ({
      ...prevCollapsed,
      [index]: !prevCollapsed[index],
    }));
  };

  // Function to determine status
  const getModuleStatus = (moduleId) => {
    const moduleEntry = progress_list?.find((item) => item.module === moduleId);
    if (moduleEntry) {
      return moduleEntry.is_completed ? "Complete" : "Pending";
    } else {
      return "Pending"; // Default to "Pending" if module entry not found
    }
  };

  const calculateCourseProgress = (module_list, course_id) => {
    const modulesForCourse = progress_list?.filter(
      (item) => item?.course === course_id
    );

    const moduleListId = module_list?.map((course) => course.module.length); // Update this line
    const moduleListId1 = module_list?.map((course) => course.module); // Update this line
    let moduleLenght = moduleListId?.map((course) => course);
    if (moduleLenght.length == 1) {
      const totalModules = moduleLenght;

      if (!totalModules) {
        return 0; // Return 0 if there are no modules in the course
      }

      const completedModules =
        modulesForCourse?.filter((module) => module.is_completed)?.length || 0;
        const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2); // Limit to 2 decimal places

      return progressPercentage;
    } else {
      const flatModuleList = moduleListId1?.flatMap((course) => course);

      const totalModules = flatModuleList?.length;

      if (!totalModules) {
        return 0;
      }

      const completedModules =
        modulesForCourse?.filter((module) => module.is_completed)?.length || 0;
        const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2); // Limit to 2 decimal places

      return progressPercentage;
    }
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
              {courses?.list?.data &&
                courses?.list?.data?.map((item, index) => {
                  const isCollapsed = collapsedItems[item?._id];

                  return (
                    <div className="card mb-2" key={index}>
                      <div className="card-header">
                        <a
                          className="card-link"
                          onClick={() => toggleCollapse(item?._id)}>
                          <b>{item?.name}</b>
                          <i
                            // style={{float: "right"}}
                            className={`fas fa-angle-${
                              isCollapsed ? "down" : "up"
                            }`}></i>
                        </a>

                        <div className="courses_progress">
                          <div className="progress_view">
                            <label>
                              Progress{" "}
                              <span>
                                {calculateCourseProgress(
                                  item?.modules,
                                  item?._id
                                )}
                                %
                              </span>
                            </label>
                            <div className="progress">
                              <div
                                className="progress-bar orange"
                                style={{
                                  width: `${calculateCourseProgress(
                                    item?.modules,
                                    item?._id
                                  )}%`,
                                }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id={`collapse${index}`}
                        className={`collapse ${isCollapsed ? "" : "show"}`}
                        data-parent="#accordion">
                        <div className="card-body">
                          <h6 className="mb-3">{/* <b>Chapters :</b> */}</h6>

                          <div id="accordion" className="courses_accordion">
                            {item?.modules &&
                              item?.modules?.map((data, index1) => {
                                const isCollapsed1 = collapsedItems1[data._id];

                                return (
                                  <div className="card mb-2" key={index1}>
                                    <div className="card-header">
                                      <a
                                        className="card-link"
                                        onClick={() =>
                                          toggleCollapse(data._id)
                                        }>
                                        <b>{data?.module_title}</b>
                                        <i
                                          style={{ float: "right" }}
                                          className={`fas fa-angle-${
                                            isCollapsed1 ? "down" : "up"
                                          }`}></i>
                                      </a>
                                    </div>
                                    <div
                                      id={`collapse${index1}`}
                                      className={`collapse ${
                                        isCollapsed1 ? "" : "show"
                                      }`}
                                      data-parent="#accordion">
                                      <div className="card-body">
                                        <h6 className="mb-3">
                                          {/* <b>Modules</b> */}
                                        </h6>

                                        <ul className="modules_process pointer">
                                          {data?.module?.length > 0
                                            ? data?.module?.map(
                                                (module, moduleIndex) => {
                                                  return (
                                                    <li
                                                      className="mb-2"
                                                      key={moduleIndex}>
                                                      {module?.title?.length >
                                                      65
                                                        ? module?.title?.substring(
                                                            0,
                                                            65
                                                          ) + "..."
                                                        : module?.title}
                                                      <span>
                                                        {" "}
                                                        {getModuleStatus(
                                                          module?._id
                                                        )}
                                                      </span>
                                                    </li>
                                                  );
                                                }
                                              )
                                            : "Module Not Found"}
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
