import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Helper function to create menu items
  const createMenuItem = (label, path, activePaths = []) => {
    const isActive = pathname === path || activePaths.some(ap => pathname.startsWith(ap));
    return (
      <li className={`nav-item ${isActive ? "active" : ""}`}>
        <a className="nav-link" onClick={() => navigate(path)}>
          {label}
        </a>
      </li>
    );
  };

  return (
    <>
      {createMenuItem("My Academy", "/my-academy", ["/saved-notes", "/my-profile"])}
      {createMenuItem("Reports", "/employee/reports", [
        "/employee/certificates",
        "/employee/sustainable-plan-2"
      ])}
      {createMenuItem("Guidance & Support", "/employee/guidance-support")}
      {createMenuItem("Forum", "/employee/forum")}
    </>
  );
}

export default EmployeeMenu;
