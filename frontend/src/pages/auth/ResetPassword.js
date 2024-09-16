import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { forgotPasswordValidate,resetPassword } from './../../redux/actions/authActions';
import './SignIn.css';

function ResetPassword() {
  
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };
  

  const [validToken, setValidToken] = useState();
  const location = useLocation(); 

  const params =  new URLSearchParams(location.search);
  let token = params.get("token");


  const dispatch = useDispatch();

  useEffect(() => {
    setValidToken(token);
    dispatch(forgotPasswordValidate(token));
    // if (condition) {
      
    // } else {
      
    // }
  }, []);
  
  const handleResetPassword = async (values) => {
    const updateData = {
      token :validToken,
      newPassword :values.password
    }
    try {
      if(updateData) {
        dispatch(resetPassword(updateData));
        toast.success("Reset Password Successfull!");
        navigatePage("/login")
      }
    } catch (error) {
      toast.error("Reset Password failed. Please try again.");
    }
    //  finally {
    //   setSubmitting(false);
    // }
  };
  return (
    <section className="sign-in-section">
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow p-4">
            <h3 className="mb-4 text-center text-uppercase">Reset Password</h3>
            <div className="tab-content">
              <div className="tab-pane container active p-0">
                <div className="register_form pb-4 pt-2">

                    <Formik
                      initialValues={{ password: '', confirmPassword: '' }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.password) {
                          errors.password = 'Password is required';
                        } else if (values.password.length < 6) {
                          errors.password = 'Password must be at least 6 characters long';
                        }
                        if (!values.confirmPassword) {
                          errors.confirmPassword = 'Confirm Password is required';
                        } else if (values.confirmPassword !== values.password) {
                          errors.confirmPassword = 'Passwords do not match';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          handleResetPassword(values)
                          // alert(JSON.stringify(values, null, 2));
                          // setSubmitting(false);
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
                                <label className="d-block">New Password *</label>
                                <input
                                  type="password"
                                  name="password"
                                  value={values.password}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="New Password"
                                  className={errors.password && touched.password ? 'error' : ''}
                                />
                                {errors.password && touched.password && (
                                  <div className="input-feedback">{errors.password}</div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="d-block">Confirm Password *</label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  value={values.confirmPassword}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Confirm Password"
                                  className={
                                    errors.confirmPassword && touched.confirmPassword ? 'error' : ''
                                  }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                  <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-btn text-center mt-3">
                                <button
                                  className="btn btn-primary btn-block text-uppercase"
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
                    <div className="text-center mt-3">
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

export default ResetPassword;
