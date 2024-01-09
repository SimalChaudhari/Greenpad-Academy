import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import { editPlansById } from "../../../redux/actions/Plans/plansActions";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};
const EditModelForm = ({ plansData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState(plansData);  


  const handleFormSubmit = async (values) => {
    try {
        await handleUpdate(values);
        await dispatch(editPlansById(values._id, values));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  
  
  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
      id="myModal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Update Plans</h4>
            <button
              onClick={handleCancel}
              type="button"
              className="close"
              data-dismiss="modal"
            >
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
                          <li className="nav-item"></li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane active container p-0"
                          id="business"
                          Name
                        >
                          <div className="register_form">
                            <Formik
                              // initialValues={formInputs}
                              initialValues={{
                                ...formInputs
                              }}
                              validate={(values) => {
                                const errors = {};

                                if (!values.title) {
                                  errors.title = "Title is required";
                                } else if (values.title.length < 3) {
                                  errors.title =
                                    "Title must be at least 3 characters long";
                                } else if (values.title.length > 100) {
                                  errors.title =
                                    "Title less at least 100 characters long";
                                }

                                return errors;
                              }}
                              onSubmit={handleFormSubmit}
                            >
                              {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="p-2">
                                  <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                                    plan details
                                  </h4>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Title{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="title"
                                          placeholder="Title"
                                          className="form-control"
                                        />
                                        <ErrorMessage
                                          name="title"
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
