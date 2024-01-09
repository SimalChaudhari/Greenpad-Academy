import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { editCoursesModuleById } from "../../../../redux/actions/admin/courssActions";

const EditModelForm = ({ courseData, /*handleUpdate,*/ handleCloseModal }) => {
  const location = useLocation();
  const CourseId = location.pathname.split("/")[3];
  const CourseModuleId = courseData._id;

  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      CourseModuleId : CourseModuleId,
    };
    // handleUpdate(formData);
    dispatch(editCoursesModuleById(CourseId, formData));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
      id="myModal">
      <div className="modal-dialog">
        <div className="modal-content" style={{ maxHeight: "850px", overflowY: "auto" }}>
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Update course</h4>
            <button
              onClick={handleCancel}
              type="button"
              className="close"
              data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <section className="">
              <div className="">
                <div className="row m-2">
                  <div className="col-lg-12 col-md-12 mx-auto">
                    <div className="register_eroll">
                      <div className="enrollment_tab">
                        <ul className="nav nav-tabs">
                          <li className="nav-item"></li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane active container p-0"
                          id="business"
                          name>
                          <div className="register_form">
                            <Formik
                              initialValues={{
                                _id: courseData._id || "",
                                module_title: courseData.module_title || "",
                              }}
                              validate={(values) => {
                                const errors = {};

                                if (!values.module_title) {
                                  errors.module_title = "Title is required";
                                } else if (values.module_title.length < 3) {
                                  errors.module_title =
                                    "Title must be at least 3 characters long";
                                } else if (values.module_title.length > 100) {
                                  errors.module_title =
                                    "Title must be at most 20 characters long";
                                }

                                return errors;
                              }}
                              onSubmit={handleFormSubmit}>
                              {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="p-2">
                                  <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                                    Course Details
                                  </h4>

                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Title{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="module_title"
                                          placeholder="Title"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="module_title"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="form-btn text-center mt-3">
                                        <button
                                          className="text-uppercase green_bg color_white"
                                          type="submit"
                                          disabled={isSubmitting}>
                                          Update
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModelForm;
