import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from 'formik';
import { getAllCourses, editCoursesById} from "../../redux/actions/admin/courssActions";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};
const EditModelForm = ({ courseData, handleUpdate, handleCloseModal  }) => {
  const role = useSelector(state => state.auth.user?.role);
  const dispatch = useDispatch();
  const courseReducer = useSelector((state) => state.course);
  const [filter, setFilter] = useState(defaultFilter);
  const [formInputs, setFormInputs] = useState(courseData);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    dispatch(getAllCourses(filter));
  }, []);

  const handleFormSubmit = (values) => {
    handleUpdate(values);
    dispatch(editCoursesById(values));
  };

  
  const handleCancel = () => {
    handleCloseModal();
  };
  
  return (
    <div className="modal fade fourm_modal show" style={{paddingRight: '17px',display: 'block'}} id='myModal'>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Update course</h4>
            <button  onClick={handleCancel} type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <section className="">
              <div className="">
                <div className="row m-2">
                  <div className="col-lg-12 col-md-12 mx-auto">
                    <div className="register_eroll">
                      <div className="enrollment_tab">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane active container p-0"
                          id="business"Name
                        >
                          <div className="register_form">
                            <Formik
                              initialValues={formInputs}
                              validate={(values) => {
                                const errors = {};

                                if (!values.name) {
                                  errors.name = 'Name is required';
                                } else if (values.name.length < 3) {
                                  errors.name =
                                    'Name must be at least 3 characters long';
                                } else if (values.name.length > 10) {
                                  errors.name =
                                    'Name less at least 10 characters long';
                                }

                                if (!values.description) {
                                  errors.description = 'Description is required';
                                } else if (values.description.length < 3) {
                                  errors.description =
                                    "Description must be at least 3 characters long";
                                } else if (values.description.length > 30) {
                                  errors.description =
                                    'Description less at least 30 characters long';
                                }

                                if (!values.level) {
                                  errors.level = 'Level code is required';
                                } else if (values.level.length < 3) {
                                  errors.level =
                                    'Level must be at least 3 characters long';
                                } else if (values.level.length > 10) {
                                  errors.level =
                                    'Level less at least 10 characters long';
                                }

                                if (!values.fees) {
                                  errors.fees = 'Fees is required';
                                } else if (values.fees.length < 1) {
                                  errors.fees =
                                    'Fees must be at least 1 characters long';
                                } else if (values.fees.length > 6) {
                                  errors.fees =
                                    'Fees less at least 6 characters long';
                                }

                                if (!values.duration) {
                                  errors.duration = 'Duration is required';
                                } else if (values.duration.length < 3) {
                                  errors.duration =
                                    'Duration must be at least 3 characters long';
                                } else if (values.duration.length > 20) {
                                  errors.duration =
                                    'Duration less at least 20 characters long';
                                }

                                return errors;
                              }}
                              onSubmit={handleFormSubmit}
                            >
                              {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="p-2">
                                  <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                                    course details
                                  </h4>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Name <span className="require" >*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="name"
                                          placeholder="Name"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="name"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Level <span className="require" >*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="level"
                                          placeholder="Level"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="level"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Description <span className="require" >*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="description"
                                          placeholder="Home Description"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="description"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Fees <span className="require" >*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="fees"
                                          placeholder="Fees"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="fees"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Duration <span className="require" >*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="duration"
                                          placeholder="Duration"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="duration"
                                          component="div"
                                          className="input-feedback"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-btn text-center mt-3">
                                        <button
                                          className="text-uppercase green_bg color_white"
                                          type="submit"
                                          disabled={isSubmitting}
                                        >
                                          Update
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModelForm;
