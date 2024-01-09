import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Components/Layout.js";
import { useDispatch } from "react-redux";
import { getCoursesById } from "../../redux/actions/admin/courssActions";

const ViewModelForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [empData, setEmpData] = useState({});
  const EmployeeId = location.pathname.split("/")[3];

  useEffect(() => {
    if (EmployeeId) {
      const getProfileById = async () => {
        const data = await dispatch(getCoursesById(EmployeeId));
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
                                <i className="far fa-clock site_color"></i>
                                <span>{empData.duration}</span>
                              </li>
                              <li>
                                <i className="far fa-envelope site_color"></i>
                                <span>{empData.fees}</span>
                              </li>
                              <li>
                                <i className="fas fa-map-marker-alt site_color"></i>
                                <span>
                                  {empData.level}
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
                            {empData.name}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-7">
                          <div className="user_postion text-right site_color">
                            {empData.description}
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
