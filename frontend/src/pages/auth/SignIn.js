import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { login } from './../../redux/actions/authActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Create a separate CSS file for custom styling

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const data = await dispatch(login(values));
      if (data) {
        toast.success('Login Successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Login Failed!');
    }
  };

  return (
    <section className="sign-in-section">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow p-4">
              <h3 className="mb-4 text-center text-uppercase">Login</h3>
              <div className="tab-content">
                <div className="tab-pane container active p-0">
                  <div className="register_form pb-4 pt-2">
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
                          handleSubmit(values);
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
                          <div className="form-group">
                            <label>Email Address <span className="require">*</span></label>
                            <input
                              type="email"
                              name="email"
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Email Address"
                              className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && touched.email && (
                              <div className="invalid-feedback">{errors.email}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Password <span className="require">*</span></label>
                            <input
                              type="password"
                              name="password"
                              value={values.password}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Password"
                              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                            />
                            {errors.password && touched.password && (
                              <div className="invalid-feedback">{errors.password}</div>
                            )}
                          </div>
                          <div className="form-btn text-center mt-4">
                            <button
                              className="btn btn-primary btn-block text-uppercase"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <div className="text-center mt-3">
                      <Link to="/forgot-password">Forgot Password?</Link>
                      <span className="separator"> | </span>
                      <Link to="/registration">Register</Link>
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
