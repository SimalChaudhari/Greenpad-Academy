import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassword } from './../../redux/actions/authActions';

function ForgotPassword() {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      // Dispatch the forgotPassword action with the form values
      await dispatch(forgotPassword(values));
    } catch (error) {
      // Handle forgotPassword error
    }
  }

  return (
    <section className="register_page">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-9 mx-auto">
            <div className="register_eroll">
              <h3 className="mb-4 p-2 site_bg color_white text-uppercase">Forgot Password</h3>
              <div className="tab-content">
                <div className="tab-pane container active p-0">
                  <div className="register_form pl-5 pr-5 pb-4 pt-2">
                    <Formik
                      initialValues={{ email: '' }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = 'Email is required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                          errors.email = 'Invalid email address';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                        // setSubmitting(false);
                      }}
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
                                <label className="d-block">Email Address <span className="require" >*</span></label>
                                <input
                                  type="email"
                                  name="email"
                                  value={values.email}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Email Address"
                                  className={errors.email && touched.email ? 'error' : ''}
                                />
                                {errors.email && touched.email && (
                                  <div className="input-feedback">{errors.email}</div>
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
                    <div className="additional-links">
                      <Link to="/login">Login</Link>
                      <span className="separator"> | </span>
                      <Link to="/registration">Registration</Link>
                    </div>
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

export default ForgotPassword;
