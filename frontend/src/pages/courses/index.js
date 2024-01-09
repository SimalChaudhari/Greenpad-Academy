import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { ROLES } from "../../config/roles";
import {
  getAllCourses,
  deleteCoursesById,
  getCoursesById,
} from "../../redux/actions/admin/courssActions";
import { DeleteModel, Table } from "../../Components/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CreateModelForm from "./CreateModelForm";
import EditModelForm from "./EditModelForm";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const Courses = () => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course);
  const [filter, setFilter] = useState(defaultFilter);
  const [createmodalOpen, setCreateModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    level: "",
    fees: "",
    duration: "",
    is_active: false,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (path) => {
    navigate(path);
  };

  function View(row) {
    const id = row._id;
    dispatch(getCoursesById(row._id));
    setSelectedCourse(row);
    navigatePage(`/courses/model/${id}`);
    // navigatePage(`/courses/model`);
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "level", label: "Level" },
    { key: "fees", label: "Fees" },
    { key: "duration", label: "Duration" },
  ];

  useEffect(() => {
    dispatch(getAllCourses(filter));
  }, []);

  const handleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleEditOpenModal = () => {
    setEditModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const handleUpdate = (updatedCompany) => {
    setSelectedCourse(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    setSelectedCourse(null);
    handleCloseModal();
    const companyId = data._id;
    dispatch(deleteCoursesById(companyId));
  };

  const handleView = (companyId) => {
    navigatePage(`/course-management/view/${companyId}`);
  };

  const role = useSelector((state) => state.auth.user?.role);

  if (role === ROLES.ADMIN) {
    return (
      <Layout>
        <section className="forum_page grey_bg pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <div className="forum_content">
                  <h3 className="mb-4 p-2 site_bg color_white">COURSES</h3>

                  <div className="container col-md-12">
                    <div className="row register_form">
                      <div className="col-lg-12">
                        <div className="form_field add_courses mb-1 text-right">
                          <a
                            className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                            href="#"
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

                  <div className="forum_table white_bg p-3">
                    <Table
                      columns={columns}
                      data={
                        coursesReducer?.list?.data
                          ? coursesReducer.list.data
                          : []
                      }
                      actions={[
                        {
                          label: "Edit",
                          buttonClassName: "btn-primary mr-1",
                          onClick: (row) => {
                            handleEditOpenModal();
                            setSelectedCourse(row);
                          },
                        },
                        {
                          label: "Delete",
                          buttonClassName: "btn-danger mr-1",
                          onClick: (row) => {
                            setDeleteModalOpen(true);
                            setSelectedCourse(row);
                          },
                        },
                        {
                          label: "Modules",
                          buttonClassName: "btn-info",
                          onClick: (row) => {
                            navigatePage(`/courses/modules/${row._id}`);
                            // View(row);
                          },
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {createmodalOpen && (
              <CreateModelForm handleCloseModal={handleCloseModal} />
            )}

            {deleteModalOpen && selectedCourse && (
              <DeleteModel
                data={selectedCourse}
                handleDelete={handleDelete}
                handleCloseModal={() => setDeleteModalOpen(false)}
              />
            )}

            {editmodalOpen && selectedCourse && (
              <EditModelForm
                courseData={selectedCourse}
                handleUpdate={handleUpdate}
                handleCloseModal={() => setEditModalOpen(false)}
              />
            )}
          </div>
        </section>
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

export default Courses;
