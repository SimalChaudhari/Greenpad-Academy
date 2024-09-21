import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateEmployee } from "../../../redux/actions/admin/employeeActions";
import './CreateEmployeeForm.css'; // Custom CSS for styling

const EditModelForm = ({ employeeData, handleUpdate, handleCloseModal }) => {
  const companyReducer = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const companies = companyReducer?.list?.data || [];
  const filteredCompanies = companies?.map(({ _id, company_name }) => ({
    _id,
    company_name,
  }));

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleSubmitEmployee = async (values) => {
    await dispatch(updateEmployee(values?._id, values));
    handleUpdate(values);
    handleCloseModal();
  };

  return (
    <div
      className="modal fade show editEmployeeModal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="editEmployeeModal"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white">
            <h5 className="modal-title text-white">Update Employee</h5>
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
                email: employeeData.email || "",
                first_name: employeeData.first_name || "",
                last_name: employeeData.last_name || "",
                job_title: employeeData.job_title || "",
                address: employeeData.address || "",
                post_code: employeeData.post_code || "",
                department: employeeData.department || "",
                country: employeeData.country || "",
                created_by: employeeData.created_by || "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) errors.email = "Email is required";
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                  errors.email = "Invalid email address";

                if (!values.first_name) errors.first_name = "First name is required";
                if (!values.last_name) errors.last_name = "Last name is required";
                if (!values.job_title) errors.job_title = "Job title is required";
                if (!values.address) errors.address = "Address is required";
                if (!values.post_code) errors.post_code = "Post code is required";
                if (!values.country) errors.country = "Country is required";
                if (!values.department) errors.department = "Department is required";
                if (!values.created_by) errors.created_by = "Company is required";

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
                  <div className="row">
                    {/* First Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="first_name"
                          className={`form-control ${errors.first_name && touched.first_name ? 'is-invalid' : ''}`}
                          value={values.first_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                        />
                        {errors.first_name && touched.first_name && (
                          <div className="invalid-feedback">{errors.first_name}</div>
                        )}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="last_name"
                          className={`form-control ${errors.last_name && touched.last_name ? 'is-invalid' : ''}`}
                          value={values.last_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                        {errors.last_name && touched.last_name && (
                          <div className="invalid-feedback">{errors.last_name}</div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
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

                    {/* Job Title */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Job Title <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="job_title"
                          className={`form-control ${errors.job_title && touched.job_title ? 'is-invalid' : ''}`}
                          value={values.job_title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Job Title"
                        />
                        {errors.job_title && touched.job_title && (
                          <div className="invalid-feedback">{errors.job_title}</div>
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
                          className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
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

                    {/* Post Code */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Post Code <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="post_code"
                          className={`form-control ${errors.post_code && touched.post_code ? 'is-invalid' : ''}`}
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

                    {/* Country */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Country <span className="text-danger">*</span></label>
                        <select
                          name="country"
                          className={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`}
                          value={values.country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="India">India</option>
                        </select>
                        {errors.country && touched.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                        )}
                      </div>
                    </div>

                    {/* Department */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="department"
                          className={`form-control ${errors.department && touched.department ? 'is-invalid' : ''}`}
                          value={values.department}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Department"
                        />
                        {errors.department && touched.department && (
                          <div className="invalid-feedback">{errors.department}</div>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company <span className="text-danger">*</span></label>
                        <select
                          name="created_by"
                          className={`form-control ${errors.created_by && touched.created_by ? 'is-invalid' : ''}`}
                          value={values.created_by}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="">Select Company</option>
                          {filteredCompanies.map(({ _id, company_name }) => (
                            <option key={_id} value={_id}>{company_name}</option>
                          ))}
                        </select>
                        {errors.created_by && touched.created_by && (
                          <div className="invalid-feedback">{errors.created_by}</div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-center mt-3">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update Employee
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
