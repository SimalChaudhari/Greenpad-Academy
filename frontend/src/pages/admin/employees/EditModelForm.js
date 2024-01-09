import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import { updateEmployee } from "../../../redux/actions/admin/employeeActions";
const EditModelForm = ({ employeeData, handleUpdate, handleCloseModal }) => {
  const companyReducer = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState(employeeData);

  const companies = companyReducer?.list?.data || [];
  const filteredCompanies = companies.map(({ _id, company_name }) => ({
    _id,
    company_name,
  }));

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (values) => {
    handleUpdate(values);
    const data = await dispatch(updateEmployee(values?._id, values));
    if (data) {
      handleCloseModal();
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

    return (
      <div
        className="modal fade fourm_modal show"
        style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
        id="myModal"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <div className="modal-header site_bg">
              <h4 className="modal-title color_white m-2">Update Employee</h4>
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
                                initialValues={formInputs}
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

                                  if (!values.job_title) {
                                    errors.job_title = "Job Title is required";
                                  } else if (values.job_title.length < 3) {
                                    errors.job_title =
                                      "Job Title must be at least 3 characters long";
                                  } else if (values.job_title.length > 10) {
                                    errors.job_title =
                                      "Job Title less at least 10 characters long";
                                  }

                                  if (!values.first_name) {
                                    errors.first_name =
                                      "First name is required";
                                  } else if (values.first_name.length < 3) {
                                    errors.first_name =
                                      "First name must be at least 3 characters long";
                                  } else if (values.first_name.length > 20) {
                                    errors.first_name =
                                      "First name less at least 20 characters long";
                                  }

                                  if (!values.last_name) {
                                    errors.last_name = "Last name is required";
                                  } else if (values.last_name.length < 3) {
                                    errors.last_name =
                                      "Last name must be at least 3 characters long";
                                  } else if (values.last_name.length > 20) {
                                    errors.last_name =
                                      "Last name less at least 20 characters long";
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

                                  if (!values.department) {
                                    errors.department =
                                      "Department is required";
                                  } else if (values.department.length < 3) {
                                    errors.department =
                                      "Department must be at least 3 characters long";
                                  } else if (values.department.length > 10) {
                                    errors.department =
                                      "Department less at least 10 characters long";
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

                                  return errors;
                                }}
                                onSubmit={handleFormSubmit}
                              >
                                {({ handleSubmit, isSubmitting }) => (
                                  <form
                                    onSubmit={handleSubmit}
                                    className="mt-3"
                                  >
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            First Name{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="first_name"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Last Name{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="last_name"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Email Address{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Job Title{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="job_title"
                                            placeholder="Job Title"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="job_title"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Address{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="address"
                                            placeholder="Home Address"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Department{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="department"
                                            placeholder="Department"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="department"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Country{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            as="select"
                                            name="country"
                                            className="form-control"
                                          >
                                            <option value="">Country</option>
                                            <option value="USA">USA</option>
                                            <option value="India">India</option>
                                          </Field>
                                          <ErrorMessage
                                            name="country"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Company{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            as="select"
                                            name="created_by"
                                            className="form-control"
                                          >
                                            <option value="">
                                              Select Company
                                            </option>
                                            {filteredCompanies.map(
                                              ({ _id, company_name }) => (
                                                <option key={_id} value={_id}>
                                                  {company_name}
                                                </option>
                                              )
                                            )}
                                          </Field>
                                          <ErrorMessage
                                            name="created_by"
                                            component="div"
                                            className="input-feedback"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label className="d-block">
                                            Post Code{" "}
                                            <span className="require">*</span>
                                          </label>
                                          <Field
                                            type="text"
                                            name="post_code"
                                            placeholder="Post Code"
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            name="post_code"
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
                                            disabled={isSubmitting}
                                          >
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
