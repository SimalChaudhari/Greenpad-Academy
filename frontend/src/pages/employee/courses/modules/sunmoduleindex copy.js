import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getModulesProgress,
  updateProgress,
  editEmployeeNoteById,
} from "../../../../redux/actions/employee/modulesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../../../Components/Layout";
import "./module.css";

const EmpCourseModulesIndex = () => {
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);

  const [selectedModuleDescription, setSelectedModuleDescription] = useState(
    []
  );
  let courseModuleData = [];

  if (Array?.isArray(selectedModuleDescription)) {
    courseModuleData = selectedModuleDescription?.map((module) => module);
  }

  const { id } = useParams();

  const [activeRow, setActiveRow] = useState("");

  const location = useLocation();
  const courseId = location?.pathname.split("/")[4];

  useEffect(() => {
    dispatch(getAll(id));
    dispatch(getModulesProgress(id));
  }, [dispatch, id]);

  const handleRowClick = (row) => {
    setActiveRow(row?._id);
    const selectedModule = data?.modules?.find(
      (module) => module?._id === row?._id
    );

    if (
      selectedModule
      // &&
      // Array.isArray(selectedModule?.modules) &&
      // selectedModule?.modules?.length > 0
    ) {
      const descriptionContents = selectedModule?.module?.map(
        (description) => description
      );
      setSelectedModuleDescription(descriptionContents);
    } else {
      setSelectedModuleDescription([]);
    }
  };

  useEffect(() => {
    if (data?.modules?.list?.length > 0) {
      // setSelectedModuleDescription(data?.modules.list[0].descriptions);
    }
  }, [data?.modules]);

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container col-md-12">
          <div className="row register_form">
            <div className="col-lg-12">
              <div className="form_field add_courses mb-1 text-right"></div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mt-2">
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-2 pt-3 black_bg pr-3 pl-3 pt-1 pb-3 color_white heading_tabs text-center">
                    {/* MODULES */}
                    CHAPTERS
                  </div>
                  <div></div>
                  {data?.modules?.map((row, index) => (
                    <div
                      key={row?._id}
                      className={`${
                        activeRow === row?._id
                          ? "mb-3 site_bg color_white ml-1 mr-1"
                          : ""
                      }`}
                      onClick={() => handleRowClick(row)}>
                      <div className="mb-2 pointer">
                        <div
                          className={`${
                            activeRow === row?._id
                              ? "pt-2 pb-2 site_bg color_white "
                              : "white_bg color_black pt-2 pb-2"
                          }`}>
                          <b
                            className={`${
                              activeRow === row?._id
                                ? "pt-2 pb-2 site_bg color_white pl-3 pr-3"
                                : "white_bg color_white black_bg pl-3 pr-3 pt-2 pb-2"
                            }`}>
                            {index + 1}.
                          </b>{" "}
                          &nbsp;
                          <b className="pl-3 pr-3" title={row?.module_title}>
                            {row?.module_title?.length > 80
                              ? row?.module_title.substring(0, 80) + "..."
                              : row?.module_title}
                          </b>{" "}
                          <b>
                            <a
                              href="#"
                              style={{ color: "green", float: "right" }}
                              className="pr-4"
                              onClick={() => {
                                navigatePage(
                                  `/employee/modules/${row._id}/courses/${courseId}`
                                );
                              }}>
                              <i className="fas fa-file-alt"></i> Open
                            </a>
                          </b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-2">
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                    <div></div>
                    {data?.name}
                  </div>
                  <div
                    style={{ minHeight: "400px" }}
                    className="module-description"
                    // ref={contentRef}
                  >
                    <div
                      className="description white_bg"
                      style={{ minHeight: "400px" }}>
                      <ul className="p-5">
                        {selectedModuleDescription?.map((module, index) => (
                          <li key={index} className="">
                            <b>
                              {index + 1} {" :"} {module?.title} <hr></hr>
                            </b>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmpCourseModulesIndex;
