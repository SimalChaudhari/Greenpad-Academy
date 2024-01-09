import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { EditEmployeeNote1ById } from "../../../../redux/actions/employee/modulesActions";

const EditModelForm = ({ courseData, /*handleUpdate,*/ handleCloseModal }) => {
  const location = useLocation();
  const courseId = location.pathname.split("/")[4];

  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      courseId: courseId,
    };
    // handleUpdate(formData);
    dispatch(EditEmployeeNote1ById(formData));
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
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Update Note</h4>
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
                                _id: courseData?._id || "",
                                note: courseData?.note || "",
                                tag: courseData?.tag || "",
                                date_created: courseData?.date_created || "",
                              }}
                              validate={(values) => {
                                const errors = {};

                                if (!values.note) {
                                  errors.note = "Note is required";
                                } else if (values.note.length < 3) {
                                  errors.note =
                                    "Note must be at least 3 characters long";
                                } else if (values.note.length > 150) {
                                  errors.note =
                                    "Note must be at most 150 characters long";
                                }

                                return errors;
                              }}
                              onSubmit={handleFormSubmit}>
                              {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="p-2">
                                  <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                                    Note Details
                                  </h4>

                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Note{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="note"
                                          placeholder="Note"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="note"
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
