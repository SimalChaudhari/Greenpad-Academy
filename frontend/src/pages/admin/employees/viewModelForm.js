import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../Components/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../../redux/actions/admin/employeeActions";
import { DEF_URL, IMAGE_URL } from "../../../config/config";
import PROFILE from "../../../Common/default-user.png";
import { Hourglass } from "react-loader-spinner";
import { ROLES } from "../../../config/roles";

const ViewModelForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [empData, setEmpData] = useState({});
  const [empCoursesData, setEmpCoursesData] = useState([]);
  const EmployeeId = location.pathname.split("/")[3];
  const [collapsedItems, setCollapsedItems] = useState({});
  const [collapsedItems1, setCollapsedItems1] = useState({});
  const loading = false; // You should replace this with your actual loading state.

  useEffect(() => {
    if (EmployeeId) {
      const getProfileById = async () => {
        const data = await dispatch(getEmployee(EmployeeId));
        const userData = data?.data;
        const empCoursesData = data?.coursesData;
        setEmpData(userData);
        setEmpCoursesData(empCoursesData);
      };

      getProfileById();
    }
  }, [EmployeeId]);

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

  const getModuleStatus = (moduleId) => {
    const moduleEntry = empData?.module_progress?.find(
      (item) => item?.module === moduleId
    );
    return moduleEntry
      ? moduleEntry?.is_completed
        ? "Complete"
        : "Pending"
      : "Pending";
  };

  const calculateCourseProgress = (module_list, course_id) => {
    const modulesForCourse = empData?.module_progress?.filter(
      (item) => item?.course === course_id
    );

    const flatModuleList = module_list?.flatMap((course) => course?.module);

    const totalModules = flatModuleList?.length || 0;

    if (totalModules === 0) {
      return 0;
    }

    const completedModules =
      modulesForCourse?.filter((module) => module?.is_completed)?.length || 0;
      const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2); // Limit to 2 decimal places

    return progressPercentage;
  };

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container">
          {loading ? (
            <div className="text-center">
              <Hourglass
                visible={true}
                height={80}
                width={80}
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <>
              <div className="row mb-3">
                <div className="col-lg-12">
                  <div className="main_tab_content">
                    <div className="tab-content">
                      <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                        PERSONAL DETAILS
                      </div>
                      <div className="tab_profile">
                        <div className="t_profile_top white_bg p-3">
                          <div className="row">
                            <div className="col-lg-4 col-md-3">
                              <div className="profile_img">
                                <span>
                                  {empData?.image === undefined ||
                                  empData?.image === "null" ? (
                                    <img
                                      style={{ height: "100%", width: "100%" }}
                                      src={`${DEF_URL}${PROFILE}`}
                                      alt="Default Profile"
                                    />
                                  ) : (
                                    <img
                                      style={{ height: "100%", width: "100%" }}
                                      src={`${IMAGE_URL}/${empData?.image}`}
                                      alt={`${empData?.first_name} ${empData?.last_name}`}
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-9">
                              <div className="user_detail">
                                <ul>
                                  <li>
                                    <i className="far fa-address-card site_color"></i>
                                    <span>{empData?.department}</span>
                                  </li>
                                  <li>
                                    <i className="far fa-envelope site_color"></i>
                                    <span>{empData?.email}</span>
                                  </li>
                                  <li>
                                    <i className="fas fa-map-marker-alt site_color"></i>
                                    <span>
                                      {empData?.address}, {empData?.country}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="t_profile_bottom p-3">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-5">
                              <div className="user_name">
                                {empData?.first_name} {empData?.last_name}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-7">
                              <div className="user_postion text-right site_color">
                                {empData?.job_title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="accordion" className="courses_accordion">
                {empCoursesData && empCoursesData?.length > 0 ? (
                  empCoursesData?.map((item, index) => {
                    const isCollapsed = collapsedItems[item?._id];

                    return (
                      <div className="card mb-2" key={index}>
                        <div className="card-header">
                          <a
                            className="card-link"
                            onClick={() => toggleCollapse(item?._id)}>
                            {item?.name}
                            <i
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
                            <h6 className="mb-3">
                              <b>Chapters :</b>
                            </h6>

                            <div id="accordion" className="courses_accordion">
                              {item?.modules &&
                                item?.modules?.map((data, index1) => {
                                  const isCollapsed1 =
                                    collapsedItems1[data?._id];

                                  return (
                                    <div className="card mb-2" key={index1}>
                                      <div className="card-header">
                                        <a
                                          className="card-link"
                                          onClick={() =>
                                            toggleCollapse(data?._id)
                                          }>
                                          {data?.module_title}
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
                                            <b>Modules</b>
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
                  })
                ) : (
                  <>
                    <div className="white_bg text-center p-3">
                      <b>Courses not assign</b>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ViewModelForm;
