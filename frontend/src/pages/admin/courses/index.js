import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { IMAGE_URL } from "../../../config/config";
import {
  getAllCourses,
  deleteCoursesById,
} from "../../../redux/actions/admin/courssActions";
import { DeleteModel } from "../../../Components/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateModelForm from "./CreateModelForm";
import EditModelForm from "./EditModelForm";
import { Hourglass } from "react-loader-spinner";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course?.list?.data);
  const coursesLoader = useSelector((state) => state.course);
  const loading = coursesLoader.loading;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleOpenModal = () => setCreateModalOpen(true);
  const handleEditOpenModal = () => setEditModalOpen(true);
  const handleEditCloseModal = () => setEditModalOpen(false);
  const handleCloseModal = () => setCreateModalOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleUpdate = (updatedCompany) => {
    setSelectedCourse(null);
    handleEditCloseModal();
  };

  const handleDelete = (course) => {
    setSelectedCourse(null);
    handleDeleteModalClose();
    dispatch(deleteCoursesById(course._id));
  };

  const filteredCourses = courses?.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <Layout>
      <section className="courses-section grey_bg pt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <h3 className="site_bg text-white p-2">Courses</h3>
            </div>
          </div>

          {createModalOpen && (
            <CreateModelForm handleCloseModal={handleCloseModal} />
          )}

          {editModalOpen && selectedCourse && (
            <EditModelForm
              courseData={selectedCourse}
              handleUpdate={handleUpdate}
              handleCloseModal={handleEditCloseModal}
            />
          )}

          {deleteModalOpen && selectedCourse && (
            <DeleteModel
              data={selectedCourse}
              handleDelete={handleDelete}
              handleCloseModal={handleDeleteModalClose}
            />
          )}

          {loading ? (
            <div className="text-center">
              <Hourglass
                visible={true}
                height={80}
                width={80}
                ariaLabel="loading"
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="search-course mb-3">
                  <input
                    type="text"
                    placeholder="Search by course name or description"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 text-right">
                <button
                  className="btn btn-primary"
                  onClick={handleOpenModal}
                >
                  Add New Course
                </button>
              </div>

              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <div className="col-lg-4 col-md-6 mb-3" key={index}>
                    <div className="course-card shadow-sm">
                      <div className="course-image">
                        <img
                          src={`${IMAGE_URL}/${course.image}`}
                          alt={course.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="course-details p-3">
                        <h5 className="mb-2">{course.name}</h5>
                        <p>{course.description}</p>

                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-link text-primary"
                            onClick={() => {
                              setSelectedCourse(course);
                              handleEditOpenModal();
                            }}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>

                          <button
                            className="btn btn-link text-danger"
                            onClick={() => {
                              setSelectedCourse(course);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-lg-12 text-center">
                  <h5>No courses found. Add new courses to get started.</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
