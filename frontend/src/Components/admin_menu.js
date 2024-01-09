import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* employees */}
      <li
        className={
          pathname === "/employees" || pathname.startsWith("/employees/view/")
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/employees");
          }}>
          Employees
        </a>
      </li>

      {/* companies */}
      <li
        className={
          pathname === "/companies" ||
          pathname.startsWith("/company/Employee/view/") ||
          pathname.startsWith("/employees/view/") ||
          pathname.startsWith("/company/view/")
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/companies");
          }}>
          Companies
        </a>
      </li>

      <li
        className={
          pathname === "/courses" || pathname.startsWith("/courses")
            ? `nav-item active`
            : `nav-item`
        }>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/courses");
          }}>
          Courses
        </a>
      </li>

      <li className={pathname === "/plans" ? `nav-item active` : `nav-item`}>
        <a
          className="nav-link"
          onClick={() => {
            navigate("/plans");
          }}>
          Plans
        </a>
      </li>
    </>
  );
}

export default AdminMenu;
