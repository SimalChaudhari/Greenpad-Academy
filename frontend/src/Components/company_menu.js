import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CompanyMenu() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <li className={pathname === '/employees' || pathname.startsWith('/employees/view/') ? `nav-item active` : `nav-item`}>
                <a
                    className="nav-link"
                    onClick={() => {
                        navigate("/employees");
                    }}
                >
                    Employees
                </a>
            </li>

            <li className={pathname === '/courses' || pathname.startsWith('/courses') ? `nav-item active` : `nav-item`}>
                <a
                    className="nav-link"
                    onClick={() => {
                        navigate("/courses");
                    }}
                >
                    Courses
                </a>
            </li>

        </>
    );
}

export default CompanyMenu;