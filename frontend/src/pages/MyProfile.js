import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../redux/actions/profileActions";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authReducer = useSelector(({ auth }) => auth);
  const profileReducer = useSelector(({ profile }) => profile.profile);
  const [profile, setProfile] = useState({});

  const navigatePage = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const { user } = authReducer
    dispatch(getProfile(user?.id));
    setProfile(profileReducer?.data);
  }, []);

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
                      className="nav-link white_bg"
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
                      className="nav-link active white_bg"
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
                    PERSONAL DETAILS
                  </div>
                  <div className="edit_persobal_detail mb-2 text-right">
                    <a href="#">Edit Personal Details</a>
                  </div>
                  <div className="tab_profile">
                    <div className="t_profile_top white_bg p-3">
                      <div className="row">
                        <div className="col-lg-4 col-md-3">
                          <div className="profile_img">
                            <img src="assets/images/miriam-merad-t.png" />
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-9">
                          <div className="user_detail">
                            <ul>
                              <li>
                                <i className="far fa-address-card site_color"></i>
                                <span>{profile?.department}</span>
                              </li>
                              <li>
                                <i className="far fa-envelope site_color"></i>
                                <span>{profile?.email}</span>
                              </li>
                              <li>
                                <i className="fas fa-map-marker-alt site_color"></i>
                                <span>{profile?.address}, {profile?.country}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="t_profile_bottom p-3">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-5">
                          <div className="user_name">{profile?.first_name} {profile?.last_name}</div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-7">
                          <div className="user_postion text-right site_color">
                            {profile?.job_title}
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyProfile;
