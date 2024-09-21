import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Helper function to generate menu items
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
      {createMenuItem("Employees", "/employees", ["/employees/view/"])}
      {createMenuItem("Companies", "/companies", ["/company/Employee/view/", "/employees/view/", "/company/view/"])}
      {createMenuItem("Courses", "/courses", ["/courses"])}
      {createMenuItem("Plans", "/plans")}
    </>
  );
}

export default AdminMenu;
