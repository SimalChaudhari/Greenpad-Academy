import React from "react";

const DeleteModel = ({ data, handleDelete, handleCloseModal }) => {
  const handleCancel = () => {
    handleCloseModal();
  };


  return (
    <div
      className="modal fade fourm_modal show"
      style={{ paddingRight: "17px", display: "block", background:"rgb(0 0 0 / 40%)"  }}
      id="deleteModel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header site_bg">
            <h4 className="modal-title color_white">
              <label className="mt-2">Are you sure you want to delete?</label>
            </h4>
            <button
              onClick={handleCancel}
              type="button"
              className="close"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form className="p-3 white_bg form_part">
              <div className="row"></div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form_filed mb-3">
                    <div className="input_fields_wrap">
                      {/* <label>Attachment</label> */}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="site_bg color_white mr-3"
                onClick={(e) => handleDelete(data)}
              >
                Delete
              </button>
              <button className="green_bg color_white" onClick={handleCancel}>
                No
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
