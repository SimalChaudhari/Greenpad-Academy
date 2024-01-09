import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { CreateCompany } from "../../redux/actions/admin/companyActions";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

const CreateModelForm = ({ createHandleCloseModal }) => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const coursesOptions =
    coursesReducer?.data?.map((course) => ({
      value: course._id,
      label: course.name,
    })) || [];

  const handleCancel = () => {
    createHandleCloseModal();
  };

  const handleCreate = async (values) => {
    dispatch(CreateCompany(values));
    createHandleCloseModal();
  };

  const setSelectedOption = async (values) => {
    setSelectedCourses(values);
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block" }}
      id="myModal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Create Company</h4>
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
                                company_name: "",
                                email: "",
                                address: "",
                                post_code: "",
                                country: "", // Add the country field
                                courses: selectedCourses, // Initialize courses as an empty array
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

                                if (!values.company_name) {
                                  errors.company_name =
                                    "Company Name is required";
                                } else if (values.company_name.length < 3) {
                                  errors.company_name =
                                    "Company Name must be at least 3 characters long";
                                } else if (values.company_name.length > 20) {
                                  errors.company_name =
                                    "Company Name less at least 20 characters long";
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

                                // Validate courses field
                                if (!values.courses || values.courses.length === 0) {
                                  errors.courses = "At least one course must be selected";
                                }
                                return errors;
                              }}
                              onSubmit={handleCreate}
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
                                  <h4 className="mb-3 mt-3 text-uppercase">
                                    Add details
                                  </h4>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Company Name{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="company_name"
                                          value={values.company_name}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Company Name"
                                          className={
                                            errors.company_name &&
                                              touched.company_name
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.company_name &&
                                          touched.company_name && (
                                            <div className="input-feedback">
                                              {errors.company_name}
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
                                          {/* Add more country options as needed */}
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
  );
};

export default CreateModelForm;
