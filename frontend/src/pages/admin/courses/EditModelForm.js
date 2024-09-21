import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import {
  getAllCourses,
  editCoursesById,
} from "../../../redux/actions/admin/courssActions";
import { IMAGE_URL } from "../../../config/config";

const EditModelForm = ({ courseData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formInputs, setFormInputs] = useState(courseData);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    formData.append("name", values.name);
    formData.append("level", values.level);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("fees", values.fees);

    await dispatch(editCoursesById(courseData._id, formData));
    handleUpdate(formData);
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade show"
      style={{
        paddingRight: "17px",
        display: "block",
        background: "rgba(0, 0, 0, 0.5)",
      }}
      id="editModal"
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          <div className="modal-header site_bg">
            <h4 className="modal-title text-white">Update Course</h4>
            <button
              onClick={handleCancel}
              type="button"
              className="close text-white"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>

          <div className="modal-body">
            <section>
              <div className="row m-2">
                <div className="col-lg-12 col-md-12 mx-auto">
                  <div className="">
                    <Formik
                      initialValues={{
                        name: formInputs.name || "",
                        level: formInputs.level || "",
                        description: formInputs.description || "",
                        duration: formInputs.duration || "",
                        fees: formInputs.fees || "",
                        image: "",
                      }}
                      validate={(values) => {
                        const errors = {};

                        if (!values.name) errors.name = "Name is required";
                        if (!values.description)
                          errors.description = "Description is required";
                        if (!values.level) errors.level = "Level is required";
                        if (!values.fees) errors.fees = "Fees is required";
                        if (!values.duration)
                          errors.duration = "Duration is required";

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
                        setFieldValue,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <h4 className="mb-3 text-uppercase">Course Details</h4>
                          <div className="row">
                            {/* Name Field */}
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">
                                  Name <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Course Name"
                                  className={`form-control ${
                                    errors.name && touched.name
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* Level Field */}
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">
                                  Level <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="level"
                                  placeholder="Course Level"
                                  className={`form-control ${
                                    errors.level && touched.level
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="level"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* Description Field */}
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="d-block">
                                  Description{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  as="textarea"
                                  name="description"
                                  placeholder="Course Description"
                                  className={`form-control ${
                                    errors.description && touched.description
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* Fees Field */}
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">
                                  Fees <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="number"
                                  name="fees"
                                  placeholder="Course Fees"
                                  className={`form-control ${
                                    errors.fees && touched.fees
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="fees"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* Duration Field */}
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">
                                  Duration <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="duration"
                                  placeholder="Course Duration"
                                  className={`form-control ${
                                    errors.duration && touched.duration
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="duration"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* Image Upload */}
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
                                {formInputs.image && !selectedImage && (
                                  <img
                                    src={`${IMAGE_URL}/${formInputs.image}`}
                                    alt="Course"
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: "200px" }}
                                  />
                                )}
                                {selectedImage && (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: "200px" }}
                                  />
                                )}
                              </div>
                            </div>

                            {/* Submit Button */}
                            <div className="col-lg-12 text-center mt-3">
                              <button
                                className="btn btn-primary text-uppercase"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
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
