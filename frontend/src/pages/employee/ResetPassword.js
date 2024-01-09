import React from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editEmployeeById } from "../../redux/actions/employee/employeeActions.js";

function ResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authReducer = useSelector((state) => state?.auth?.user);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
        _id: authReducer.id,
        email: authReducer.email,
        role: authReducer.role,
        username: authReducer.username,
      };

      // Dispatch the action to reset the password
      await dispatch(editEmployeeById(authReducer.id, formData));

      // Navigate to a success page or login page after successful submission
      navigate("/"); // Adjust the path as needed

    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error (e.g., display an error message)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="register_page">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-9 mx-auto">
            <div className="register_eroll">
              <h3 className="mb-4 p-2 site_bg color_white text-uppercase">
                Reset Password
              </h3>
              <div className="tab-content">
                <div className="tab-pane container active p-0">
                  <div className="register_form pl-5 pr-5 pb-4 pt-2">
                    <Formik
                      initialValues={{ password: "", confirmPassword: "" }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.password) {
                          errors.password = "Password is required";
                        } else if (values.password.length < 6) {
                          errors.password =
                            "Password must be at least 6 characters long";
                        }
                        if (!values.confirmPassword) {
                          errors.confirmPassword =
                            "Confirm Password is required";
                        } else if (values.confirmPassword !== values.password) {
                          errors.confirmPassword = "Passwords do not match";
                        }
                        return errors;
                      }}
                      onSubmit={handleSubmit}
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
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="d-block">
                                  New Password *
                                </label>
                                <input
                                  type="password"
                                  name="password"
                                  value={values.password}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="New Password"
                                  className={
                                    errors.password && touched.password
                                      ? "error"
                                      : ""
                                  }
                                />
                                {errors.password && touched.password && (
                                  <div className="input-feedback">
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="d-block">
                                  Confirm Password *
                                </label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  value={values.confirmPassword}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Confirm Password"
                                  className={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                      ? "error"
                                      : ""
                                  }
                                />
                                {errors.confirmPassword &&
                                  touched.confirmPassword && (
                                    <div className="input-feedback">
                                      {errors.confirmPassword}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-btn text-center mt-3">
                                <button
                                  className="text-uppercase green_bg color_white"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  Reset Password
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
  );
}

export default ResetPassword;
