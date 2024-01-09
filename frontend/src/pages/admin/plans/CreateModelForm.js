import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { createPlans } from "../../../redux/actions/Plans/plansActions";

const CreateModelForm = ({ companyData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  // const companyReducer = useSelector((state) => state.company);
  const [formInputs, setFormInputs] = useState(companyData);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  useEffect(() => {
    // dispatch(getAllCompanies(filter));
  }, []);

  const handleFormSubmit = (values) => {
    handleUpdate(values);
    // dispatch(editCompanyById(values));
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const createCourse = async (values) => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("title", values.title);

    dispatch(createPlans(formData));
    handleCloseModal(); // Close the modal
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
      id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Create Plan</h4>
            <button
              onClick={handleCancel}
              type="button"
              className="close"
              data-dismiss="modal">
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
                          id="business">
                          <div className="register_form">
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
                                  errors.title =
                                    "Title must be at least 3 characters long";
                                } else if (values.title.length > 10) {
                                  errors.title =
                                    "Title less at least 10 characters long";
                                }

                                if (!values.file) {
                                  errors.file = "File is required";
                                }

                                return errors;
                              }}
                              onSubmit={createCourse}>
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
                                  <h4 className="mb-3 mt-3 text-uppercase">
                                    Add plan
                                  </h4>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Title{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="title"
                                          value={values.title}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          placeholder="Title"
                                          className={
                                            errors.title && touched.title
                                              ? "error"
                                              : ""
                                          }
                                        />
                                        {errors.title && touched.title && (
                                          <div className="input-feedback">
                                            {errors.title}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          File{" "}
                                          <span className="require">*</span>
                                        </label>
                                        <input
                                          type="file"
                                          name="file"
                                          accept="application/pdf" // Accept only PDF files
                                          onChange={(event) => {
                                            const file =
                                              event.currentTarget.files[0];
                                            setFieldValue("file", file);
                                          }}
                                          onBlur={handleBlur}
                                          className={
                                            errors.file && touched.file
                                              ? "error"
                                              : ""
                                          }
                                        />
                                      </div>
                                    </div>
                                    {errors.file && touched.file && (
                                      <div className="input-feedback">
                                        {errors.file}
                                      </div>
                                    )}

                                    <div className="col-lg-12">
                                      <div className="form-btn text-center mt-3">
                                        <button
                                          className="text-uppercase green_bg color_white"
                                          type="submit"
                                          disabled={isSubmitting}>
                                          Submit
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

export default CreateModelForm;
