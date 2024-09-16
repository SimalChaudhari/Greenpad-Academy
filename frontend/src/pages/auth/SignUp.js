import React, { useState } from 'react';
import { Formik } from 'formik';
import { register } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROLES } from '../../config/roles';

function SignUp() {
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (values, { setSubmitting }) => {
    try {
      const data = await register(values);
      if (data) {
        toast.success("Registration Successfull!");
        navigate("/login")
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      // Handle registration error
      setRegistrationError('Registration failed. Please try again.');
      // console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="sign-in-section">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow p-4">
              <h3 className="mb-4 text-center text-uppercase">Company Registration
              </h3>
              <div className="tab-content">
                <div className="tab-pane container active p-0">
                  <div className="register_form pb-4 pt-2">
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                        company_name: '',
                        address: '',
                        post_code: '',
                        country: '', // Add the country field
                        role: ROLES.COMPANY,
                      }}
                      validate={values => {
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

                        if (!values.company_name) {
                          errors.company_name = 'Business name is required';
                        }

                        if (!values.address) {
                          errors.address = 'Address is required';
                        }

                        if (!values.post_code) {
                          errors.post_code = 'Post code is required';
                        }

                        if (!values.country) {
                          errors.country = 'Country is required';
                        }

                        return errors;
                      }}
                      onSubmit={handleRegistration}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">Business Name <span className="require" >*</span></label>
                                <input
                                  type="text"
                                  name="company_name"
                                  value={values.company_name}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Business Name"
                                  className={errors.company_name && touched.company_name ? 'error' : ''}
                                />
                                {errors.company_name && touched.company_name && <div className="input-feedback">{errors.company_name}</div>}
                              </div>
                            </div>
                            <div className="col-lg-6">
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
                                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
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
                              <div className="form-group">
                                <label className="d-block">Address <span className="require" >*</span></label>
                                <input
                                  type="text"
                                  name="address"
                                  value={values.address}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Home Address"
                                  className={errors.address && touched.address ? 'error' : ''}
                                />
                                {errors.address && touched.address && (
                                  <div className="input-feedback">{errors.address}</div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">Country</label>
                                <select
                                  name="country"
                                  value={values.country}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={errors.country && touched.country ? 'error' : ''}
                                >
                                  <option value="">Select Country</option>
                                  <option value="USA">USA</option>
                                  <option value="India">India</option>
                                  {/* Add more country options as needed */}
                                </select>
                                {errors.country && touched.country && <div className="input-feedback">{errors.country}</div>}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="d-block">Post Code <span className="require" >*</span></label>
                                <input
                                  type="number"
                                  name="post_code"
                                  value={values.post_code}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Post Code"
                                  className={errors.post_code && touched.post_code ? 'error' : ''}
                                />
                                {errors.post_code && touched.post_code && (
                                  <div className="input-feedback">{errors.post_code}</div>
                                )}
                              </div>
                            </div>
                          
                            <div className="col-lg-12">
                              <div className="form-btn text-center mt-4">
                                <button
                                  className="btn btn-primary btn-block text-uppercase"
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
                    <div className="text-center mt-3">
                      <Link to="/login">Login</Link>
                    </div>
                    {registrationError && <div className="error-message">{registrationError}</div>}
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

export default SignUp;
