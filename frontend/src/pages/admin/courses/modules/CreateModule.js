import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { addCoursesModuleById } from "../../../../redux/actions/admin/courssActions";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const Create = ({ companyData, handleUpdate, handleCloseCourseModal, courseData }) => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState(companyData);
  const { id } = useParams();
  const moduleId = courseData;

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = (values) => {
    handleUpdate(values);
    // dispatch(editCompanyById(values));
  };

  const handleCancel = () => {
    handleCloseCourseModal();
  };


  const createCourse = async (values) => {
    const formData = {
      courseId: id,
      ...values,
    };
    dispatch(addCoursesModuleById(formData));
    handleCloseCourseModal();
  };

  return (
    <div>

        <div
          className="modal fade fourm_modal show"
          style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header site_bg">
                <h4 className="modal-title color_white p-2">Create Course Modules</h4>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                >
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
                            >
                              <div className="register_form">
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    module_title: "",
                                    // description: discriptionValue,
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
                                        "Title less at least 100 characters long";
                                    }
                                    return errors;
                                  }}
                                  onSubmit={createCourse}
                                >
                                  {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    //setFieldValue,
                                    isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit} id="myModal">
                                      <h4 className="mb-3 mt-3 text-uppercase">
                                        Add Course Modules
                                      </h4>
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="form-group">
                                            <label className="d-block">
                                              Title{" "}
                                              <span className="require">*</span>
                                            </label>
                                            <input
                                              type="text"
                                              name="module_title"
                                              value={values.module_title}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              placeholder="Title"
                                              className={
                                                errors.module_title && touched.module_title
                                                  ? "error"
                                                  : ""
                                              }
                                            />
                                            {errors.module_title && touched.module_title && (
                                              <div className="input-feedback">
                                                {errors.module_title}
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        <div className="col-lg-12 pt-4">
                                          <div className="form-btn text-center mt-3">
                                            <button
                                              className="text-uppercase green_bg color_white"
                                              type="submit"
                                              disabled={isSubmitting}
                                              // disabled={isSubmitting}
                                            >
                                              Submit
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
    </div>
  );
};

export default Create;
