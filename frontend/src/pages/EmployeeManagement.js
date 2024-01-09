import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout.js";
import { useSelector, useDispatch } from "react-redux";
import {
  fileupload,
  getAllEmployees,
} from "../redux/actions/employeeActions.js";

import { Formik } from "formik";
import { editEmployee, deleteEmployee } from "../../src/services/employeeService.js";
import { Link } from "react-router-dom";
import rootReducer from "../redux/reducers/index";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(defaultFilter);
  const [list, setList] = useState([]);
  const employeeReducer = useSelector(({ employee }) => employee);
    const [file, setFile] = useState("");

  const selectFile = (f) => {
    f.preventDefault();
    setFile(f.target.files[0]);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    dispatch(fileupload(formData));

    setFilter(defaultFilter);
    dispatch(getAllEmployees(filter));
  };

  useEffect(() => {
    setFilter(defaultFilter);
    dispatch(getAllEmployees(filter));
    setList(employeeReducer?.list?.data);
  }, []);

  // Edit

  const sessionReducer = useSelector(({ auth }) => auth);

  const [editEmployeeError, seteditEmployeeError] = useState("");

  const handleUpdateEmployee = async (values, { setSubmitting }) => {
    try {
      const data = await editEmployee(values);
      // Handle successful UpdateEmployee
    } catch (error) {
      // Handle UpdateEmployee error
      seteditEmployeeError("UpdateEmployee failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const [editData, setEditData] = useState({});
  const [deletedData, setDeletdData] = useState({});

  function employeeEdit(e) {
    setEditData(e);
  }
  function employeeDelete(e) {
    setDeletdData(e);
  }
  
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteEmployee(deletedData._));
  };

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                {/* <div className="search_course mb-3">
                  <input
                    type="text"
                    name=""
                    placeholder="Search Employee"
                    className="box_shadow"
                  />
                  <i className="fas fa-search"></i>
                </div> */}
                <h3 className="mb-4 p-2 site_bg color_white">EMPLOYEES</h3>
                <div className="forum_table white_bg p-3">
                  <div className="add_couses mb-3" style={{ float: "right" }}>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="color_white green_bg d-inline-block"
                    >
                      Upload Sheet
                    </a>
                  </div>
                  <table className="full_width white_bg">
                    <thead>
                      <tr className="black_bg">
                        <th className="color_white">Name</th>
                        <th className="color_white">Email</th>
                        <th className="color_white">Job Title</th>
                        <th className="color_white">Department</th>
                        <th className="text-center color_white">Address</th>
                        <th className="text-center color_white">Country</th>
                        <th className="text-center color_white">Pin Code</th>
                        <th className="text-center color_white">Active</th>
                        <th className="text-center color_white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="white_bg">
                        <td
                          className="p-0"
                          colSpan="6"
                          style={{ height: "5px" }}
                        ></td>
                      </tr>

                      {list.map((employee) => {
                        return (
                          <tr key={employee?._id}>
                            <td className="">
                              {employee?.first_name} {employee?.last_name}
                            </td>
                            <td className="">{employee?.email}</td>
                            <td className="">{employee?.job_title}</td>
                            <td className="">{employee?.department}</td>
                            <td className="text-center">{employee?.address}</td>
                            <td className="text-center">{employee?.country}</td>
                            <td className="text-center">
                              {employee?.post_code}
                            </td>
                            <td className="text-center">
                              {employee?.is_active ? "Yes" : "No"}
                            </td>
                            <td className="text-center">
                              <i
                                className="fas fa-edit"
                                onClick={() => employeeEdit(employee)}
                                href="#"
                                data-toggle="modal"
                                data-target="#EmployeeEditModal"
                              ></i>
                              <i
                                className="fas fa-trash ml-3"
                                onClick={() => employeeDelete(employee._id)}
                                href="#"
                                data-toggle="modal"
                                data-target="#EmployeeDeleteModal"
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="modal fade fourm_modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header site_bg">
                        <h4 className="modal-title color_white"></h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <form className="p-3 white_bg form_part">
                          <div className="row"></div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <div className="input_fields_wrap">
                                  <label>Attachment</label>
                                  <input
                                    type="file"
                                    name=""
                                    encType="multipart/form-data"
                                    onChange={(f) => selectFile(f)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="green_bg color_white"
                            // onClick={onFileUpload}
                            onClick={(e) => onFileUpload(e)}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade fourm_modal"
                  id="EmployeeDeleteModal"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header site_bg">
                        <h4 className="modal-title color_white">
                          <label className="mt-2">
                            Are you sure want to delete this employee ?
                          </label>
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <form className="p-3 white_bg form_part">
                          <div className="row"></div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <div className="input_fields_wrap">
                                  {/* <label>Attachment</label> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="green_bg color_white"
                            // onClick={onFileUpload}
                            onClick={(e) => onDelete(e)}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal fade fourm_modal" id="EmployeeEditModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header site_bg">
                        <h4 className="modal-title color_white"></h4>
                        <button
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
                              <div className="col-lg-9 col-md-9 mx-auto">
                                <div className="register_eroll">
                                  {/* <h3 className="mb-4 p-2 site_bg color_white text-uppercase">
                              Registration
                            </h3> */}
                                  <div className="enrollment_tab">
                                    <ul className="nav nav-tabs">
                                      <li className="nav-item">
                                        <a
                                          className="nav-link active white_bg"
                                          data-toggle="tab"
                                          href="#business"
                                        >
                                          Update Employee
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="tab-content">
                                    <div
                                      className="tab-pane active container p-0"
                                      id="business"
                                    >
                                      <div className="register_form">
                                        <Formik
                                          initialValues={{
                                            // isAddMode ? 'Add User' : 'Edit User'
                                            email: editData.email
                                              ? editData.email
                                              : "",
                                            profession: editData.profession
                                              ? editData.profession
                                              : "",
                                            first_name: editData.first_name
                                              ? editData.first_name
                                              : "",
                                            last_name: editData.last_name
                                              ? editData.last_name
                                              : "",
                                            address: editData.address
                                              ? editData.address
                                              : "",
                                            post_code: editData.post_code
                                              ? editData.post_code
                                              : "",
                                          }}
                                          validate={(values) => {
                                            const errors = {};

                                            if (!values.email) {
                                              errors.email =
                                                "Email is required";
                                            } else if (
                                              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                values.email
                                              )
                                            ) {
                                              errors.email =
                                                "Invalid email address";
                                            }

                                            if (!values.profession) {
                                              errors.profession =
                                                "Profession is required";
                                            } else if (
                                              values.profession.length < 3
                                            ) {
                                              errors.profession =
                                                "profession must be at least 3 characters long";
                                            }

                                            if (!values.first_name) {
                                              errors.first_name =
                                                "First name is required";
                                            }
                                            if (!values.last_name) {
                                              errors.last_name =
                                                "Last name is required";
                                            }

                                            if (!values.address) {
                                              errors.address =
                                                "Address is required";
                                            }

                                            if (!values.post_code) {
                                              errors.post_code =
                                                "Post code is required";
                                            }

                                            return errors;
                                          }}
                                          onSubmit={handleUpdateEmployee}
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
                                            <form
                                              onSubmit={handleSubmit}
                                              className="p-2"
                                            >
                                              <h4 className="mb-3 pt-2 pb-2 text-uppercase">
                                                Employee details
                                              </h4>
                                              <div className="row">
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      First Name *
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name="first_name"
                                                      value={values.first_name}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="First Name"
                                                      className={
                                                        errors.first_name &&
                                                        touched.first_name
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.first_name &&
                                                      touched.first_name && (
                                                        <div className="input-feedback">
                                                          {errors.first_name}
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Last Name *
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name="last_name"
                                                      value={values.last_name}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="Last Name"
                                                      className={
                                                        errors.last_name &&
                                                        touched.last_name
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.last_name &&
                                                      touched.last_name && (
                                                        <div className="input-feedback">
                                                          {errors.last_name}
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Email Address *
                                                    </label>
                                                    <input
                                                      type="email"
                                                      name="email"
                                                      value={values.email}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="Email Address"
                                                      className={
                                                        errors.email &&
                                                        touched.email
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.email &&
                                                      touched.email && (
                                                        <div className="input-feedback">
                                                          {errors.email}
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Profession *
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name="profession"
                                                      value={values.profession}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="Profession"
                                                      className={
                                                        errors.profession &&
                                                        touched.profession
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.profession &&
                                                      touched.profession && (
                                                        <div className="input-feedback">
                                                          {errors.profession}
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-lg-12">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Address *
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name="address"
                                                      value={values.address}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="Home Address"
                                                      className={
                                                        errors.address &&
                                                        touched.address
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.address &&
                                                      touched.address && (
                                                        <div className="input-feedback">
                                                          {errors.address}
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Country
                                                    </label>
                                                    <select>
                                                      <option>Country</option>
                                                      <option>USA</option>
                                                      <option>India</option>
                                                    </select>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="form-group">
                                                    <label className="d-block">
                                                      Post Code *
                                                    </label>
                                                    <input
                                                      type="number"
                                                      name="post_code"
                                                      value={values.post_code}
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder="Post Code"
                                                      className={
                                                        errors.post_code &&
                                                        touched.post_code
                                                          ? "error"
                                                          : ""
                                                      }
                                                    />
                                                    {errors.post_code &&
                                                      touched.post_code && (
                                                        <div className="input-feedback">
                                                          {errors.post_code}
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
                                                      Update
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </form>
                                          )}
                                        </Formik>
                                        {editEmployeeError && (
                                          <div className="error-message">
                                            {editEmployeeError}
                                          </div>
                                        )}
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
                {/* <div className="view_post p-3 mb-3 white_bg">
                  <div className="course_form mt-4">
                    <form className="p-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="d-block mb-2">Course</label>
                            <select className="full_width">
                              <option>Energy</option>
                              <option>Waste</option>
                              <option>Water</option>
                              <option>Travel</option>
                              <option>Resource Use</option>
                              <option>Biodiversity</option>
                              <option>Employee Engagement</option>
                              <option>Working Conditions</option>
                              <option>Community and Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Title</label>
                            <input
                              className="full_width"
                              type="text"
                              name=""
                              placeholder="Enter the title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Message</label>
                            <textarea className="full_width"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Attatchment</label>
                            <input
                              className="full_width"
                              type="file"
                              name=""
                              placeholder="Choose file"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-btn mb-3">
                            <button type="button" className="color_white green_bg">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployeeManagement;
