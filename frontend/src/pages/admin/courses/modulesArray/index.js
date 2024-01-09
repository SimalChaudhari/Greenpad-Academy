import React, { useEffect, useState } from "react";
import Layout from "../../../../Components/Layout";
import {
  getAll,
  deleteModuleById,
} from "../../../../redux/actions/admin/modulesActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";
import { useParams, useLocation } from "react-router-dom";
import { ROLES } from "../../../../config/roles";
import { DeleteModel } from "../../../../Components/index";
import { Hourglass } from "react-loader-spinner"; // Import the loader component
import "./ql.css";

const Modules = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState();
  const modulesReducer = useSelector((state) => state.module);
  const modulesData = modulesReducer?.list?.modules;
  const loading = modulesReducer.loading;
  const [createmodalOpen, setCreateModalOpen] = useState(false);
  const role = useSelector((state) => state.auth.user?.role);
  const ModuleId = location.pathname.split("/")[3];

  // Filter modulesData based on ModuleId
  const filteredModules = modulesData.filter(
    (module) => module._id === ModuleId
  );

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

  const handleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const [selectedModuleDescription, setSelectedModuleDescription] = useState(
    []
  );

  useEffect(() => {
    if (modulesReducer?.list?.length > 0) {
      setSelectedModuleDescription(modulesReducer.list[0].descriptions);
    }
  }, [modulesReducer]);

  const handleEdit = (data) => {
    setEditModalOpen(true);
    setSelectedModule(data);
  };

  const sethandleDelete = (data) => {
    setDeleteModalOpen(true);
    setSelectedModule(data);
  };
  const handleDelete = (data) => {
    const formData = {
      ...data,
      CourseId: id,
      SubModuleId: ModuleId,
      is_active: true,
    };

    setDeleteModalOpen(false);
    setSelectedModule(data);
    handleCloseModal();
    // dispatch(deleteModuleById(data?._id));
    dispatch(deleteModuleById(formData));
  };

  return (
    <Layout>
      <section className="course_page grey_bg">
        {role === ROLES.ADMIN ? (
          <div className="pl-5 pr-5">
            <div className="row register_form">
              <div className="col-lg-12">
                <div className="nav-link white_bg mb-3">
                  <a
                    href="#"
                    onClick={() => {
                      navigatePage(`/courses`);
                    }}>
                    courses
                  </a>{" "}
                  \{" "}
                  <a
                    href="#"
                    onClick={() => {
                      navigatePage(`/courses/modules/${id}`);
                    }}>
                    courseModule
                  </a>
                </div>
                <div className="form_field add_courses mb-1 text-right">
                  <a
                    className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                    // href="#"
                    // data-toggle="modal"
                    // data-target="#myModal"
                    onClick={() => {
                      handleOpenModal();
                    }}>
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="pl-5 pr-5">
          <div className="row">
            <div className="col-lg-2">
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
                            {filteredModules[0]?.module_title}
                          </a>
                        </li>
                        <div></div>
                        {filteredModules[0]?.module?.length > 0 ? (
                          filteredModules[0]?.module?.map((item, index) => {
                            return (
                              <li className="nav-item mb-2" key={item._id}>
                                <a
                                  className="nav-link white_bg"
                                  href="#"
                                  onClick={() =>
                                    setSelectedModuleDescription(item)
                                  }>
                                  {item?.title}
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

                {/* <div className="invite mt-5">
                  <div className="invite_box box_shadow">
                    <label className="d-block mb-2 p-3 white_bg">
                      <b>Invite Friends and Colleagues</b>
                    </label>
                    <p className="p-3 white_bg mb-2">
                      If you know anyone that would benefit from the programmes
                      at GreenPad Academy invite them to join the course.
                    </p>
                    <a
                      href="#"
                      className="d-block site_bg color_white p-3 text-center"
                    >
                      Send invite for this course
                    </a>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-10">
              <div className="course_right">
                <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                  {modulesReducer?.list?.name}
                </div>

                <div className="youth_design">
                  <div className="tab-content">
                    <div
                      className="tab-pane active p-0"
                      id="Programme_Description">
                      {role === ROLES.ADMIN ? (
                        <div className="d-flex justify-content-end">
                          {/* Edit Icon */}
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
                          {/* Delete Icon */}
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
                      )}

                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow module-description">
                        <h5 className="text-center mb-3 text-uppercase">
                          {/* {selectedModuleDescription?.title} */}
                        </h5>

                        {selectedModuleDescription?.descriptions?.map(
                          (item, index) => {
                            return (
                              <div
                                key={index}
                                className="description white_bg p-5"
                                style={{
                                  minHeight: "400px",
                                  border: "2px solid #4d4f5c",
                                  borderRadius: "30px",
                                  marginBottom: "20px", // Add margin to the bottom
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: item?.content ? item?.content : "",
                                }}></div>
                            );
                          }
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
        <Create courseData={ModuleId} handleCloseModal={handleCloseModal} />
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
