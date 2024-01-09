import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SubMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <div className="col-lg-3">
        <div className="main_tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item mb-2">
              <a
                className={
                  pathname === "/employee/reports"
                    ? `nav-link active white_bg`
                    : `nav-link white_bg`
                }
                onClick={() => {
                  navigate("/employee/reports");
                }}>
                <i className="far fa-address-card"></i>Exams Results and
                Feedback
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                className={
                  pathname === "/employee/certificates"
                    ? `nav-link active white_bg`
                    : `nav-link white_bg`
                }
                onClick={() => {
                  navigate("/employee/certificates");
                }}>
                <i className="fas fa-award"></i>Certificates
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                className={
                  pathname === "/employee/sustainable-plan-2"
                    ? `nav-link active white_bg`
                    : `nav-link white_bg`
                }
                onClick={() => {
                  navigate("/employee/sustainable-plan-2");
                }}>
                <i className="far fa-address-card"></i>Sustainable Development
                Plan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
