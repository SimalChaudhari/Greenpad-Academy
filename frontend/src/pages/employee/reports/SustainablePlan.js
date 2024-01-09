import React from "react";
import Layout from "../../../Components/Layout";
import { useNavigate } from "react-router-dom";

const SustainablePlan = () => {
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="main_tabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg"
                      onClick={() => {
                        navigatePage("/my-academy");
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>My Courses
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg"
                      onClick={() => {
                        navigatePage("/reading");
                      }}
                    >
                      <i className="fas fa-book-open"></i>Reading List
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg"
                      onClick={() => {
                        navigatePage("/saved-notes");
                      }}
                    >
                      <i className="fas fa-book"></i>Saved Notes
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link active white_bg"
                      onClick={() => {
                        navigatePage("/sustainable-plan");
                      }}
                    >
                      <i className="far fa-plus-square"></i>Sustainable
                      Development Plan
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg"
                      onClick={() => {
                        navigatePage("/my-profile");
                      }}
                    >
                      <i className="far fa-user"></i>My Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                    SUSTAINABLE DEVELOPMENT PLAN
                  </div>
                  <div className="sustainable_plan mb-3">
                    <h6>
                      C001 - Organisational Sustainability, Management and
                      Leadership Programme
                    </h6>
                    <div className="sustainable white_bg p-3 mb-2">
                      <table width="100%">
                        <tr>
                          <td>
                            <select>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                            </select>
                          </td>
                          <td className="text-center">
                            Word Count
                            <br />
                            <span>3,500</span>
                          </td>
                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25 / 02</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="sustainable white_bg p-3">
                      <table width="100%">
                        <tr>
                          <td>
                            <select>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                            </select>
                          </td>
                          <td className="text-center">
                            Word Count
                            <br />
                            <span>3,500</span>
                          </td>
                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25 / 02</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="sustainable_plan mb-3">
                    <h6>
                      C003 - Engineering Sustainability and Management Programme
                    </h6>
                    <div className="sustainable white_bg p-3">
                      <p>
                        <i>
                          There aren’t any assigned assessments for this course
                          yet
                        </i>
                      </p>
                    </div>
                  </div>
                  <div className="sustainable_plan">
                    <h6>Final Sustainable Development Plan</h6>
                    <div className="sustainable white_bg p-3 mb-2">
                      <table width="100%">
                        <tr>
                          <td>
                            <select>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                            </select>
                          </td>
                          <td className="text-center">
                            Word Count
                            <br />
                            <span>3,500</span>
                          </td>
                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25 / 02</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div className="tab-pane container fade" id="my_profile">
                    <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                      PERSONAL DETAILS
                    </div>
                    <div className="tab_profile">
                      <div className="t_profile_top white_bg p-3">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="profile_img">
                              <img src="images/miriam-merad-t.png" />
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="user_detail">
                              <ul>
                                <li>
                                  <i className="far fa-address-card site_color"></i>
                                  <span>Cleanergy</span>
                                </li>
                                <li>
                                  <i className="far fa-envelope site_color"></i>
                                  <span>janedoe@email.com</span>
                                </li>
                                <li>
                                  <i className="fas fa-map-marker-alt site_color"></i>
                                  <span>Edinburgh, UK</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="t_profile_bottom p-3">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="user_name">Jane Deo</div>
                          </div>
                          <div className="col-lg-6">
                            <div className="user_postion text-right site_color">
                              Technology Consultant
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
                                  <td>Joe Doe</td>
                                  <td>(01) 234567008</td>
                                  <td>joedoe@email.com</td>
                                </tr>
                              </table>
                            </div>
                            <div className="white_bg mb-2 p-3">
                              <label className="d-block">
                                <b>Programme Coordinator</b>
                              </label>
                              <table width="100%">
                                <tr>
                                  <td>Joe Doe</td>
                                  <td>(01) 234567008</td>
                                  <td>joedoe@email.com</td>
                                </tr>
                              </table>
                            </div>
                            <div className="white_bg p-3">
                              <label className="d-block">
                                <b>Programme Director</b>
                              </label>
                              <table width="100%">
                                <tr>
                                  <td>Joe Doe</td>
                                  <td>(01) 234567008</td>
                                  <td>joedoe@email.com</td>
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
                                  <td className="pt-2 pb-2">2018 / 2019</td>
                                </tr>
                                <tr>
                                  <td className="pt-2 pb-2">
                                    <b>Training mode</b>
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SustainablePlan;
