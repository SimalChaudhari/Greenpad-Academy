import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  deleteCompanyById,
} from "../../../redux/actions/admin/companyActions";
import { Table, DeleteModel } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import EditModelForm from "./EditModelForm.js";
import CreateModelForm from "./CreateModelForm.js";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const companyReducer = useSelector((state) => state.company);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loading = companyReducer.loading;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  // Filtered companies based on the search query
  const filteredCompanies = companyReducer?.list?.data?.filter((company) =>
    company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const createHandleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleUpdate = (updatedCompany) => {
    setSelectedCompany(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    const companyId = data._id;
    dispatch(deleteCompanyById(companyId));
    setSelectedCompany(null);
    setDeleteModalOpen(false);
  };

  const handleView = (companyId) => {
    navigate(`/company-management/view/${companyId}`);
  };

  const columns = [
    { key: "company_name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "country", label: "Country" },
    { key: "post_code", label: "Post Code" },
  ];

  return (
    <Layout>
      <section className="company-management grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="company_content">
                <h3 className="mb-4 p-2 site_bg color_white">Companies</h3>
                <div className="company_table white_bg p-3">
                  <div className="row mb-4 align-items-center">
                    {/* Search Company */}
                    <div className="col-md-8 d-flex align-items-center">
                      <div className="flex-grow-1">
                        <label htmlFor="searchCompany" className="form-label">
                          Search Company:
                        </label>
                        <input
                          type="text"
                          id="searchCompany"
                          className="form-control"
                          placeholder="Search by name or email"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Add Company Button */}
                    <div className="col-md-4 text-right">
                      <button
                        className="btn btn-primary"
                        onClick={createHandleOpenModal}
                      >
                        Add Company
                      </button>
                    </div>
                  </div>

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
                    <div className="admincompany">
                      {filteredCompanies && filteredCompanies.length > 0 ? (
                        <Table
                          columns={columns}
                          data={filteredCompanies}
                          actions={[
                            {
                              label: (
                                <i
                                  className="fas fa-users"
                                  data-tooltip-id="my-tooltip"
                                  data-tooltip-content="View Employees"
                                ></i>
                              ),
                              buttonClassName: "btn-warning me-1",
                              onClick: (row) => {
                                navigate(`/company/employees/${row._id}`);
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
                              buttonClassName: "btn-info me-1",
                              onClick: (row) => handleView(row._id),
                            },
                            {
                              label: (
                                <i
                                  className="fas fa-edit"
                                  data-tooltip-id="my-tooltip"
                                  data-tooltip-content="Edit"
                                ></i>
                              ),
                              buttonClassName: "btn-primary me-1",
                              onClick: (row) => {
                                handleOpenModal();
                                setSelectedCompany(row);
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
                              buttonClassName: "btn-danger",
                              onClick: (row) => {
                                setDeleteModalOpen(true);
                                setSelectedCompany(row);
                              },
                            },
                          ]}
                        />
                      ) : (
                        <div className="text-center">
                          <b>No companies found. Please add new companies.</b>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          {modalOpen && selectedCompany && (
            <EditModelForm
              companyData={selectedCompany}
              handleUpdate={handleUpdate}
              handleCloseModal={handleCloseModal}
            />
          )}

          {/* Delete Modal */}
          {deleteModalOpen && selectedCompany && (
            <DeleteModel
              data={selectedCompany}
              handleDelete={handleDelete}
              handleCloseModal={() => setDeleteModalOpen(false)}
            />
          )}

          {/* Create Modal */}
          {createModalOpen && (
            <CreateModelForm createHandleCloseModal={() => setCreateModalOpen(false)} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CompanyManagement;
