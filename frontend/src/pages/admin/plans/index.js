import React, { useEffect, useState } from "react";
import { fatchPlans,deletePlanById } from "../../../redux/actions/Plans/plansActions";
import { Table, DeleteModel } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import EditModelForm from "./EditModelForm";
import { useNavigate, useLocation } from "react-router-dom";
import CreateModelForm from "./CreateModelForm.js";
import { Hourglass } from "react-loader-spinner"; // Import the loader component
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
const moment = require("moment");

const PlansManagement = () => {
  const dispatch = useDispatch();
  const plansReducer = useSelector((state) => state?.plans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState(null);
  
  const loading = plansReducer?.loading;
  
  const dataWithFormattedDate = plansReducer?.list?.data?.map((item) => {
      return {
          ...item,
          formattedCreateDate: moment(item?.created_at).format("MMMM DD, YYYY"),
          formattedUpdateDate: moment(item?.updated_at).format("MMMM DD, YYYY"),
        };
    });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (path) => {
    navigate(path);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "formattedCreateDate", label: "Created Date" },
    { key: "formattedUpdateDate", label: "Updated Date" },
  ];

  useEffect(() => {
        dispatch(fatchPlans());
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleUpdate = (updatedCompany) => {
    // dispatch(updateCompany(updatedCompany));
    setSelectedPlans(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    setSelectedPlans(null);
    handleCloseModal();

    const planId = data._id;
    dispatch(deletePlanById(planId));
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
                <h3 className="mb-4 p-2 site_bg color_white">PLANS</h3>

                <Tooltip id="my-tooltip" />
                <div className="container col-md-12">
                  <div className="row register_form">
                    <div className="col-lg-12">
                      <div className="form_field add_courses mb-1 text-right">
                        <a
                          className="color_white blue_bg d-inline-block mr-0 p-2 rounded"
                          // href="#"
                          // data-toggle="modal"
                          // data-target="#myModal"
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
                      {plansReducer?.list?.data ? (
                        <Table
                          columns={columns}
                          data={dataWithFormattedDate}
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
                                setSelectedPlans(row);
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
                                setSelectedPlans(row);
                              },
                            },
                          ]}
                        />
                      ) : (
                        <>
                          <hr />
                          <div className="text-center">
                          <b>Add Plans</b>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {modalOpen && selectedPlans && (
            <EditModelForm
              plansData={selectedPlans}
              handleUpdate={handleUpdate}
              handleCloseModal={handleCloseModal}
            />
          )}

          {deleteModalOpen && selectedPlans && (
            <DeleteModel
              data={selectedPlans}
              handleDelete={handleDelete}
              handleCloseModal={() => setDeleteModalOpen(false)}
            />
          )}

          {createModalOpen && (
            <CreateModelForm handleCloseModal={() => createHandleCloseModal(false)} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PlansManagement;
