import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { createCompanyEmployee } from "../../../redux/actions/company/employeeActions";
import { ROLES } from "../../../config/roles.js";
import Select from 'react-select';

const CreateModelForm = ({ createHandleCloseModal }) => {
  const companyCourseReducer = useSelector((state) => state.companycourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const dispatch = useDispatch();


  const coursesOptions =
  companyCourseReducer.list?.data?.map((course) => ({
      value: course._id,
      label: course.name,
    })) || [];
  
  const handleCancel = () => {
    createHandleCloseModal();
  };

  const handleSubmitEmployee = async (values) => {
    const selectedCourseValues = selectedCourses.map((course) => course.value);
    const formData = {
      ...values,
      courses: selectedCourseValues,
    };
    dispatch(createCompanyEmployee(formData));
    createHandleCloseModal();
  };

  const setSelectedOption = async (values) => {
    setSelectedCourses(values);
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)" }}
      id="myModal"
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ maxHeight: "700px", overflowY: "auto" }}>
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white m-2">Create Employee</h4>
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
                              initialValues={{
                                email: "",
                                first_name: "",
                                last_name: "",
                                job_title: "",
                                address: "",
                                post_code: "",
                                department: "",
                                country: "", // Add the country field
                                role: ROLES.EMPLOYEE,
                                courses: selectedCourses,
                              }}
                              validate={(values) => {
                                const errors = {};

                                if (!values.email) {
                                  errors.email = "Email is required";
                                } else if (
                                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                  )
                                ) {
                                  errors.email = "Invalid email address";
                                }

                                if (!values.first_name) {
                                  errors.first_name = "Firstname is required";
                                } else if (values.first_name.length < 3) {
                                  errors.first_name =
                                    "First name must be at least 3 characters long";
                                } else if (values.first_name.length > 20) {
                                  errors.first_name =
                                    "First name less at least 20 characters long";
                                }

                                if (!values.last_name) {
                                  errors.last_name = "Lastname is required";
                                } else if (values.last_name.length < 3) {
                                  errors.last_name =
                                    "Last name must be at least 3 characters long";
                                } else if (values.last_name.length > 20) {
                                  errors.last_name =
                                    "Last name less at least 20 characters long";
                                }

                                if (!values.job_title) {
                                  errors.job_title = "Jobtitle is required";
                                } else if (values.job_title.length < 3) {
                                  errors.job_title =
                                    "Job Title must be at least 3 characters long";
                                } else if (values.job_title.length > 10) {
                                  errors.job_title =
                                    "Job Title less at least 10 characters long";
                                }

                                if (!values.address) {
                                  errors.address = "Address is required";
                                } else if (values.address.length < 3) {
                                  errors.address =
                                    "Address must be at least 3 characters long";
                                } else if (values.address.length > 30) {
                                  errors.address =
                                    "Address less at least 30 characters long";
                                }

                                if (!values.post_code) {
                                  errors.post_code = "Post code is required";
                                } else if (values.post_code.length < 3) {
                                  errors.post_code =
                                    "Post code must be at least 3 characters long";
                                } else if (values.post_code.length > 10) {
                                  errors.post_code =
                                    "Post code less at least 10 characters long";
                                }

                                if (!values.country) {
                                  errors.country = "Country is required";
                                }

                                if (!values.department) {
                                  errors.department = "Department is required";
                                } else if (values.department.length < 3) {
                                  errors.department =
                                    "Department must be at least 3 characters long";
                                } else if (values.department.length > 10) {
                                  errors.department =
                                    "Department less at least 10 characters long";
                                }

                                // if (!values.courses || values.courses.length === 0) {
                                //   errors.courses = "At least one course must be selected";
                                // }

                                return errors;
                              }}
                              onSubmit={handleSubmitEmployee}
                            >
                              {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                  <div className="row mt-4">
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          First Name{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="first_name"
                                          value={values.first_name}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="First Name"
                                          className={
                                            errors.first_name &&
                                              touched.first_name
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.first_name &&
                                          touched.first_name && (
                                            <div className="input-feedback">
                                              {errors.first_name}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Last Name{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="last_name"
                                          value={values.last_name}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Last Name"
                                          className={
                                            errors.last_name &&
                                              touched.last_name
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.last_name &&
                                          touched.last_name && (
                                            <div className="input-feedback">
                                              {errors.last_name}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Email Address{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="email"
                                          name="email"
                                          value={values.email}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Email Address"
                                          className={
                                            errors.email && touched.email
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.email && touched.email && (
                                          <div className="input-feedback">
                                            {errors.email}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Job Title{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="job_title"
                                          name="job_title"
                                          value={values.job_title}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Job Title"
                                          className={
                                            errors.job_title &&
                                              touched.job_title
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.job_title &&
                                          touched.job_title && (
                                            <div className="input-feedback">
                                              {errors.job_title}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Address{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="address"
                                          value={values.address}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Home Address"
                                          className={
                                            errors.address && touched.address
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.address && touched.address && (
                                          <div className="input-feedback">
                                            {errors.address}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Country{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <select
                                          name="country"
                                          value={values.country}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          className={
                                            errors.country && touched.country
                                              ? "error"
                                              : ""
                                          }
                                        >
                                          <option value="">
                                            Select Country
                                          </option>
                                          <option value="USA">USA</option>
                                          <option value="India">India</option>
                                        </select>
                                        {errors.country && touched.country && (
                                          <div className="input-feedback">
                                            {errors.country}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Post Code{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          name="post_code"
                                          value={values.post_code}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Post Code"
                                          className={
                                            errors.post_code &&
                                              touched.post_code
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.post_code &&
                                          touched.post_code && (
                                            <div className="input-feedback">
                                              {errors.post_code}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Department{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="department"
                                          value={values.department}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Department"
                                          className={
                                            errors.department &&
                                              touched.department
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.department &&
                                          touched.department && (
                                            <div className="input-feedback">
                                              {errors.department}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    
                                    {/* MultiSelect for courses */}
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Courses <span className="require">*</span>
                                        </label>
                                        <Select
                                          value={selectedCourses}
                                          onChange={setSelectedOption}
                                          options={coursesOptions}
                                          onBlur={handleBlur}
                                          name="courses"
                                          isMulti={true}
                                          isSearchable 
                                          className={
                                            errors.courses &&
                                              touched.courses
                                              ? "error"
                                              : ""
                                          }
                                        />


                                        {errors.courses && touched.courses && (
                                          <div className="input-feedback">{errors.courses}</div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="form-btn text-center mt-3">
                                        <button
                                          className="text-uppercase green_bg color_white"
                                          type="submit"
                                          disabled={isSubmitting}
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
  );
};

export default CreateModelForm;
