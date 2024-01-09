import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileupload } from "../../redux/actions/admin/employeeActions";
import { fileuploadByComapny } from "../../redux/actions/company/employeeActions";
import { ROLES } from "../../config/roles";

const SheetModel = ({ sheetUploadHandleCloseModal, handleUpdate }) => {
  const role = useSelector((state) => state.auth.user?.role);
  const [file, setFile] = useState("");

  const handleCancel = () => {
    sheetUploadHandleCloseModal();
  };

  const dispatch = useDispatch();

  const selectFile = (f) => {
    f.preventDefault();
    setFile(f.target.files[0]);
  };

  const onFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    if (role === ROLES.ADMIN) {
      const data = await dispatch(fileupload(formData));
      if (data) {
        sheetUploadHandleCloseModal();
      }
    } else if (role === ROLES.COMPANY) {
      const data = await dispatch(fileuploadByComapny(formData));
      if (data) {
        sheetUploadHandleCloseModal();
      }
    }
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
              <label className="mt-2">Add Your Sheet</label>
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
                      <label>Attachment</label>
                      <input
                        type="file"
                        name=""
                        encType="multipart/form-data"
                        onChange={(f) => selectFile(f)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="green_bg color_white"
                onClick={(e) => onFileUpload(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetModel;
