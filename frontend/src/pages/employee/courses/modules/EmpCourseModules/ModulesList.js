import React, { useState } from "react";
import { FaCheck } from "react-icons/fa"; // Importing a check icon from FontAwesome
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import programImage from "./path-to-your-image.jpg"; // Import your static image
import { Typography } from "@mui/material";

const ModulesList = ({
  data,
  activeRow,
  setActiveRow,
  setInnerData,
  setActiveModuleRow,
  setCourseModule_Id,
  setActiveModule,
  setSubModuleDescription,
  activeSubmodule,
  setProgramTitle,
  setExamSection // New prop to handle exam section click
}) => {
  const [module, setModule] = useState(null);
  const navigate = useNavigate();
  const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);

  const toggleModule = (row) => {
    const isSameRow = activeRow === row?._id;
    setActiveRow(isSameRow ? null : row?._id);
    setInnerData(isSameRow ? [] : row);
    setActiveModuleRow(isSameRow ? null : row._id);
    setCourseModule_Id(isSameRow ? null : row?._id);
    setActiveModule(isSameRow ? null : row);
    setModule(isSameRow ? null : row);
  };

  const handleSubModuleClick = (subModule) => {
    setSubModuleDescription(subModule?.descriptions);
    setProgramTitle(false);
  };

  const handleProgramTitleClick = () => {
    setProgramTitle(true);
  };

  const handleExamClick = (moduleId) => {
    // Redirect to the exam page with the moduleId
    navigate(`/exam/${moduleId}`);
  };

  return (
    <div
      className="col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-2"
      style={{
        maxHeight: "720px",
        minHeight: "400px",
        overflowY: "scroll",
      }}
    >
      <div className="main_tab_content">
        <div className="tab-content">

          <div className="mb-3 color_white heading_tabs text-center">
            <Typography >Programme</Typography>
          </div>

          {/* Static Program Title */}
          <div onClick={() => toggleModule({ _id: 'programme_title' })}
            className={`mb-3 pointer ${activeRow === 'programme_title'
              ? "active-module-bg color_white"
              : "inactive-module-bg color_black"
              }`}>
            <div className="pt-2 pb-2" onClick={() => handleProgramTitleClick()}>Programme Title</div>
          </div>

          {/* Chapters (Modules List) */}
          {data?.modules?.map((row, index) => (
            <div key={row?._id}>
              {/* Module header */}
              <div
                onClick={() => toggleModule(row)}
                className={`mb-3 pointer ${activeRow === row?._id
                  ? "active-module-bg color_white"
                  : "inactive-module-bg color_black"
                  }`}
              >
                <div className="pt-2 pb-2">
                  <b>{index + 1}. </b>
                  {row?.module_title}
                </div>
              </div>

              {/* Submodules and exam section */}
              {activeRow === row?._id && module?.module?.length > 0 && (
                <div className="">
                  {module.module.map((subModule, subIndex) => (
                    <div
                      key={subModule?._id}
                      onClick={() => handleSubModuleClick(subModule)}
                      className={`mb-2 pointer submodule-bg d-flex align-items-center ${activeSubmodule?.subModuleId === subModule?._id ? "submodule-active" : ""
                        }`}
                    >
                      <div className="p2 d-flex align-items-center">
                        <b>{subIndex + 1}. </b>
                        <span className="ml-2">{subModule?.title}</span>

                        {/* Display check icon if the submodule is active */}
                        {progress_list.some(item => item.subModule === subModule?._id) && (
                          <FaCheck className="ml-2 text-success fa-check" title="Read" />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Exam Section */}
                  <div
                    onClick={() => handleExamClick(row?._id)}
                    className="exam-section mt-2  mb-2 pointer d-flex align-items-center p2"
                  >
                    <span className="m-2 mb-2">Knowledge evaluation</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulesList;
