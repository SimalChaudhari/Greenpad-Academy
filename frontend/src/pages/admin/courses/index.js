import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { IMAGE_URL } from "../../../config/config";
import {
  getAllCourses,
  deleteCoursesById,
} from "../../../redux/actions/admin/courssActions";
import { DeleteModel } from "../../../Components/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CreateModelForm from "./CreateModelForm";
import EditModelForm from "./EditModelForm";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course?.list?.data);
  const coursesLoder = useSelector((state) => state.course);
  const loading = coursesLoder.loading;

  const [createmodalOpen, setCreateModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
      dispatch(getAllCourses());
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

  const filteredCourses = courses
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5">
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
                          // href="#"
                          // data-toggle="modal"
                          // data-target="#myModal"
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

      <div className="">
        {loading ? (
          <div className="text-center">
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </div>
        ) : (
          <>
            <section className="course_page grey_bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="course_right">
                      <div className="search_course mb-3">
                        <input
                          type="text"
                          placeholder="Search Course"
                          className="box_shadow"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <i className="fas fa-search"></i>
                      </div>

                      <div className="row">
                        {filteredCourses &&
                          filteredCourses.map((item, index) => {
                            return (
                              <div className="col-lg-4 col-md-6 mb-3" key={index}>
                                <div className="courses_categories box_shadow">
                                  <a
                                    href="#"
                                    onClick={() => {
                                      navigatePage(
                                        `/courses/modules/${item._id}`
                                      );
                                    }}
                                  >
                                    <img
                                      src={`${IMAGE_URL}/${item?.image}`}
                                      align="course-new"
                                    />
                                  </a>
                                  <div className="course_sub_text p-3">
                                    <h6 className="mb-2">
                                      <a
                                        href="#"
                                        onClick={() => {
                                          navigatePage(
                                            `/courses/modules/${item._id}`
                                          );
                                        }}
                                      >
                                        {item?.name}
                                      </a>
                                    </h6>

                                    <p>{item?.description}</p>

                                    <div className="border-top pt-3 d-flex justify-content-between">
                                      <a
                                        href="#"
                                        style={{ color: "blue" }}
                                        onClick={() => {
                                          handleEditOpenModal();
                                          setSelectedCourse(item);
                                        }}
                                      >
                                        <i className="fas fa-edit"></i> Edit
                                      </a>

                                      <a
                                        href="#"
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          setDeleteModalOpen(true);
                                          setSelectedCourse(item);
                                        }}
                                      >
                                        <i className="fas fa-trash-alt"></i> Delete
                                      </a>
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
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
