import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout.js";
import {
  editEmployeeById,
  getEmployeeProfileById,
} from "../../redux/actions/employee/employeeActions.js";
import { IMAGE_URL } from "../../config/config";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";

const Edit = ({ handleUpdate }) => {
  const dispatch = useDispatch();
  const useremployeeReducer = useSelector(
    (state) => state?.useremployee?.list?.data
  );
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const navigatePage = (path) => {
    navigate(path);
  };
  const location = useLocation();
  const authId = location?.pathname?.split("/")[3];

  useEffect(() => {
    dispatch(getEmployeeProfileById(authId));
  }, []);

  const [formInputs, setFormInputs] = useState(useremployeeReducer);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: name === "image" ? selectedImage : value,
      // [name]: value,
    }));
  };

  const handleFormSubmit = (values) => {
    try {
      const formData = new FormData();
      formData.append("_id", values._id);
      formData.append("company_name", values.company_name);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("country", values.country);
      formData.append("post_code", values.post_code);
      // Create a new FormData to handle file data
      if (selectedImage !== null) {
        formData.append("image", selectedImage);
      }

      dispatch(editEmployeeById(values._id, formData));
      navigatePage("/");
    } catch (error) {
      console.error("Error updating User:", error);
    }
  };

  return (
    <Layout>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-9 mx-auto">
              <div className="register_eroll">
                <div className="enrollment_tab">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active white_bg "
                        data-toggle="tab"
                        href="#individual">
                        Update Profile
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane container active p-0"
                    id="individual">
                    <div className="register_form pl-5 pr-5 pb-4 pt-2">
                      <Formik
                        // initialValues={formInputs}
                        initialValues={{
                          _id: useremployeeReducer?._id
                            ? useremployeeReducer?._id
                            : "",
                          company_name: useremployeeReducer?.company_name
                            ? useremployeeReducer?.company_name
                            : "",
                          email: useremployeeReducer?.email
                            ? useremployeeReducer?.email
                            : "",
                          address: useremployeeReducer?.address
                            ? useremployeeReducer?.address
                            : "",
                          country: useremployeeReducer?.country
                            ? useremployeeReducer?.country
                            : "",
                          post_code: useremployeeReducer?.post_code
                            ? useremployeeReducer?.post_code
                            : "",
                          image: useremployeeReducer?.image
                            ? useremployeeReducer?.image
                            : "",
                          // image: previewImage || null,
                        }}
                        validate={(values) => {
                          const errors = {};

                          if (!values.company_name) {
                            errors.company_name = "Company name is required";
                          } else if (values.company_name.length < 3) {
                            errors.company_name =
                              "Company Name must be at least 3 characters long";
                          } else if (values.company_name.length > 20) {
                            errors.company_name =
                              "Company Name less at least 20 characters long";
                          }

                          if (!values.email) {
                            errors.email = "Email is required";
                          } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              values.email
                            )
                          ) {
                            errors.email = "Invalid email address";
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

                          return errors;
                        }}
                        onSubmit={handleFormSubmit}>
                        {({ handleSubmit, isSubmitting }) => (
                          <form onSubmit={handleSubmit} className="p-2">
                            <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                              Company details
                            </h4>
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
                                    Address <span className="require">*</span>
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
                                    Country <span className="require">*</span>
                                  </label>
                                  <Field
                                    as="select"
                                    name="country"
                                    className="form-control">
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
                                    Post Code <span className="require">*</span>
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
                                  <label className="d-block">Image</label>
                                  <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setSelectedImage(e.target.files[0])
                                    }
                                    className="form-control"
                                  />
                                  {formInputs.image && (
                                    <img
                                      src={`${IMAGE_URL}/${formInputs.image}`}
                                      alt="Course"
                                      style={{
                                        height: "150px",
                                        width: "150px",
                                        borderRradius: "100%",
                                        overflow: "hidden",
                                        border: "4px solid #fff",
                                        boxShadow: "0px 0px 4px #c3c0c0",
                                        borderRadius: "50%",
                                        padding: "4px",
                                        marginTop: "10px",
                                      }}
                                    />
                                  )}
                                  {selectedImage && (
                                    <img
                                      src={URL.createObjectURL(selectedImage)}
                                      alt="Selected"
                                      style={{
                                        height: "150px",
                                        width: "150px",
                                        borderRradius: "100%",
                                        overflow: "hidden",
                                        border: "4px solid #fff",
                                        boxShadow: "0px 0px 4px #c3c0c0",
                                        borderRadius: "50%",
                                        padding: "4px",
                                        marginTop: "10px",
                                      }}
                                    />
                                  )}
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
    </Layout>
  );
};

export default Edit;
