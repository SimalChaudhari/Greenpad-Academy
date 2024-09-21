import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../config/roles";
import { useSelector, useDispatch } from "react-redux";
import { getEmpSetting } from "../redux/actions/Setting/settingActions";
import { Hourglass } from "react-loader-spinner";
import './footer.css'; // Ensure this imports your CSS

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state?.auth?.user?.role);
  const settingReducer = useSelector((state) => state?.setting || []);
  const footerData = settingReducer?.list?.data || [];
  const loading = settingReducer.loading;

  useEffect(() => {
    if (footerData.length === 0) {
      dispatch(getEmpSetting());
    }
  }, [dispatch, footerData.length]);

  const navigatePage = (path) => {
    navigate(path);
  };

  const renderContactInfo = () => (
    <ul className="contact">
      <li>
        <i className="far fa-paper-plane"></i>
        {footerData.length > 0 && footerData[0]?.address}
      </li>
      <li>
        <a href={`mailto:${footerData[0]?.email}`}>
          <i className="fas fa-envelope"></i>
          {footerData.length > 0 && footerData[0]?.email}
        </a>
      </li>
      <li>
        <a href={`tel:${footerData[0]?.mobile_number}`}>
          <i className="fas fa-phone"></i>
          {footerData.length > 0 && footerData[0]?.mobile_number}
        </a>
      </li>
    </ul>
  );

  const renderSocialIcons = () => (
    <ul className="social_icon">
      <li>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
      </li>
      <li>
        <a href="#"><i className="fab fa-twitter"></i></a>
      </li>
      <li>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </li>
      <li>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </li>
    </ul>
  );

  const renderFooterColumns = () => {
    switch (role) {
      case ROLES.ADMIN:
      case ROLES.COMPANY:
      case ROLES.EMPLOYEE:
        return (
          <>
            <div className="col-lg-4 col-md-6">
              <div className="footer_column">
                <img src="/assets/images/footer-logo.png" alt="logo" className="footer_logo" />
                <p className="footer_description">
                  Providing internationally recognised accredited management and leadership training in sustainability.
                </p>
                {renderSocialIcons()}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer_column">
                <h4>Featured Links</h4>
                <ul className="links">
                  <li><a onClick={() => navigatePage("/")}>Home</a></li>
                  <li><a onClick={() => navigatePage("/employees")}>Employees</a></li>
                  <li><a onClick={() => navigatePage("/companies")}>Companies</a></li>
                  <li><a onClick={() => navigatePage("/courses")}>Courses</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer_column">
                <h4>Contact</h4>
                {loading ? <Hourglass visible={true} height="50" width="50" /> : renderContactInfo()}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <footer>
      <div className="footer_top">
        <div className="container">
          <div className="row">{renderFooterColumns()}</div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>© Copyright Academy 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
