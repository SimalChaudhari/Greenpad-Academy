import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { createPlans } from "../../../redux/actions/Plans/plansActions";
import './CreatePlanForm.css'; // Custom CSS for the form, ensure to style it similarly to Create Company

const CreateModelForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    handleCloseModal();
  };

  const createPlan = async (values) => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("title", values.title);

    dispatch(createPlans(formData));
    handleCloseModal(); // Close the modal after creating a plan
  };

  return (
    <div
      className="modal fade show createPlanModal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="createPlanModal"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white site_bg">
            <h5 className="modal-title text-white">Create Plan</h5>
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
                title: "",
                file: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Title is required";
                } else if (values.title.length < 3) {
                  errors.title = "Title must be at least 3 characters long";
                } else if (values.title.length > 50) {
                  errors.title = "Title must be less than 50 characters long";
                }

                if (!values.file) {
                  errors.file = "File is required";
                }

                return errors;
              }}
              onSubmit={createPlan}
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
                  <div className="row">
                    {/* Title Input */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Plan Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={values.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter plan title"
                          className={`form-control ${
                            errors.title && touched.title ? "is-invalid" : ""
                          }`}
                        />
                        {errors.title && touched.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Upload File <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="file"
                          accept="application/pdf"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("file", file);
                          }}
                          onBlur={handleBlur}
                          className={`form-control ${
                            errors.file && touched.file ? "is-invalid" : ""
                          }`}
                        />
                        {errors.file && touched.file && (
                          <div className="invalid-feedback">{errors.file}</div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={isSubmitting}
                      >
                        Submit
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
