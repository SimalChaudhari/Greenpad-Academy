import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { ROLES } from "../../../config/roles";
import {
  getAllCourses, getCoursesById
} from "../../../redux/actions/admin/courssActions";
import { DeleteModel, Table } from "../../../Components/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Create from "./Create";
import EditModelForm from "../EditModelForm";
import { useParams } from 'react-router-dom';

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const Modules = () => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course);
  const [modules, setModules] = useState([]);
  const [createmodalOpen, setCreateModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (path) => {
    navigate(path);
  };
  useEffect(() => {
    getCourseById(id);
  }, [id]);

  const getCourseById = async (id) => {
    const data = await dispatch(getCoursesById(id));
    setModules(data);
  }

  const handleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const handleView = (companyId) => {
    navigatePage(`/course-management/view/${companyId}`);
  };

  const [selectedModuleDescription, setSelectedModuleDescription] =
    useState("");
  const role = useSelector((state) => state.auth.user?.role);
  const handleModuleClick = (description) => {
    setSelectedModuleDescription(description);
  };
  useEffect(() => {
    // Set the description of the first enrolled course by default
    if (coursesReducer?.list?.data?.length > 0) {
      setSelectedModuleDescription(coursesReducer.list.data[0].description);
    }
  }, [coursesReducer]);

  if (role === ROLES.ADMIN) {
    return (
      <Layout>
        <section className="enrolled_courses grey_bg pt-5 pb-5">
          <div className="container col-md-12">
            <div className="row register_form">
              <div className="col-lg-12">
                <div className="form_field add_courses mb-1 text-right">
                  <a
                    className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#myModal"
                    onClick={() => {
                      handleOpenModal();
                    }}
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="main_tab_content">
                  <div className="tab-content">
                    <div className="mb-3 black_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                      MODULES
                    </div>
                    <ul className="black_bg color_white mb-3 black_bg pr-3 pl-3 pt-1 pb-1">
                      {coursesReducer?.list?.data?.map((module, index) => (
                        <li
                          className="mb-2"
                          key={module.id}
                          onClick={() => handleModuleClick(module.description)}
                        >
                          {index + 1}. &nbsp; {module.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="main_tab_content">
                  <div className="tab-content">
                    <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                      ENROLLED COURSES
                    </div>
                    <div>
                      {/* Display the selected module's description here */}
                      {selectedModuleDescription ? (
                        <div className="description">
                          {selectedModuleDescription}
                        </div>
                      ) : (
                        <div className="description">
                          {coursesReducer?.list?.data?.length > 0 &&
                            coursesReducer.list.data[0].description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {createmodalOpen && <Create handleCloseModal={handleCloseModal} />}
      </Layout>
    );
  } else {
    return (
      <Layout>
        <section className="course_page grey_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="course_right">
                  <div className="search_course mb-3">
                    <input
                      type="text"
                      name=""
                      placeholder="Search Course"
                      className="box_shadow"
                    />
                    <i className="fas fa-search"></i>
                  </div>
                  <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                    LEARNING WITH GREENPAD ACADEMY
                  </div>
                  <div className="white_bg p-4 box_shadow mb-3">
                    <p className="mb-2">
                      GreenPad Academy is an accredited training centre offering
                      management and leadership courses in sustainability to
                      young individuals, students, and businesses.
                    </p>
                    <p className="mb-2">
                      Our mission is to provide sustainable development support
                      to young individuals and businesses by providing them with
                      sustainability-related courses that equip them with the
                      knowledge and skills needed to develop, manage, and
                      improve sustainability in societies, enterprises, and
                      workplaces to become greener and achieve sustainable
                      growth.
                    </p>
                    <p>
                      We currently offer two training programs for individuals
                      and businesses.
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="courses_categories box_shadow">
                        <a
                          onClick={() => {
                            navigatePage("/organisational-sustainability");
                          }}
                        >
                          <img
                            src="assets/images/course-new.png"
                            alt="course-new"
                          />
                        </a>
                        <div className="course_sub_text p-3">
                          <h6 className="mb-2">
                            <a
                              onClick={() => {
                                navigatePage("/organisational-sustainability");
                              }}
                            >
                              Organisational Sustainability, Management, and
                              Leadership.
                            </a>
                          </h6>
                          <p>
                            This program is tailored to assist businesses to
                            become greener by managing their sustainability
                            impacts in order for them to gain a competitive
                            advantage.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="courses_categories box_shadow">
                        <a
                          onClick={() => {
                            navigatePage("/youth-sustainability");
                          }}
                        >
                          <img src="assets/images/course2.png" alt="course2" />
                        </a>
                        <div className="course_sub_text p-3">
                          <h6 className="mb-2">
                            <a
                              onClick={() => {
                                navigatePage("/youth-sustainability");
                              }}
                            >
                              Youth Sustainability, Innovation, and Leadership.
                            </a>
                          </h6>
                          <p>
                            This course is tailored to equip young people with
                            sustainability knowledge, social and green skills
                            for their personal development.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="courses_categories box_shadow">
                        <a href="engineering.html">
                          <img
                            src="assets/images/course-new.png"
                            alt="course-new"
                          />
                        </a>
                        <div className="course_sub_text p-3">
                          <h6 className="mb-2">
                            <a href="engineering.html">
                              Engineering Sustainability and Management.
                            </a>
                          </h6>
                          <p>
                            This course is designed to assist engineering
                            businesses to manage their engineering operations
                            using sustainability principles and practices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};

export default Modules;
