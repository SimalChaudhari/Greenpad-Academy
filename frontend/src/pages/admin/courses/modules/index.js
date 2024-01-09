import React, { useEffect, useState } from "react";
import Layout from "../../../../Components/Layout";
import { getAll } from "../../../../redux/actions/admin/modulesActions";
import { deleteCoursesModuleById } from "../../../../redux/actions/admin/courssActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import CreateCourseModule from "./CreateModule";
import Edit from "./Edit";
import { useParams } from "react-router-dom";
import { ROLES } from "../../../../config/roles";
import { DeleteModel } from "../../../../Components/index";
import { Hourglass } from "react-loader-spinner"; // Import the loader component
import "./ql.css";

const Modules = () => {
  const dispatch = useDispatch();
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState();
  const modulesReducer = useSelector((state) => state.module);
  const modulesData = modulesReducer?.list?.modules;
  const loading = modulesReducer.loading;
  const [createmodalOpen, setCreateModalOpen] = useState(false);
  const [createcoursemodalOpen, setCreateCourseModalOpen] = useState(false);
  const role = useSelector((state) => state.auth.user?.role);

  const { id } = useParams();
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(getAll(id));
  }, []);

  const handleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleOpenCourseModal = () => {
    setCreateCourseModalOpen(true);
  };

  const handleCloseCourseModal = () => {
    setCreateCourseModalOpen(false);
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const [selectedModuleDescription, setSelectedModuleDescription] = useState(
    []
  );

  const [selectedModuleId, setSelectedModuleId] = useState([]);

  useEffect(() => {
    if (modulesData?.list?.length > 0) {
      setSelectedModuleDescription(modulesData.list[0].descriptions);
    }
  }, [modulesData]);

  const handleEdit = (data) => {
    setEditModalOpen(true);
    setSelectedModule(data);
  };

  const sethandleDelete = (data) => {
    const formData = {
      data,
      CourseModuleId: id,
    };
    setDeleteModalOpen(true);
    setSelectedModule(formData);
  };
  const handleDelete = (data) => {
    setDeleteModalOpen(false);
    setSelectedModule(data?.data);
    handleCloseModal();
    dispatch(deleteCoursesModuleById(data));
  };

  return (
    <Layout>
      <section className="course_page grey_bg">
        {role === ROLES.ADMIN ? (
          <div className="pl-5 pr-5">
            <div className="row register_form">
              <div className="col-lg-12">
                <div className="form_field add_courses mb-1 text-right">
                  {selectedModuleId.length > 0 ? (
                    <>
                      <a
                        className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                        // href="#"
                        // data-toggle="modal"
                        // data-target="#myModal"
                        onClick={() => {
                          handleOpenModal();
                        }}>
                        Add Module
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <>
                    <a
                      className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                      // href="#"
                      // data-toggle="modal"
                      // data-target="#myModal"
                      onClick={() => {
                        handleOpenCourseModal();
                      }}>
                      Add Course Module
                    </a>
                  </>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="pl-5 pr-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="main_tabs">
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
                      <ul className="nav nav-tabs">
                        <li className="nav-item mb-2">
                          <a className="nav-link active white_bg" href="#">
                            {modulesReducer?.list?.name}
                          </a>
                        </li>
                        <div></div>

                        {modulesData?.length > 0 ? (
                          modulesData?.map((data) => {
                            return (
                              <li className="nav-item mb-2" key={data?._id}>
                                <a
                                  className="nav-link white_bg"
                                  href="#"
                                  onClick={() => {
                                    setSelectedModuleDescription(data?.module);
                                    setSelectedModuleId(data?._id);
                                  }}>
                                  {data?.module_title}{" "}
                                  <div className="border-top pt-3 d-flex justify-content-between">
                                    {role === ROLES.ADMIN ? (
                                      <>
                                        <a
                                          href="#"
                                          style={{ color: "green" }}
                                          onClick={() => {
                                            navigatePage(
                                              `/courses/submodules/${data._id}/modules/${id}`
                                            );
                                          }}>
                                          <i className="fas fa-file-alt"></i>{" "}
                                          Open
                                        </a>

                                        <a
                                          href="#"
                                          style={{ color: "blue" }}
                                          onClick={() => {
                                            setSelectedModuleDescription(
                                              data?.module
                                            );
                                            setSelectedModuleId(data?._id);
                                            handleEdit(data);
                                          }}>
                                          <i className="fas fa-edit"></i> Edit
                                        </a>

                                        <a
                                          href="#"
                                          style={{ color: "red" }}
                                          onClick={() =>
                                            sethandleDelete(data._id)
                                          }>
                                          <i className="fas fa-trash-alt"></i>{" "}
                                          Delete
                                        </a>

                                        <a
                                          href="#"
                                          style={{ color: "#306cce" }}
                                          onClick={() => {
                                            setSelectedModuleDescription(
                                              data?.module
                                            );
                                            setSelectedModuleId(data?._id);
                                          }}>
                                          <i className="fas fa-eye"></i> View
                                        </a>
                                      </>
                                    ) : (
                                      <>
                                        <a
                                          href="#"
                                          style={{ color: "green" }}
                                          onClick={() => {
                                            navigatePage(
                                              `/courses/submodules/${data._id}/modules/${id}`
                                            );
                                          }}>
                                          <i className="fas fa-file-alt"></i>{" "}
                                          Open
                                        </a>
                                        
                                        <a
                                          href="#"
                                          style={{ color: "#306cce" }}
                                          onClick={() => {
                                            setSelectedModuleDescription(
                                              data?.module
                                            );
                                            setSelectedModuleId(data?._id);
                                          }}>
                                          <i className="fas fa-eye"></i> View
                                        </a>
                                      </>
                                    )}
                                  </div>
                                </a>
                              </li>
                            );
                          })
                        ) : (
                          <li className="nav-item mb-2">
                            <a className="nav-link white_bg" href="#">
                              Data not available
                            </a>
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="course_right">
                <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                  {modulesReducer?.list?.name}
                </div>

                <div className="youth_design">
                  <div className="tab-content">
                    <div
                      className="tab-pane active p-0"
                      id="Programme_Description">
                      {/* {role === ROLES.ADMIN ? (
                        <div className="d-flex justify-content-end">
                        
                          <a
                            href="#"
                            className={`text-primary ml-6 ${
                              selectedModuleDescription.length === 0
                                ? "disabled"
                                : ""
                            }`}
                            onClick={() =>
                              handleEdit(selectedModuleDescription)
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Module">
                            <i className="fas fa-edit"></i>
                          </a>
                          
                          <a
                            href="#"
                            className={`text-danger ml-4 ${
                              selectedModuleDescription.length === 0
                                ? "disabled"
                                : ""
                            }`}
                            onClick={() =>
                              sethandleDelete(selectedModuleDescription)
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete Module">
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      ) : (
                        ""
                      )} */}

                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow module-description">
                        <h5 className="text-center mb-3 text-uppercase">
                          {/* {selectedModuleDescription?.title} */}
                        </h5>
                        {selectedModuleDescription?.length === 0 ? (
                          <>
                            <li className="nav-item mb-2">
                              <a className="nav-link white_bg" href="#">
                                Select the module
                              </a>
                            </li>
                          </>
                        ) : (
                          <>
                            {selectedModuleDescription?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="description white_bg pl-5 p-2"
                                  style={{
                                    minHeight: "50px",
                                    border: "2px solid #4d4f5c",
                                    borderRadius: "30px",
                                    marginBottom: "20px", // Add margin to the bottom
                                  }}>
                                  {index + 1}. {item?.title}
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {createmodalOpen && (
        <Create
          courseData={selectedModuleId}
          handleCloseModal={handleCloseModal}
        />
      )}

      {createcoursemodalOpen && (
        <CreateCourseModule
          courseData={id}
          handleCloseCourseModal={handleCloseCourseModal}
        />
      )}

      {editmodalOpen && selectedModule && (
        <Edit
          courseData={selectedModule}
          handleCloseModal={() => setEditModalOpen(false)}
        />
      )}
      {deleteModalOpen && selectedModule && (
        <DeleteModel
          data={selectedModule}
          handleDelete={handleDelete}
          handleCloseModal={() => setDeleteModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default Modules;
