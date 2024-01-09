import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { CreateCourse } from "../../redux/actions/admin/courssActions";
import { toast } from "react-toastify";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { } from "../../redux/actions";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};
const CreateModelForm = ({ companyData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  // const companyReducer = useSelector((state) => state.company);
  const [filter, setFilter] = useState(defaultFilter);
  const [formInputs, setFormInputs] = useState(companyData);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  useEffect(() => {
    // dispatch(getAllCompanies(filter));
  }, []);

  const handleFormSubmit = (values) => {
    handleUpdate(values);
    // dispatch(editCompanyById(values));
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const createCourse = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image);
    dispatch(CreateCourse(values, formData));
    handleCloseModal(); // Close the modal
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
            <h4 className="modal-title color_white p-2">Create Course</h4>
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
                                name: "",
                                description: "",
                                level: "",
                                fees: "",
                                duration: "",
                                image: "",
                              }}
                              validate={(values) => {
                                const errors = {};

                                if (!values.description) {
                                  errors.description =
                                    "Description is required";
                                } else if (values.description.length < 3) {
                                  errors.description =
                                    "Description must be at least 3 characters long";
                                } else if (values.description.length > 30000) {
                                  errors.description =
                                    "Description less at least 30000 characters long";
                                }

                                if (!values.name) {
                                  errors.name = "Name is required";
                                } else if (values.name.length < 3) {
                                  errors.name =
                                    "Name must be at least 3 characters long";
                                } else if (values.name.length > 10) {
                                  errors.name =
                                    "Name less at least 10 characters long";
                                }

                                if (!values.level) {
                                  errors.level = "Level is required";
                                } else if (values.level.length < 3) {
                                  errors.level =
                                    "Level must be at least 3 characters long";
                                } else if (values.level.length > 10) {
                                  errors.level =
                                    "Level less at least 10 characters long";
                                }

                                if (!values.fees) {
                                  errors.fees = "Fees is required";
                                } else if (values.fees.length < 1) {
                                  errors.fees =
                                    "Fees must be at least 1 characters long";
                                } else if (values.fees.length > 6) {
                                  errors.fees =
                                    "Fees less at least 6 characters long";
                                }

                                if (!values.duration) {
                                  errors.duration = "Duration is required";
                                } else if (values.duration.length < 3) {
                                  errors.duration =
                                    "Duration must be at least 3 characters long";
                                } else if (values.duration.length > 20) {
                                  errors.duration =
                                    "Duration less at least 20 characters long";
                                }

                                if (!values.image) {
                                  errors.image = "Image is required";
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
                                setFieldValue,
                                isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                  <h4 className="mb-3 mt-3 text-uppercase">
                                    Add course
                                  </h4>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Name{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="name"
                                          value={values.name}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Name"
                                          className={
                                            errors.name && touched.name
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.name && touched.name && (
                                          <div className="input-feedback">
                                            {errors.name}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Level{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="level"
                                          value={values.level}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Level"
                                          className={
                                            errors.level && touched.level
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.level && touched.level && (
                                          <div className="input-feedback">
                                            {errors.level}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Description{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="description"
                                          name="description"
                                          value={values.description}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Description"
                                          className={
                                            errors.description &&
                                            touched.description
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.description &&
                                          touched.description && (
                                            <div className="input-feedback">
                                              {errors.description}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    {/* CK Editor */}
                                    {/* <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Description{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <CKEditor
                                          editor={ClassicEditor}
                                          value={values.description}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setFieldValue("description", data);
                                          }}
                                          onBlur={handleBlur}
                                          config={{}}
                                        />

                                        {errors.description &&
                                          touched.description && (
                                            <div className="input-feedback">
                                              {errors.description}
                                            </div>
                                          )}
                                      </div>
                                    </div> */}

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Fees{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          name="fees"
                                          value={values.fees}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Fees"
                                          className={
                                            errors.fees && touched.fees
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.fees && touched.fees && (
                                          <div className="input-feedback">
                                            {errors.fees}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Duration{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="duration"
                                          value={values.duration}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Duration"
                                          className={
                                            errors.duration && touched.duration
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.duration &&
                                          touched.duration && (
                                            <div className="input-feedback">
                                              {errors.duration}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Image{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          style={{
                                            cursor: "pointer",
                                            border: "1px solid #767676",
                                            padding: "5px",
                                            borderRadius: "2px",
                                          }}
                                          type="file"
                                          name="image"
                                          placeholder="Chose image"
                                          onChange={(event) => {
                                            const file =
                                              event.currentTarget.files[0];
                                            setFieldValue("image", file);
                                            if (file) {
                                              const imageURL =
                                                URL.createObjectURL(file);
                                              setPreviewImage(imageURL);
                                              // uploadImage(file); // Call the function to upload the image
                                            } else {
                                              setPreviewImage(null);
                                            }
                                          }}
                                          // value={values.image}
                                          onBlur={handleBlur}
                                          // onChange={handleChange}
                                          className={
                                            errors.image && touched.image
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.image && touched.image && (
                                          <div className="input-feedback">
                                            {errors.image}
                                          </div>
                                        )}
                                      </div>
                                      {previewImage && (
                                        <div className="image-preview col-lg-4">
                                          <img
                                            style={{ width: "150px" }}
                                            src={previewImage}
                                            alt="Preview"
                                          />
                                        </div>
                                      )}
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
