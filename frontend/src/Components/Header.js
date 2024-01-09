import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../redux/actions/authActions";
import { ROLES } from "../config/roles";
import { DEF_URL } from "../config/config";
import PROFILE from "../Common/default-user.png";
import AdminMenu from "./admin_menu";
import CompanyMenu from "./company_menu";
import EmployeeMenu from "./employee_menu";
import { getProfile } from "../redux/actions/admin/companyActions";
import { IMAGE_URL } from "../config/config";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sessionReducer = useSelector(({ auth }) => auth);
  const role = useSelector((state) => state.auth.user?.role);
  const authReducer = useSelector((state) => state.auth?.user);
  const authId = authReducer.id;
  const userEmployeeReducer = useSelector((state) => state.useremployee);

  useEffect(() => {
    if (userEmployeeReducer.list === null && authId) {
      const getProfileById = async () => {
        dispatch(getProfile(authId));
      };

      getProfileById();
    }
  }, [authId, userEmployeeReducer.list]);

  // const row = authReducer;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (path) => {
    navigate(path);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function LogOut() {
    navigatePage("/login");
    dispatch(logout());
  }

  function ViewEmployeePassword() {
    const id = authReducer.id;
    navigatePage(`/employee/reset-password/${id}`);
  }
  function ViewCompanyPassword() {
    const id = authReducer.id;
    navigatePage(`/company/reset-password/${id}`);
  }
  function AdminViewPassword() {
    const id = authReducer.id;
    navigatePage(`/admin/reset-password/${id}`);
  }

  function ViewEmployee() {
    const id = authReducer.id;
    navigatePage(`/employee/edit/${id}`);
  }
  function ViewCompany() {
    const id = authReducer.id;
    navigatePage(`/company/edit/${id}`);
  }
  function AdminView() {
    const id = authReducer.id;
    navigatePage(`/admin/edit/${id}`);
  }

  return (
    <header>
      <div className="header_top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
              <div className="logo text-left pl-3">
                <a onClick={() => navigatePage("/")}>
                  <img src="/assets/images/logo.png" alt="logo" />
                </a>
              </div>
            </div>

            <div className="header-login col-lg-6 col-md-6 col-sm-6 col-6">
              <div className="login_nav text-right">
                <ul>
                  <li className="d-inline-block mt-2">
                    {isAuthenticated ? (
                      <ul>
                        <li className="d-inline-block">
                          <a
                            href="#"
                            className="login_user"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown(); // Toggle the dropdown on user name click
                            }}
                          >
                            <span>
                              {userEmployeeReducer?.list?.data?.image ===
                                undefined ||
                              userEmployeeReducer?.list?.data?.image ===
                                "null" ? (
                                <img
                                  style={{ height: "100%" }}
                                  src={`${DEF_URL}${PROFILE}`}
                                  align="Default-Image"
                                />
                              ) : (
                                <img
                                  style={{ height: "100%" }}
                                  src={`${IMAGE_URL}/${userEmployeeReducer?.list?.data?.image}`}
                                  align="Auth-Image"
                                />
                              )}
                            </span>
                            {sessionReducer.user.username}
                            <i
                              className={
                                isDropdownOpen
                                  ? "fa fa-angle-up"
                                  : "fa fa-angle-down"
                              }
                              aria-hidden="true"
                            ></i>
                          </a>

                          {/* Render the dropdown menu based on the state */}
                          {isDropdownOpen && (
                            <ul
                              className="user_drop_menu"
                              style={{ width: "200px" }}
                            >
                              {role === ROLES.ADMIN ? (
                                <>
                                  <li>
                                    <a
                                      onClick={() => {
                                        AdminView();
                                      }}
                                    >
                                      <i className="far fa-user"></i>&nbsp;
                                      Update Profile
                                    </a>
                                  </li>{" "}
                                  <hr />
                                  <li className=" mb-2">
                                    <a
                                      onClick={() => {
                                        AdminViewPassword();
                                      }}
                                    >
                                      <i className="fas fa-sliders-h"></i>&nbsp;
                                    UpdatePassword
                                    </a>
                                  </li>
                                </>
                              ) : role === ROLES.COMPANY ? (
                                <>
                                  <li>
                                    <a
                                      onClick={() => {
                                        ViewCompany();
                                      }}
                                    >
                                      <i className="far fa-user"></i>&nbsp;
                                      Update Profile
                                    </a>
                                  </li>{" "}
                                  <hr />
                                  <li className="mb-2">
                                    <a
                                      href=""
                                      onClick={() => {
                                        ViewCompanyPassword();
                                      }}
                                    >
                                      <i className="fas fa-sliders-h"></i>&nbsp;
                                      Reset Password
                                    </a>
                                  </li>
                                </>
                              ) : role === ROLES.EMPLOYEE ? (
                                <>
                                  <li>
                                    <a
                                      onClick={() => {
                                        ViewEmployee();
                                      }}
                                    >
                                      <i className="far fa-user"></i>&nbsp;
                                      Update Profile
                                    </a>
                                  </li>{" "}
                                  <hr />
                                  <li className="mb-2">
                                    <a
                                      onClick={() => {
                                        ViewEmployeePassword();
                                      }}
                                    >
                                      <i className="fas fa-sliders-h"></i>&nbsp;
                                      Reset Password
                                    </a>
                                  </li>
                                </>
                              ) : null}
                              <hr />
                              <li className="mb-2">
                                <a onClick={LogOut}>
                                  {/* <i className="far fa-user"></i>&nbsp; */}
                                  {/* <i className="far fa-times-circle"></i>&nbsp;  */}
                                  <i className="fa fa-exclamation-circle"></i>
                                  &nbsp; Logout
                                </a>
                              </li>
                            </ul>
                          )}
                        </li>
                      </ul>
                    ) : (
                      <button onClick={() => navigatePage("/login")}>
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header_bottom">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-md">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <i className="fas fa-bars"></i>{" "}
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li
                    className={
                      pathname === "/" ? `nav-item active` : `nav-item`
                    }
                  >
                    <a
                      className="nav-link"
                      onClick={() => {
                        navigatePage("/");
                      }}
                    >
                      Home
                    </a>
                  </li>

                  {role === ROLES.ADMIN ? <AdminMenu /> : null}

                  {role === ROLES.COMPANY ? <CompanyMenu /> : null}

                  {role === ROLES.EMPLOYEE ? <EmployeeMenu /> : null}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
