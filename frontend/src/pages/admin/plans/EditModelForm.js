import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import { editPlansById } from "../../../redux/actions/Plans/plansActions";

const EditModelForm = ({ plansData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState(plansData);  

  // Handle form submission
  const handleFormSubmit = async (values) => {
    try {
      // Update the plan
      await handleUpdate(values);
      await dispatch(editPlansById(values._id, values));
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  // Close modal function
  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade show editPlanModal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="editPlanModal"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white site_bg">
            <h5 className="modal-title">Update Plan</h5>
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
                ...formInputs,
              }}
              validate={(values) => {
                const errors = {};

                // Title validation
                if (!values.title) {
                  errors.title = "Title is required";
                } else if (values.title.length < 3) {
                  errors.title = "Title must be at least 3 characters long";
                } else if (values.title.length > 100) {
                  errors.title = "Title must be less than 100 characters long";
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
                  <div className="row">
                    {/* Plan Title Input */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Plan Title <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter plan title"
                          className={`form-control ${
                            errors.title && touched.title ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12 text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
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
    </div>
  );
};

export default EditModelForm;
