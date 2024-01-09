import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  deleteCompanyById,
  getProfile,
} from "../../redux/actions/admin/companyActions.js";
import { Table, DeleteModel } from "../../Components";
// import { viewModelForm } from "./viewModelForm";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout.js";
import EditModelForm from "./EditModelForm.js";
import { useNavigate, useLocation } from "react-router-dom";
import CreateModelForm from "./CreateModelForm.js";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const CompanyManagement = () => {
  const role = useSelector((state) => state.auth.user?.role);
  const dispatch = useDispatch();
  const companyReducer = useSelector((state) => state.company);
  const [filter, setFilter] = useState(defaultFilter);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formInputs, setFormInputs] = useState({
    company_name: "",
    email: "",
    address: "",
    country: "",
    post_code: "",
    is_active: false,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (path) => {
    navigate(path);
  };

  function View(row) {
    const id = row._id;
    dispatch(getProfile(row._id));
    setSelectedCompany(row);
    navigatePage(`/company/view/${id}`);
  }

  const columns = [
    { key: "company_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "country", label: "Country" },
    { key: "post_code", label: "Post Code" },
    // { key: "is_active", label: "Is Active" },
  ];

  useEffect(() => {
    dispatch(getAllCompanies(filter));
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleUpdate = (updatedCompany) => {
    // dispatch(updateCompany(updatedCompany));
    setSelectedCompany(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    setSelectedCompany(null);
    handleCloseModal();
    // Assuming you have the company ID stored in state or as a parameter
    const companyId = data._id; // Add the company ID here
    dispatch(deleteCompanyById(companyId));
  };
  const handleView = (companyId) => {
    navigatePage(`/company-management/view/${companyId}`);
  };

  const createHandleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const createHandleCloseModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                <h3 className="mb-4 p-2 site_bg color_white">COMPANIES</h3>

                <div className="container col-md-12">
                  <div className="row register_form">
                    <div className="col-lg-12">
                      <div className="form_field add_courses mb-1 text-right">
                        <a
                          className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                          href="#"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => {
                            createHandleOpenModal();
                          }}
                        >
                          Add
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forum_table white_bg p-3">
                  <Table
                    columns={columns}
                    data={
                      companyReducer?.list?.data ? companyReducer.list.data : []
                    }
                    actions={[
                      {
                        label: "Edit",
                        buttonClassName: "btn-primary mr-1",
                        onClick: (row) => {
                          // Handle edit action
                          // console.log("Edit clicked for row:", row);
                          handleOpenModal();
                          setSelectedCompany(row);
                        },
                      },
                      {
                        label: "Delete",
                        buttonClassName: "btn-danger mr-1",
                        onClick: (row) => {
                          // Handle delete action
                          setDeleteModalOpen(true);
                          setSelectedCompany(row);
                          // console.log("Delete clicked for row:", row);
                        },
                      },
                      {
                        label: "View",
                        buttonClassName: "btn-info",
                        onClick: (row) => {
                          View(row);
                          setViewModalOpen(true);
                          setSelectedCompany(row);
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {modalOpen && selectedCompany && (
            <EditModelForm
              companyData={selectedCompany}
              handleUpdate={handleUpdate}
              handleCloseModal={handleCloseModal}
            />
          )}

          {deleteModalOpen && selectedCompany && (
            <DeleteModel
              data={selectedCompany}
              handleDelete={handleDelete}
              handleCloseModal={() => setDeleteModalOpen(false)}
            />
          )}

          {viewModalOpen && selectedCompany && (
            <DeleteModel
              companyData={selectedCompany}
              handleView={handleView}
              handleCloseModal={() => setViewModalOpen(false)}
            />
          )}

          {createModalOpen && (
            <CreateModelForm createHandleCloseModal={createHandleCloseModal} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CompanyManagement;
