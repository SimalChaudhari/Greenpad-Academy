import React, { useState, useEffect } from "react";
import Layout from "../../../Components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProfileById } from "../../../redux/actions/employee/employeeActions";
import EditModelForm from "./EditModelForm";
import SubLayout from "./SubLayout";
import { DEF_URL } from "../../../config/config";
import { IMAGE_URL } from "../../../config/config";
import PROFILE from "../../../Common/default-user.png";

const ProfileIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth?.user);
  const useremployeeReducer = useSelector(
    (state) => state.useremployee.list?.data
  );
  const [empData, setEmpData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const EmployeeId = authReducer.id;
  const userempReducer = useSelector((state) => state.useremployee);

  useEffect(() => {
      dispatch(getEmployeeProfileById(EmployeeId));
  }, []);

  useEffect(() => {
    setEmpData(useremployeeReducer);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setSelectedEmployee(useremployeeReducer);
  };

  const handleUpdate = (updatedEmployee) => {
    // dispatch(updateEmployee(updatedEmployee));
    setSelectedEmployee(null);
    setEditMode();
  };

  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              PERSONAL DETAILS
            </div>
            <div className="edit_persobal_detail mb-2 text-right">
              {/* <a
                  onClick={handleEditClick}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i className="fa fa-angle-left"></i> Edit Personal Details
                </a> */}
            </div>
            <div className="tab_profile">
              <div className="t_profile_top white_bg p-3">
                <div className="row">
                  <div className="col-lg-4 col-md-3">
                    <div className="profile_img">
                      <span>
                        {useremployeeReducer?.image === undefined ||
                        useremployeeReducer?.image === "null" ? (
                          <img
                            style={{ height: "100%", width: "100%" }}
                            src={`${DEF_URL}${PROFILE}`}
                            align="miriam-merad-t"
                          />
                        ) : (
                          <img
                            style={{ height: "100%", width: "100%" }}
                            src={`${IMAGE_URL}/${useremployeeReducer?.image}`}
                            align="course-new"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-9">
                    <div className="user_detail">
                      <ul>
                        <li>
                          <i className="far fa-address-card site_color"></i>
                          <span>{useremployeeReducer?.department}</span>
                        </li>
                        <li>
                          <i className="far fa-envelope site_color"></i>
                          <span>{useremployeeReducer?.email}</span>
                        </li>
                        <li>
                          <i className="fas fa-map-marker-alt site_color"></i>
                          <span>
                            {useremployeeReducer?.address},{" "}
                            {useremployeeReducer?.country}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="t_profile_bottom p-3">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-5">
                    <div className="user_name">
                      {useremployeeReducer?.first_name}{" "}
                      {useremployeeReducer?.last_name}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-7">
                    <div className="user_postion text-right site_color">
                      {useremployeeReducer?.job_title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="personal_detail mt-4">
              <div className="row">
                <div className="col-lg-6">
                  <h6 className="mb-3">
                    <b>PROGRAMME CONTACTS</b>
                  </h6>
                  <div className="personal_status grey_bg">
                    <div className="white_bg mb-2 p-3">
                      <label className="d-block">
                        <b>Assigned Tutor</b>
                      </label>
                      <table width="100%">
                        <tr>
                          <td>
                            {useremployeeReducer?.first_name}{" "}
                            {useremployeeReducer?.last_name}
                          </td>
                          <td>(01) 234567008</td>
                          <td>{useremployeeReducer?.email}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="white_bg mb-2 p-3">
                      <label className="d-block">
                        <b>Programme Coordinator</b>
                      </label>
                      <table width="100%">
                        <tr>
                          <td>
                            {useremployeeReducer?.first_name}{" "}
                            {useremployeeReducer?.last_name}
                          </td>
                          <td>(01) 234567008</td>
                          <td>{useremployeeReducer?.email}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="white_bg p-3">
                      <label className="d-block">
                        <b>Programme Director</b>
                      </label>
                      <table width="100%">
                        <tr>
                          <td>
                            {useremployeeReducer?.first_name}{" "}
                            {useremployeeReducer?.last_name}
                          </td>
                          <td>(01) 234567008</td>
                          <td>{useremployeeReducer?.email}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h6 className="mb-3">
                    <b>PROGRAMME CONTACTS</b>
                  </h6>
                  <div className="personal_status grey_bg">
                    <div className="white_bg mb-2 p-3">
                      <table width="100%">
                        <tr>
                          <td className="pt-2 pb-2">
                            <b>Student Status</b>
                          </td>
                          <td className="pt-2 pb-2">Enrolled</td>
                        </tr>
                        <tr>
                          <td className="pt-2 pb-2">
                            <b>Programme Session</b>
                          </td>
                          {/* <td className="pt-2 pb-2">2018 / 2019</td> */}
                          <td className="pt-2 pb-2">Current Year</td>
                        </tr>
                        <tr>
                          <td className="pt-2 pb-2">
                            <b>Training Mode</b>
                          </td>
                          <td className="pt-2 pb-2">Online</td>
                        </tr>
                        <tr>
                          <td className="pt-2 pb-2">
                            <b>Fee Status</b>
                          </td>
                          <td className="pt-2 pb-2">Outstanding</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <EditModelForm
          employeeData={selectedEmployee}
          handleUpdate={handleUpdate}
          handleCloseModal={setEditMode}
        />
      )}
    </SubLayout>
  );
};

export default ProfileIndex;
