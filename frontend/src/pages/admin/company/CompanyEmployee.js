import React, { useEffect, useState } from "react";
import { getListing } from "../../../redux/actions/admin/employeeActions";
import { Table } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { useNavigate, useLocation } from "react-router-dom";
import { Hourglass } from "react-loader-spinner"; // Import the loader component
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Employees = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const employeeReducer = useSelector((state) => state.employee.list?.data);
  const employeeReducer = useSelector((state) => {
    const employeeList = state.employee.list;
    if (employeeList) {
      return employeeList.data;
    } else {
      return []; // You can return a default value or handle
    }
  });
  const empReducer = useSelector((state) => state.employee);
  const CompanyId = location.pathname.split("/")[4];
  const loading = empReducer.loading;

  const navigate = useNavigate();
  const navigatePage = (path) => {
    navigate(path);
  };

  const columns = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "job_title", label: "Job Title" },
    { key: "department", label: "Department" },
    { key: "address", label: "Address" },
    { key: "country", label: "Country" },
    { key: "post_code", label: "Post Code" },
  ];

  useEffect(() => {
      dispatch(getListing());
  }, []);

  const handleView = (employeeId) => {
    navigatePage(`/employees/view/${employeeId}`);
  };

  const filteredEmployees = employeeReducer.filter(
    (employee) => employee.created_by === CompanyId
  );

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                <h3 className="mb-4 p-2 site_bg color_white">
                  COMPANY EMPLOYEES
                </h3>
                <Tooltip id="my-tooltip" />

                <div className="container col-md-12">
                  <div className="row register_form">
                    <div className="col-lg-2">
                      <div className="form_field mb-3"></div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form_field mb-3"></div>
                    </div>
                  </div>
                </div>

                <div className="forum_table white_bg pt-3 mt-3">
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
                      {employeeReducer === undefined ? (
                        <>
                          <hr />
                          <b>Add Employes</b>
                        </>
                      ) : (
                        <div className="admincompanyEmployee">
                        <Table
                          columns={columns}
                          data={filteredEmployees ? filteredEmployees : []}
                          actions={[
                            {
                              label: (
                                <i
                                  className="fas fa-eye"
                                  data-tooltip-id="my-tooltip"
                                  data-tooltip-content="View"
                                ></i>
                              ),
                              buttonClassName: "btn-info",
                              onClick: (row) => {
                                handleView(row?._id);
                              },
                            },
                          ]}
                        />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Employees;
