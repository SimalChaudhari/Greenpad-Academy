import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import {login} from './../../redux/actions/authActions';
import { toast } from 'react-toastify';
// import rootReducer from '../../redux/reducers/index'
import { useNavigate } from "react-router-dom";

function SignIn() {
  
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };
  
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      // Dispatch the login action with the form values
      const data = await dispatch(login(values));
      if(data) {
        toast.success("Login Successfull!");
        navigatePage("/")
      }
    } catch (error) {
      toast.error("Login Failed!");
    }
  };

  return (
    <section className="register_page">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-9 mx-auto">
            <div className="register_eroll">
              <h3 className="mb-4 p-2 site_bg color_white text-uppercase">Login</h3>
              <div className="tab-content">
                <div className="tab-pane container active p-0">
                  <div className="register_form pl-5 pr-5 pb-4 pt-2">
                    <Formik
                      initialValues={{ email: '', password: '' }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = 'Email is required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                          errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                          errors.password = 'Password is required';
                        } else if (values.password.length < 3) {
                          errors.password = 'Password must be at least 3 characters long';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          handleSubmit(values)
                          setSubmitting(false);
                        }, 400);
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
                              <div className="form-group">
                                <label className="d-block">Password <span className="require" >*</span></label>
                                <input
                                  type="password"
                                  name="password"
                                  value={values.password}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Password"
                                  className={errors.password && touched.password ? 'error' : ''}
                                />
                                {errors.password && touched.password && (
                                  <div className="input-feedback">{errors.password}</div>
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
                                  Sign In
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <div className="additional-links">
                      <Link to="/forgot-password">Forgot Password</Link>
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

export default SignIn;
