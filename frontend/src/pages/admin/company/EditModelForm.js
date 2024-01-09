import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import {
  getAllCompanies,
  editCompanyById,
} from "../../../redux/actions/admin/companyActions";
import Select from "react-select";

const EditModelForm = ({ companyData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [formInputs, setFormInputs] = useState(companyData);

  const coursesOptions = coursesReducer?.data?.map((course) => ({
      value: course._id,
      label: course.name,
    })) || [];

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getAllCompanies());
    setSelectedCourses(companyData?.courses?.map(item => ({ "value": item?._id, "label": item?.name })));

  }, [companyData]);

  const handleFormSubmit = (values) => {
    handleUpdate(values);    
    const selectedCourseValues = selectedCourses.map((course) => course.value);

    // Combine the selected course values with the other form values
    const formData = {
      ...values,
      courses: selectedCourseValues,
    };

    // Now you can log the formData which includes the selected courses' values
    dispatch(editCompanyById(companyData?._id, formData));
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleCourseChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions);
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
            <h4 className="modal-title color_white p-2">Update Company</h4>
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
                              company_name:companyData?.company_name ? companyData?.company_name : "",
                              email: companyData?.email ? companyData?.email : "",
                              address: companyData?.address ? companyData?.address : "",  
                              post_code: companyData?.post_code ? companyData?.post_code : "",  
                              country: companyData?.country ? companyData?.country : "",  
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
                                    "Company name is required";
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
                                // if (!values.courses || values.courses.length === 0) {
                                //   errors.courses = "At least one course must be selected";
                                // }
                                return errors;
                              }}
                              onSubmit={handleFormSubmit}
                            >
                              {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="p-2">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Company Name{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="company_name"
                                          placeholder="Company Name"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="company_name"
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
                                          Post Code{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Field
                                          type="number"
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
                                      <div className="form-group">
                                        <label className="d-block">
                                          Courses{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Select
                                          value={selectedCourses}
                                          onChange={handleCourseChange}
                                          options={coursesOptions}
                                          name="courses"
                                          isMulti={true}
                                          isSearchable
                                        />

                                        {/* {errors.courses && touched.courses && (
                                          <div className="input-feedback">
                                            {errors.courses}
                                          </div>
                                        )} */}
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
