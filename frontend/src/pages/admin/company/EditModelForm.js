import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import { getAllCompanies, editCompanyById } from "../../../redux/actions/admin/companyActions";
import Select from "react-select";
import './style.css'; // Custom CSS for consistent styling

const EditModelForm = ({ companyData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Course options for the multi-select dropdown
  const coursesOptions = coursesReducer?.data?.map((course) => ({
    value: course._id,
    label: course.name,
  })) || [];

  useEffect(() => {
    dispatch(getAllCompanies());
    // Initialize selected courses from company data
    setSelectedCourses(companyData?.courses?.map((item) => ({
      value: item?._id,
      label: item?.name,
    })));
  }, [companyData]);

  const handleFormSubmit = (values) => {
    const selectedCourseValues = selectedCourses.map((course) => course.value);
    const formData = {
      ...values,
      courses: selectedCourseValues,
    };
    dispatch(editCompanyById(companyData?._id, formData));
    handleUpdate(formData);  // Update the parent component
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade show edit-company-modal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="editCompanyModal"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white">
            <h5 className="modal-title text-white">Update Company</h5>
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
              enableReinitialize
              initialValues={{
                company_name: companyData?.company_name || "",
                email: companyData?.email || "",
                address: companyData?.address || "",
                post_code: companyData?.post_code || "",
                country: companyData?.country || "",
                courses: selectedCourses,
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
                }
                if (!values.address) {
                  errors.address = "Address is required";
                }
                if (!values.post_code) {
                  errors.post_code = "Post code is required";
                }
                if (!values.country) {
                  errors.country = "Country is required";
                }
                return errors;
              }}
              onSubmit={handleFormSubmit}
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
                  <h4 className="mb-3 mt-3 text-uppercase">Update Company Details</h4>
                  <div className="row">
                    {/* Company Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company Name <span className="text-danger">*</span></label>
                        <Field
                          type="text"
                          name="company_name"
                          className={`form-control ${errors.company_name && touched.company_name ? "is-invalid" : ""}`}
                          value={values.company_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Company Name"
                        />
                        <ErrorMessage name="company_name" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address <span className="text-danger">*</span></label>
                        <Field
                          type="email"
                          name="email"
                          className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Email Address"
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address <span className="text-danger">*</span></label>
                        <Field
                          type="text"
                          name="address"
                          className={`form-control ${errors.address && touched.address ? "is-invalid" : ""}`}
                          value={values.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Country <span className="text-danger">*</span></label>
                        <Field
                          as="select"
                          name="country"
                          className={`form-control ${errors.country && touched.country ? "is-invalid" : ""}`}
                          value={values.country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="India">India</option>
                        </Field>
                        <ErrorMessage name="country" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    {/* Post Code */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Post Code <span className="text-danger">*</span></label>
                        <Field
                          type="text"
                          name="post_code"
                          className={`form-control ${errors.post_code && touched.post_code ? "is-invalid" : ""}`}
                          value={values.post_code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Post Code"
                        />
                        <ErrorMessage name="post_code" component="div" className="invalid-feedback" />
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
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-center mt-3">
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Update Company
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

export default EditModelForm;
