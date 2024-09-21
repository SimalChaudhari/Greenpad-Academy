import React from "react";
import "./DeleteModel.css"; // Custom CSS file for styling

const DeleteModel = ({ data, handleDelete, handleCloseModal }) => {
  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      className="modal fade show delete-modal"
      style={{ paddingRight: "17px", display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      id="deleteModel"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header text-white">
            <h5 className="modal-title  text-white">Confirm Deletion</h5>
            <button
              onClick={handleCancel}
              type="button"
              className="close text-white"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(data)}
            >
              Yes, Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
