import React, { useEffect, useState } from "react";
import { fatchPlans,deletePlanById } from "../../../redux/actions/Plans/plansActions";
import { Table, DeleteModel } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout";
import EditModelForm from "./EditModelForm";
import CreateModelForm from "./CreateModelForm";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import moment from "moment";

const PlansManagement = () => {
  const dispatch = useDispatch();
  const plansReducer = useSelector((state) => state?.plans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState(null);

  const loading = plansReducer?.loading;

  // Format dates
  const dataWithFormattedDate = plansReducer?.list?.data?.map((item) => ({
    ...item,
    formattedCreateDate: moment(item?.created_at).format("MMMM DD, YYYY"),
    formattedUpdateDate: moment(item?.updated_at).format("MMMM DD, YYYY"),
  }));

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fatchPlans());
  }, [dispatch]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = (updatedPlan) => {
    setSelectedPlans(null);
    handleCloseModal();
  };

  const handleDelete = (data) => {
    setSelectedPlans(null);
    setDeleteModalOpen(false);

    const planId = data._id;
    dispatch(deletePlanById(planId));
  };

  const createHandleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const createHandleCloseModal = () => {
    setCreateModalOpen(false);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "formattedCreateDate", label: "Created Date" },
    { key: "formattedUpdateDate", label: "Updated Date" },
  ];

  return (
    <Layout>
      <section className="plans_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="plans_content">
                <h3 className="mb-4 p-2 site_bg color_white">Plans Management</h3>

                <Tooltip id="my-tooltip" />
                <div className="text-right mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={createHandleOpenModal}
                  >
                    Add Plan
                  </button>
                </div>

                <div className="plans_table white_bg p-3">
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
                              buttonClassName: "btn-danger",
                              onClick: (row) => {
                                setDeleteModalOpen(true);
                                setSelectedPlans(row);
                              },
                            },
                          ]}
                        />
                      ) : (
                        <div className="text-center">
                          <b>No Plans Available</b>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Plan Modal */}
          {modalOpen && selectedPlans && (
            <EditModelForm
              plansData={selectedPlans}
              handleUpdate={handleUpdate}
              handleCloseModal={handleCloseModal}
            />
          )}

          {/* Delete Plan Modal */}
          {deleteModalOpen && selectedPlans && (
            <DeleteModel
              data={selectedPlans}
              handleDelete={handleDelete}
              handleCloseModal={() => setDeleteModalOpen(false)}
            />
          )}

          {/* Create Plan Modal */}
          {createModalOpen && (
            <CreateModelForm handleCloseModal={createHandleCloseModal} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PlansManagement;
