import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <li
        className={
          pathname === "/my-academy" ||
          pathname === "/saved-notes" ||
          pathname === "/my-profile"
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/my-academy");
          }}>
          My Academy
        </a>
      </li>

      <li
        className={
          pathname === "/employee/reports" ||
          pathname === "/employee/certificates" ||
          pathname === "/employee/sustainable-plan-2"
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/employee/reports");
          }}>
          Reports
        </a>
      </li>

      {/* <li className={pathname === '/employee/tracking-dashboard' ? `nav-item active` : `nav-item`}>
                <a
                    className="nav-link"
                    onClick={() => { navigate("/employee/tracking-dashboard") }}
                >
                    Tracking Dashboard
                </a>
            </li> */}

      <li
        className={
          pathname === "/employee/guidance-support"
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/employee/guidance-support");
          }}>
          Guidance & Support
        </a>
      </li>

      <li
        className={
          pathname === "/employee/forum" ? `nav-item active` : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/employee/forum");
          }}>
          Forum
        </a>
      </li>
    </>
  );
}

export default EmployeeMenu;
