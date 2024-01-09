import React, { useEffect } from "react";
import Layout from "../../../Components/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllEmployeeCourses } from "../../../redux/actions/employee/courssActions";
import { useDispatch, useSelector } from "react-redux";

const SubLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigatePage = (path) => {
    navigate(path);
  };
  const { pathname } = useLocation();

  const coursesLoder = useSelector((state) => state.employeeCourses);

  useEffect(() => {
    if (coursesLoder.list === null) {
      dispatch(getAllEmployeeCourses());
    }
  }, [coursesLoder.list]);

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
                      className={
                        pathname === "/my-academy"
                          ? `nav-link active white_bg`
                          : `nav-link white_bg`
                      }
                      onClick={() => {
                        navigatePage("/my-academy");
                      }}>
                      <i className="fas fa-pencil-alt"></i>My Courses
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className={
                        pathname === "/saved-notes"
                          ? `nav-link active white_bg`
                          : `nav-link white_bg`
                      }
                      onClick={() => {
                        navigatePage("/saved-notes");
                      }}>
                      <i className="fas fa-book"></i>Saved Notes
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      className={
                        pathname === "/my-profile"
                          ? `nav-link active white_bg`
                          : `nav-link white_bg`
                      }
                      onClick={() => {
                        navigatePage("/my-profile");
                      }}>
                      <i className="far fa-user"></i>My Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubLayout;
