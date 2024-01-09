import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../../redux/actions/admin/employeeActions";

const ViewModelForm = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth?.user);
  const [empData, setEmpData] = useState({});
  const EmployeeId = authReducer.id;

  useEffect(() => {
    if (EmployeeId) {
      const getProfileById = async () => {
        const data = await dispatch(getEmployee(EmployeeId));
        const userData = data.data;
        setEmpData(userData);
      };

      getProfileById();
    }
  }, [EmployeeId]);

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                    PERSONAL DETAILS
                  </div>
                  <div className="tab_profile">
                    <div className="t_profile_top white_bg p-3">
                      <div className="row">
                        <div className="col-lg-4 col-md-3">
                          <div className="profile_img">
                            <img src="https://picsum.photos/200/300" />
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-9">
                          <div className="user_detail">
                            <ul>
                              <li>
                                <i className="far fa-address-card site_color"></i>
                                <span>{empData.department}</span>
                              </li>
                              <li>
                                <i className="far fa-envelope site_color"></i>
                                <span>{empData.email}</span>
                              </li>
                              <li>
                                <i className="fas fa-map-marker-alt site_color"></i>
                                <span>
                                  {empData.address}, {empData.country}
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
                            {empData.first_name} {empData.last_name}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-7">
                          <div className="user_postion text-right site_color">
                            {empData.job_title}
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
                            <tbody>
                              <tr>
                                <td>Joe Doe</td>
                                <td>(01) 234567008</td>
                                <td>joedoe@email.com</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="white_bg mb-2 p-3">
                          <label className="d-block">
                            <b>Programme Coordinator</b>
                          </label>
                          <table width="100%">
                            <tbody>
                              <tr>
                                <td>Joe Doe</td>
                                <td>(01) 234567008</td>
                                <td>joedoe@email.com</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="white_bg p-3">
                          <label className="d-block">
                            <b>Programme Director</b>
                          </label>
                          <table width="100%">
                            <tbody>
                              <tr>
                                <td>Joe Doe</td>
                                <td>(01) 234567008</td>
                                <td>joedoe@email.com</td>
                              </tr>
                            </tbody>
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
                            <tbody>
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
                                <td className="pt-2 pb-2">2018 / 2019</td>
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
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ViewModelForm;
