import React from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  const navigatePage = (path: any) => {
    navigate(path);
  };

  return (
    <Layout>
      <section className="course_page grey_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="main_tabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg"
                      onClick={() => {
                        navigatePage("/organisational-sustainability");
                      }}
                    >
                      Organisational Sustainability, Management and Leadership
                      Programme
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className="nav-link white_bg active"
                      onClick={() => {
                        navigatePage("/youth-sustainability");
                      }}
                    >
                      Youth Sustainability, Innovation and Leadership Programme
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a className="nav-link white_bg" href="engineering.html">
                      Engineering Sustainability and Management Programme
                    </a>
                  </li>
                </ul>
                <div className="invite mt-5">
                  <div className="invite_box box_shadow">
                    <label className="d-block mb-2 p-3 white_bg">
                      <b>Invite Friends and Colleagues</b>
                    </label>
                    <p className="p-3 white_bg mb-2">
                      If you know anyone that would benefit from the programmes
                      at GreenPad Academy invite them to join the course.
                    </p>
                    <a
                      href="#"
                      className="d-block site_bg color_white p-3 text-center"
                    >
                      Send invite for this course
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="course_right">
                <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                  Youth Sustainability, Innovation and Leadership Programme
                </div>
                <div className="programes_tabs">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active white_bg "
                        data-toggle="tab"
                        href="#Programme_Description"
                      >
                        Programme Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link white_bg"
                        data-toggle="tab"
                        href="#Programme_Structure"
                      >
                        Programme Structure
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link white_bg"
                        data-toggle="tab"
                        href="#Learning_Method"
                      >
                        Learning Method
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link white_bg"
                        data-toggle="tab"
                        href="#Programme_Goals"
                      >
                        Programme Goals
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link white_bg"
                        data-toggle="tab"
                        href="#Learning_Outcomes"
                      >
                        Learning Outcomes
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="youth_design">
                  <div className="tab-content">
                    <div
                      className="tab-pane container active p-0"
                      id="Programme_Description"
                    >
                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow">
                        <h5 className="text-center mb-3 text-uppercase">
                          Programme Description
                        </h5>
                        <p>
                          The
                          <b>
                            {" "}
                            Youth Sustainability, Innovation and Leadership
                            Programme
                          </b>{" "}
                          is divided in 6 modules that will comprise the
                          following:
                        </p>
                      </div>
                    </div>
                    <div
                      className="tab-pane container p-0"
                      id="Programme_Structure"
                    >
                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow">
                        <h5 className="text-center mb-3 text-uppercase">
                          PROGRAMME STRUCTURE
                        </h5>
                        <p className="mb-4">
                          The
                          <b>
                            {" "}
                            Youth Sustainability, Innovation and Leadership
                            Programme
                          </b>{" "}
                          is divided in 6 modules that will comprise the
                          following:
                        </p>
                        <ul>
                          <li className="d-inline-block pb-5">
                            <label className="green_bg color_white pt-3 pb-3">
                              Global Sustainability
                            </label>
                            <i className="fas fa-long-arrow-alt-right"></i>
                          </li>
                          <li className="d-inline-block pb-5">
                            <label className="green_bg color_white pt-3 pb-3">
                              Innovation and
                              <br /> Sustainability
                            </label>
                            <i className="fas fa-long-arrow-alt-right"></i>
                          </li>
                          <li className="d-inline-block pb-5">
                            <label className="green_bg color_white pt-3 pb-3">
                              Entrepreneurship &<br /> Sustainability
                            </label>
                            <i className="fas fa-long-arrow-alt-down"></i>
                          </li>
                          <li className="d-inline-block">
                            <label className="green_bg color_white pt-3 pb-3">
                              Impacts Creation &<br /> Sustainability
                            </label>
                            <i className="fas fa-long-arrow-alt-left"></i>
                          </li>
                          <li className="d-inline-block">
                            <label className="green_bg color_white pt-3 pb-3">
                              Sustainability Innovation & Management
                            </label>
                            <i className="fas fa-long-arrow-alt-left"></i>
                          </li>
                          <li className="d-inline-block">
                            <label className="green_bg color_white pt-3 pb-3">
                              Sustainability Innovation & Leadership
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="tab-pane container p-0"
                      id="Learning_Method"
                    >
                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow">
                        <h5 className="text-center mb-3 text-uppercase">
                          Learning Method
                        </h5>
                        <p>
                          The
                          <b>
                            {" "}
                            Youth Sustainability, Innovation and Leadership
                            Programme
                          </b>{" "}
                          is divided in 6 modules that will comprise the
                          following:
                        </p>
                      </div>
                    </div>
                    <div
                      className="tab-pane container p-0"
                      id="Programme_Goals"
                    >
                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow">
                        <h5 className="text-center mb-3 text-uppercase">
                          Programme Goals
                        </h5>
                        <p className="mb-4">
                          At GreenPad Academy our students are our first
                          priority.
                        </p>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1 mb-3">
                              <img
                                src="assets/images/Promoting.png"
                                alt="Promoting"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1 mb-3">
                              <img
                                src="assets/images/Teaching.png"
                                alt="Teaching"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1 mb-3">
                              <img
                                src="assets/images/Empowering.png"
                                alt="Empowering"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1">
                              <img
                                src="assets/images/Empowering-young.png"
                                alt="Empowering-young"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1">
                              <img
                                src="assets/images/Teaching-young-individuals.png"
                                alt="Teaching-young-individuals"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="goals_box text-center pt-3 pb-3 pl-1 pr-1">
                              <img
                                src="assets/images/Providing.png"
                                alt="Providing"
                              />
                              <p>
                                Promoting sustainable development to young
                                individuals
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane container p-0"
                      id="Learning_Outcomes"
                    >
                      <div className="programe_inner pl-5 pr-5 pb-5 pt-4 white_bg box-shadow">
                        <h5 className="text-center mb-3 text-uppercase">
                          Learning Outcomes
                        </h5>
                        <p>
                          The
                          <b>
                            {" "}
                            Youth Sustainability, Innovation and Leadership
                            Programme
                          </b>{" "}
                          is divided in 6 modules that will comprise the
                          following:
                        </p>
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

export default Reports;
