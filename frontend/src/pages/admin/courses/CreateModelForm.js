import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { CreateCourse } from "../../../redux/actions/admin/courssActions";

const CreateModelForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);

  const createCourse = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("level", values.level);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("fees", values.fees);

    dispatch(CreateCourse(formData));
    handleCloseModal(); // Close the modal after submission
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
      id="myModal"
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ maxHeight: "700px", overflowY: "auto" }}>
          <div className="modal-header site_bg">
            <h4 className="modal-title text-white">Create Course</h4>
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
                if (!values.description) errors.description = "Description is required";
                if (!values.name) errors.name = "Name is required";
                if (!values.level) errors.level = "Level is required";
                if (!values.fees) errors.fees = "Fees is required";
                if (!values.duration) errors.duration = "Duration is required";
                if (!values.image) errors.image = "Image is required";
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
                  <h4 className="mb-3 text-uppercase">Add Course</h4>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="d-block">Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Course Name"
                          className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                        />
                        {errors.name && touched.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>

                    {/* Level Field */}
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="d-block">Level <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="level"
                          value={values.level}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Course Level"
                          className={`form-control ${errors.level && touched.level ? 'is-invalid' : ''}`}
                        />
                        {errors.level && touched.level && (
                          <div className="invalid-feedback">{errors.level}</div>
                        )}
                      </div>
                    </div>

                    {/* Description Field */}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="d-block">Description <span className="text-danger">*</span></label>
                        <textarea
                          name="description"
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Course Description"
                          className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                        />
                        {errors.description && touched.description && (
                          <div className="invalid-feedback">{errors.description}</div>
                        )}
                      </div>
                    </div>

                    {/* Fees Field */}
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="d-block">Fees <span className="text-danger">*</span></label>
                        <input
                          type="number"
                          name="fees"
                          value={values.fees}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Course Fees"
                          className={`form-control ${errors.fees && touched.fees ? 'is-invalid' : ''}`}
                        />
                        {errors.fees && touched.fees && (
                          <div className="invalid-feedback">{errors.fees}</div>
                        )}
                      </div>
                    </div>

                    {/* Duration Field */}
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="d-block">Duration <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="duration"
                          value={values.duration}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Course Duration"
                          className={`form-control ${errors.duration && touched.duration ? 'is-invalid' : ''}`}
                        />
                        {errors.duration && touched.duration && (
                          <div className="invalid-feedback">{errors.duration}</div>
                        )}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="d-block">Image <span className="text-danger">*</span></label>
                        <input
                          type="file"
                          name="image"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("image", file);
                            if (file) {
                              const imageURL = URL.createObjectURL(file);
                              setPreviewImage(imageURL);
                            } else {
                              setPreviewImage(null);
                            }
                          }}
                          className={`form-control-file ${errors.image && touched.image ? 'is-invalid' : ''}`}
                        />
                        {errors.image && touched.image && (
                          <div className="invalid-feedback">{errors.image}</div>
                        )}
                      </div>
                      {previewImage && (
                        <div className="image-preview mt-3">
                          <img src={previewImage} alt="Preview" className="img-thumbnail" style={{ width: "150px" }} />
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12">
                      <div className="form-btn text-center mt-3">
                        <button
                          className="btn btn-primary text-uppercase"
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
  );
};

export default CreateModelForm;
