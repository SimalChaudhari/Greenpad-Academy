import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { CreateModule } from "../../../redux/actions/admin/modulesActions";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import QuillEditor from "../../../Components/Editor/index";
import QuillEditor from "../../../Components/Editor/Editor";
import { useParams } from "react-router-dom";
// import { } from "../../redux/actions";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const Create = ({ companyData, handleUpdate, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [discriptionValue, setDiscriptionValue] = useState("");
  // const companyReducer = useSelector((state) => state.company);
  const [filter, setFilter] = useState(defaultFilter);
  const [formInputs, setFormInputs] = useState(companyData);
  const { id } = useParams();

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = (values) => {
    handleUpdate(values);
    // dispatch(editCompanyById(values));
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  // Update discriptionValue state when the EditorModel input changes
  const handleEditorModelChange = (html) => {
    setDiscriptionValue(html);
  };

  const createCourse = async (values) => {
    const data = {
      title : values?.title,
      description : discriptionValue
    };
    
    const response  = await dispatch(CreateModule(id, data));
  };

  const [descriptions, setDescriptions] = useState([{ id: 1, content: "" }]);

  const addDescription = () => {
    const newDescription = { id: descriptions.length + 1, content: "" };
    setDescriptions([...descriptions, newDescription]);
  };

  const handleDescriptionChange = (index, content) => {
    const updatedDescriptions = descriptions.map((desc, i) =>
      i === index ? { ...desc, content } : desc
    );
    setDescriptions(updatedDescriptions);
  };

  const removeDescription = (index) => {
    if (index !== 0) {
      const updatedDescriptions = descriptions.filter((_, i) => i !== index);
      setDescriptions(updatedDescriptions);
    }
  };

  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block" }}
      id="myModal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white p-2">Create Modules</h4>
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
                        >
                          <div className="register_form">
                            <Formik
                              enableReinitialize
                              initialValues={{
                                title: "",
                                description: discriptionValue,
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
                                return errors;
                              }}
                              onSubmit={createCourse}
                            >
                              {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                //setFieldValue,
                                isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                  <h4 className="mb-3 mt-3 text-uppercase">
                                    Add Modules
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

                                    {/* CK Editor */}
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label className="d-block">
                                          Description{" "}
                                          <span className="require">*</span>
                                        </label>

                                        {/* <ReactQuill theme="snow" value={value} name="description" onChange={setValue}/> */}
                                        {/* <QuillEditor
                                            name="description"
                                            height="300px"
                                            value={values.description}
                                            onBlur={handleBlur}
                                            onChange={handleEditorModelChange}
                                        // onChange={handleChange}
                                        /> */}

                                        {/* Render QuillEditors for each description */}
                                        {descriptions.map((desc, index) => (
                                          <div key={desc.id}>
                                            <QuillEditor
                                              name={`description_${desc.id}`}
                                              height="300px"
                                              value={(data) => {setDiscriptionValue(data)}}
                                              onChange={(content) =>
                                                handleDescriptionChange(
                                                  index,
                                                  content
                                                )
                                              }
                                            />
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="form_field add_courses mb-1">
                                                  {index !== 0 && (
                                                    <a
                                                      className="color_white btn-danger d-inline-block mr-0 p-2 rounded"
                                                      onClick={() =>
                                                        removeDescription(index)
                                                      }
                                                      style={{
                                                        fontSize: "0.875em",
                                                      }}
                                                    >
                                                      &nbsp;
                                                      <i className="fas fa-solid fa-minus"></i>
                                                      &nbsp;
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="form_field add_courses mb-1 text-right">
                                                  {index ===
                                                    descriptions.length - 1 && (
                                                    <a
                                                      className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                                                      onClick={addDescription}
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      &nbsp;
                                                      <i className="fas fa-solid fa-plus"></i>
                                                      &nbsp;
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                        {errors.description &&
                                          touched.description && (
                                            <div className="input-feedback">
                                              {errors.description}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-12 pt-4">
                                      <div className="form-btn text-center mt-3">
                                        <button
                                          className="text-uppercase green_bg color_white"
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

export default Create;
