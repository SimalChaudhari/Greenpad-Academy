import React, { useEffect, useState } from "react";
import {
  getListing,
  deleteEmployee,
} from "../../../redux/actions/admin/employeeActions";
import { getAllCompanies } from "../../../redux/actions/admin/companyActions";
import { Table, DeleteModel } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { useNavigate } from "react-router-dom";
import SheetModel from "../../../Components/Sheet/index";
import FileXlsx from "../../../Components/files/admin/Admin-Upload-Employees.xlsx";
import CreateModelForm from "./CreateModelForm";
import EditModelForm from "./EditModelForm";
import { Hourglass } from "react-loader-spinner";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Employees = () => {
  const ADMIN_UPLOAD_XLSA_URL = `${FileXlsx}`;
  const dispatch = useDispatch();

  const companyReducer = useSelector((state) => state?.company?.list?.data);
  const empReducer = useSelector((state) => state?.employee);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search state in parent

  const emploading = empReducer.loading;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListing());
    dispatch(getAllCompanies());
  }, [dispatch]);

  const employeeReducer = useSelector((state) => {
    if (selectedCompany === "" && searchQuery === "") return state?.employee?.list?.data;
    return state?.employee?.list?.data?.filter(
      (employee) =>
        (selectedCompany === "" || employee?.created_by === selectedCompany) &&
        (employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

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

  const handleDownload = (fileUrl) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(blob);
        const fileName = fileUrl.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        window.URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.error("Error while downloading the file:", error);
      });
  };

  return (
    <Layout>
      <section className="employees-page grey_bg pt-5 pb-5">
        <div className="container">
          <h3 className="mb-4 p-2 site_bg color_white">Employees</h3>

          {emploading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          ) : (
            <>
              <Tooltip id="my-tooltip" />

              <div className="white_bg p-4 shadow-sm rounded">
                <div className="row mb-4 align-items-center">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="me-3">
                      <label htmlFor="companyDropdown" className="form-label">Select a Company:</label>
                      <select
                        id="companyDropdown"
                        className="form-select form-control"
                        onChange={(e) => setSelectedCompany(e.target.value)}
                      >
                        <option value="">All</option>
                        {companyReducer?.map((company) => (
                          <option key={company._id} value={company._id}>
                            {company.company_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-grow-1 ml-2">
                      <label htmlFor="employeeSearch" className="form-label">Search Employee:</label>
                      <input
                        type="text"
                        id="employeeSearch"
                        className="form-control"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Search filter applied here
                      />
                    </div>
                  </div>

                  <div className="col-md-4 d-flex justify-content-end">
                    <button
                      className="btn btn-primary me-2 ml-2"
                      onClick={() => setCreateModalOpen(true)}
                    >
                      Add Employee
                    </button>
                    <button
                      className="btn btn-success me-2 ml-2"
                      onClick={() => setSheetModalOpen(true)}
                    >
                      Upload Sheet
                    </button>
                    <button
                      className="btn btn-outline-primary ml-2"
                      onClick={() => handleDownload(ADMIN_UPLOAD_XLSA_URL)}
                    >
                      Download Template
                    </button>
                  </div>
                </div>

                <Table
                  columns={columns}
                  data={employeeReducer || []}
                  actions={[
                    {
                      label: <i className="fas fa-edit" data-tooltip-id="my-tooltip" data-tooltip-content="Edit"></i>,
                      buttonClassName: "btn-primary me-1",
                      onClick: (row) => {
                        setSelectedEmployee(row);
                        setModalOpen(true);
                      },
                    },
                    {
                      label: <i className="fas fa-trash" data-tooltip-id="my-tooltip" data-tooltip-content="Delete"></i>,
                      buttonClassName: "btn-danger me-1",
                      onClick: (row) => {
                        setSelectedEmployee(row);
                        setDeleteModalOpen(true);
                      },
                    },
                    {
                      label: <i className="fas fa-eye" data-tooltip-id="my-tooltip" data-tooltip-content="View"></i>,
                      buttonClassName: "btn-info",
                      onClick: (row) => navigate(`/employees/view/${row?._id}`),
                    },
                  ]}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {createModalOpen && (
        <CreateModelForm createHandleCloseModal={() => setCreateModalOpen(false)} />
      )}

      {sheetModalOpen && (
        <SheetModel sheetUploadHandleCloseModal={() => setSheetModalOpen(false)} />
      )}

      {modalOpen && selectedEmployee && (
        <EditModelForm
          employeeData={selectedEmployee}
          handleUpdate={(updatedEmployee) => {
            setModalOpen(false);
            setSelectedEmployee(null);
          }}
          handleCloseModal={() => setModalOpen(false)}
        />
      )}

      {deleteModalOpen && selectedEmployee && (
        <DeleteModel
          data={selectedEmployee}
          handleDelete={() => {
            dispatch(deleteEmployee(selectedEmployee._id));
            setDeleteModalOpen(false);
            setSelectedEmployee(null);
          }}
          handleCloseModal={() => setDeleteModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default Employees;
