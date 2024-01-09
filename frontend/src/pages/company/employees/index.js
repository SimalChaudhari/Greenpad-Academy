import React, { useEffect, useState } from "react";
import {
  getAllEmployeesByComapny,
  deleteEmployeeByIdByComapny,
} from "../../../redux/actions/company/employeeActions";
import { getAllConpanyCourses } from "../../../redux/actions/company/courssActions";
import { Table, DeleteModel } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { useNavigate } from "react-router-dom";
import SheetModel from "../../../Components/Sheet/index";
import FileXlsx from "../../../Components/files/company/Company-Upload-Emloyee.xlsx";
import CreateModelForm from "./CreateModelForm";
import EditModelForm from "./EditModelForm";
import { Hourglass } from "react-loader-spinner"; // Import the loader component
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";


const Employees = () => {
  const ADMIN_UPLOAD_XLSA_URL = `${FileXlsx}`;
  const dispatch = useDispatch();
  const employeeReducer = useSelector((state) => state.companyemployee);
  const companycorseReducer = useSelector((state) => state.companycourses);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employeeloading = employeeReducer.loading;
  const comploading = companycorseReducer.loading;

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
    dispatch(getAllEmployeesByComapny());
    dispatch(getAllConpanyCourses());
  }, []);

  // useEffect(() => {
  //   if (employeeReducer?.list === null || companycorseReducer?.list === null) {
  //     dispatch(getAllEmployeesByComapny());
  //     dispatch(getAllConpanyCourses());
  //   }
  // }, [employeeReducer?.list, companycorseReducer?.list]);

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

  const createHandleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const createHandleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const sheetUploadHandleOpenModal = () => {
    setSheetModalOpen(true);
  };

  const sheetUploadHandleCloseModal = () => {
    setSheetModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = (updatedEmployee) => {
    // dispatch(updateEmployee(updatedEmployee));
    setSelectedEmployee(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    setSelectedEmployee(null);
    handleCloseModal();
    // Assuming you have the employee ID stored in state or as a parameter
    const employeeId = data._id; // Add the employee ID here
    dispatch(deleteEmployeeByIdByComapny(employeeId));
  };

  const handleView = (employeeId) => {
    navigatePage(`/employees/view/${employeeId}`);
  };

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                <h3 className="mb-4 p-2 site_bg color_white">EMPLOYEES</h3>

                {employeeloading || comploading ? (
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
                    <div className="container col-md-12">
                      <Tooltip id="my-tooltip" />
                      <div className="row register_form">
                        <div className="col-lg-2">
                          <div className="form_field mb-3"></div>
                        </div>
                        <div className="col-lg-2">
                          <div className="form_field mb-3"></div>
                        </div>
                        <div className="col-lg-8">
                          <div className="form_field add_courses mb-1 text-right">
                            <a
                              className="color_white blue_bg d-inline-block mr-3 p-2 rounded"
                              // href="#"
                              // data-toggle="modal"
                              // data-target="#myModal"
                              onClick={() => {
                                createHandleOpenModal();
                              }}
                            >
                              Add
                            </a>

                            <a
                              className="color_white green_bg d-inline-block mr-0 p-2 rounded"
                              // href="#"
                              // data-toggle="modal"
                              // data-target="#myModal"
                              onClick={() => {
                                sheetUploadHandleOpenModal();
                              }}
                            >
                              Upload Sheet
                            </a>
                          </div>

                          <div className="download_sheet text-right">
                            <a
                              href="#"
                              className="color_blue"
                              onClick={() => {
                                handleDownload(ADMIN_UPLOAD_XLSA_URL);
                              }}
                            >
                              Download Sheet
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forum_table white_bg pt-3 mt-3">
                      <Table
                        columns={columns}
                        data={
                          employeeReducer?.list?.data
                            ? employeeReducer.list.data
                            : []
                        }
                        actions={[
                          {
                            label: (
                              <i
                                className="fas fa-edit"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Edit"
                              ></i>
                            ),
                            buttonClassName: "btn-primary mr-1",
                            onClick: (row) => {
                              handleOpenModal();
                              setDeleteModalOpen(false);
                              setViewModalOpen(false);
                              setSelectedEmployee(row);
                            },
                          },
                          {
                            label: (
                              <i
                                className="fas fa-trash"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Delete"
                              ></i>
                            ),
                            buttonClassName: "btn-danger mr-1",
                            onClick: (row) => {
                              setDeleteModalOpen(true);
                              setViewModalOpen(false);
                              setModalOpen(false);
                              setSelectedEmployee(row);
                            },
                          },
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
                  </>
                )}
              </div>
            </div>
          </div>

          {createModalOpen && (
            <CreateModelForm createHandleCloseModal={createHandleCloseModal} />
          )}

          {sheetModalOpen && (
            <SheetModel
              sheetUploadHandleCloseModal={sheetUploadHandleCloseModal}
            />
          )}

          {modalOpen && selectedEmployee && (
            <EditModelForm
              employeeData={selectedEmployee}
              handleUpdate={handleUpdate}
              handleCloseModal={handleCloseModal}
            />
          )}

          {deleteModalOpen && selectedEmployee && (
            <DeleteModel
              data={selectedEmployee}
              handleDelete={handleDelete}
              handleCloseModal={() => setDeleteModalOpen(false)}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Employees;
