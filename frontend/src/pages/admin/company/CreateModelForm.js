import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { CreateCompany } from "../../../redux/actions/admin/companyActions";
import Select from "react-select"; // For searchable multi-select dropdown
import "./style.css"; // Add custom CSS for styling

const CreateModelForm = ({ createHandleCloseModal }) => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Course options for the multi-select dropdown
  const coursesOptions =
    coursesReducer?.data?.map((course) => ({
      value: course._id,
      label: course.name,
    })) || [];

  const handleCancel = () => {
    createHandleCloseModal();
  };

  const handleCreate = async (values) => {
    const formData = {
      ...values,
      courses: selectedCourses.map((course) => course.value), // Extracting course IDs
    };

    dispatch(CreateCompany(formData));
    createHandleCloseModal();
  };

  return (
    <div
      className="modal fade show create-company-modal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="createCompanyModal"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white">
            <h5 className="modal-title text-white">Create Company</h5>
            <button
              type="button"
              className="close text-white"
              onClick={handleCancel}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                company_name: "",
                email: "",
                address: "",
                post_code: "",
                country: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = "Email is required";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Invalid email address";
                }

                if (!values.company_name) {
                  errors.company_name = "Company Name is required";
                } else if (values.company_name.length < 3) {
                  errors.company_name = "Company Name must be at least 3 characters long";
                } else if (values.company_name.length > 20) {
                  errors.company_name = "Company Name must be less than 20 characters long";
                }

                if (!values.address) {
                  errors.address = "Address is required";
                }

                if (!values.post_code) {
                  errors.post_code = "Post code is required";
                } else if (values.post_code.length < 3) {
                  errors.post_code = "Post code must be at least 3 characters long";
                }

                if (!values.country) {
                  errors.country = "Country is required";
                }

                if (selectedCourses.length === 0) {
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
                  <h4 className="mb-3 text-uppercase">Add Company Details</h4>
                  <div className="row">
                    {/* Company Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="company_name"
                          className={`form-control ${errors.company_name && touched.company_name ? "is-invalid" : ""}`}
                          value={values.company_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Company Name"
                        />
                        {errors.company_name && touched.company_name && (
                          <div className="invalid-feedback">{errors.company_name}</div>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Email Address"
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="address"
                          className={`form-control ${errors.address && touched.address ? "is-invalid" : ""}`}
                          value={values.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        {errors.address && touched.address && (
                          <div className="invalid-feedback">{errors.address}</div>
                        )}
                      </div>
                    </div>

                    {/* Country */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Country <span className="text-danger">*</span></label>
                        <select
                          name="country"
                          className={`form-control ${errors.country && touched.country ? "is-invalid" : ""}`}
                          value={values.country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="India">India</option>
                          {/* Add more countries as needed */}
                        </select>
                        {errors.country && touched.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                        )}
                      </div>
                    </div>

                    {/* Post Code */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Post Code <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="post_code"
                          className={`form-control ${errors.post_code && touched.post_code ? "is-invalid" : ""}`}
                          value={values.post_code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Post Code"
                        />
                        {errors.post_code && touched.post_code && (
                          <div className="invalid-feedback">{errors.post_code}</div>
                        )}
                      </div>
                    </div>

                    {/* Courses Multi-Select */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Courses <span className="text-danger">*</span></label>
                        <Select
                          value={selectedCourses}
                          onChange={setSelectedCourses}
                          options={coursesOptions}
                          isMulti
                          isSearchable
                          placeholder="Select Courses"
                          className={errors.courses && touched.courses ? "is-invalid" : ""}
                        />
                        {errors.courses && touched.courses && (
                          <div className="invalid-feedback">{errors.courses}</div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Create Company
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModelForm;
