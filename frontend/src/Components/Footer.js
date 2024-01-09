import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../config/roles";
import { useSelector, useDispatch } from "react-redux";
import { getEmpSetting } from "../redux/actions/Setting/settingActions";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigatePage = (path) => {
    navigate(path);
  };
  const role = useSelector((state) => state?.auth?.user?.role);
  const settingReducer = useSelector((state) => state?.setting || []);
  const footerData = settingReducer?.list?.data || [];
  const loading = settingReducer.loading;

  useEffect(() => {
    if (footerData.length === 0) {
      dispatch(getEmpSetting());
    }
  }, []);

  return (
    <footer>
      {role === ROLES.ADMIN ? (
        <>
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <img src="/assets/images/footer-logo.png" alt="logo" />
                    <p className="mt-3">
                      Providing internationally recognised accredited management
                      and leadership training in sustainability.
                    </p>
                    <ul className="mt-3 social_icon">
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <h4>Featured Links</h4>

                    <ul className="mt-3 links">
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/employees");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Employees
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/companies");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Companies
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/courses");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Courses
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="footer_collume">
                    <h4>CONTACT</h4>

                    {loading ? (
                      <div className="text-center">
                        <Hourglass
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#306cce", "#72a1ed"]}
                        />
                      </div>
                    ) : (
                      <>
                        <ul className="mt-3 contact">
                          <li>
                            <i className="far fa-paper-plane"></i>
                            {footerData.length > 0 && footerData[0]?.address}
                          </li>
                          <li>
                            <a href="mailto:info@greenpadacademy.com">
                              <i className="fas fa-envelope"></i>
                              {footerData.length > 0 && footerData[0]?.email}
                            </a>
                          </li>
                          <li>
                            <a href="tel:985569854">
                              <i className="fas fa-phone"></i>
                              {footerData.length > 0 && footerData[0]?.mobile_number}
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : role === ROLES.COMPANY ? (
        <>
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <img src="/assets/images/footer-logo.png" alt="logo" />
                    <p className="mt-3">
                      Providing internationally recognised accredited management
                      and leadership training in sustainability.
                    </p>
                    <ul className="mt-3 social_icon">
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <h4>Featured Links</h4>

                    <ul className="mt-3 links">
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/employees");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Employees
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/courses");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Courses
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="footer_collume">
                    <h4>CONTACT</h4>
                    {loading ? (
                      <div className="text-center">
                        <Hourglass
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#306cce", "#72a1ed"]}
                        />
                      </div>
                    ) : (
                      <>
                        <ul className="mt-3 contact">
                          <li>
                            <i className="far fa-paper-plane"></i>
                            {footerData.length > 0 && footerData[0]?.address}
                          </li>
                          <li>
                            <a href="mailto:info@greenpadacademy.com">
                              <i className="fas fa-envelope"></i>
                              {footerData.length > 0 && footerData[0]?.email}
                            </a>
                          </li>
                          <li>
                            <a href="tel:985569854">
                              <i className="fas fa-phone"></i>
                              {footerData.length > 0 && footerData[0]?.mobile_number}
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : role === ROLES.EMPLOYEE ? (
        <>
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <img src="/assets/images/footer-logo.png" alt="logo" />
                    <p className="mt-3">
                      Providing internationally recognised accredited management
                      and leadership training in sustainability.
                    </p>
                    <ul className="mt-3 social_icon">
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li className="d-inline-block mr-2">
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer_collume">
                    <h4>Featured Links</h4>

                    <ul className="mt-3 links">
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/my-academy");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>My Academy
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/employee/reports");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Reports
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          onClick={() => {
                            navigatePage("/employee/guidance-support");
                          }}
                        >
                          <i className="fas fa-angle-right"></i>Guidance &
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="footer_collume">
                    <h4>CONTACT</h4>
                    {loading ? (
                      <div className="text-center">
                        <Hourglass
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#306cce", "#72a1ed"]}
                        />
                      </div>
                    ) : (
                      <>
                        <ul className="mt-3 contact">
                          <li>
                            <i className="far fa-paper-plane"></i>
                            {footerData.length > 0 && footerData[0]?.address}
                          </li>
                          <li>
                            <a href="mailto:info@greenpadacademy.com">
                              <i className="fas fa-envelope"></i>
                              {footerData.length > 0 && footerData[0]?.email}
                            </a>
                          </li>
                          <li>
                            <a href="tel:985569854">
                              <i className="fas fa-phone"></i>
                              {footerData.length > 0 && footerData[0]?.mobile_number}
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="footer_bottom">
        <p>© Copyright Academy 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
