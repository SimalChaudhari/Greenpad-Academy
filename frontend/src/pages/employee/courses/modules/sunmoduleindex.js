import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, updateProgress, getModulesProgress, editEmployeeNoteById, deleteEmployeeNoteById } from "../../../../redux/actions/employee/modulesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../../../Components/Layout";
import { toast } from "react-toastify";
import screenfull from "screenfull";
import { DeleteModel } from "../../../../Components/index";
import { IMAGE_URL } from "../../../../config/config";
import Switch from "react-switch";
import Edit from "./Edit";
import "./module.css";

const EmpCourseModulesIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);
  const authId = useSelector((state) => state?.auth?.user);
  const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);
  const [selectedRow, setSelectedRow] = useState(null);

  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState([]);
  const [activeRow, setActiveRow] = useState("");
  const [activeModuleRow, setActiveModuleRow] = useState("");
  const [activeRowModule, setActiveRowModule] = useState("");
  const [innerData, setInnerData] = useState([]);
  const [allModuleDecription, setAllModuleDescription] = useState([]);
  const [activeTab, setActiveTab] = useState("newnotes");
  const [newNotesContent, setNewNotesContent] = useState("");
  const [saveNotesContent, setSaveNotesContent] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [courseModule_Id, setCourseModule_Id] = useState(null);
  const [isZoomed, setZoomed] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [selectedModuleDescription, setSelectedModuleDescription] =
    useState("");

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const { id } = useParams();
  const courseModuleId = innerData?._id;
  const location = useLocation();
  const courseId = location?.pathname?.split("/")[4];

  // const currentModule = data?.modules[currentModuleIndex];
  const currentModule = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeRow && courseModule_Id) {
        const formData = {
          id: id,
          activeRow,
          courseModuleId: courseModule_Id,
        };
        dispatch(updateProgress(formData));
      }
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, activeRow, courseModule_Id]);

  useEffect(() => {
    if (data && data.modules) {
      let modulesArray = [];
      for (let module of data?.modules) {
        modulesArray.push(module?.module);
      }
      let flattenedArray = [].concat(...modulesArray);
      setAllModuleDescription(flattenedArray);
    }
  }, [data]);

  useEffect(() => {
    if (allModuleDecription.length > 0) {
      setCurrentModuleIndex(allModuleDecription);
    }
  }, [allModuleDecription]);

  useEffect(() => {
    dispatch(getAll(id));
    dispatch(getModulesProgress(id));
  }, [dispatch, id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSaveNotes = () => {
    const textareaContent =
      activeTab === "newnotes" ? newNotesContent : saveNotesContent;
    if (!textareaContent.trim()) {
      toast.warning("Please enter some notes before saving.");
      return;
    }
    const Id = authId.id;

    const formData = {
      course: courseId,
      module: courseModule_Id,
      notes: textareaContent,
      tag: activeTag,
    };

    if (!activeTag) {
      toast.warning("Please select tag notes before saving.");
    } else {
      dispatch(editEmployeeNoteById(Id, formData));
      if (activeTab === "newnotes") {
        setNewNotesContent("");
      } else if (activeTab === "savenotes") {
        setSaveNotesContent("");
      }
    }
  };

  const toggleModule = (row) => {
    setActiveRowModule(activeRow === row?._id ? "" : "");
    setActiveTag(activeRow === row?._id ? null : null);
    setActiveRow(activeRow === row?._id ? null : row?._id);
    // dispatch(getModulesProgress(activeRow === row?._id ? null : row?._id));
    setInnerData(activeRow === row?._id ? [] : row);
    setCourseModule_Id(null);
    setSelectedRow(!selectedRow ? selectedRow : null);
    setActiveModuleRow(activeModuleRow === selectedRow?._id ? "" : row?._id);
  };

  const toggleInnerModule = (row) => {
    setActiveModuleRow(row._id);
    setCourseModule_Id(activeRow === row?._id ? [] : row?._id);
    setActiveRowModule(row?._id);
    // setSelectedRow(row.id === row.id ? row : null);
    setSelectedRow(row);
    setDescriptionPage(1);

    const selectedModule = row;

    if (selectedModule) {
      const descriptionContents = selectedModule?.descriptions?.map(
        (description) => description?.content
      );
      setSelectedModuleDescription(descriptionContents);
    } else {
      setSelectedModuleDescription([]);
    }
  };

  const prevRow = () => {
    const currentIndex = allModuleDecription?.findIndex(
      (module) => module?._id === selectedRow?._id
    );

    if (currentIndex > 0) {
      setDescriptionPage(1);
      const prevModule = allModuleDecription[currentIndex - 1];
      setSelectedRow(prevModule);
      setActiveRowModule(prevModule?._id);
      setActiveModuleRow(prevModule?._id);

      setSelectedModuleDescription(
        prevModule?.descriptions?.length > 0
          ? prevModule?.descriptions?.map((desc) => desc?.content)
          : []
      );

      setCurrentDescriptionIndex(
        prevModule?.descriptions?.length > 0
          ? prevModule?.descriptions?.map((desc) => desc?.content)
          : []
      );
    }
  };

  const nextRow = () => {
    const currentIndex = allModuleDecription?.findIndex(
      (module) => module?._id === selectedRow?._id
    );

    if (
      currentIndex > currentModule - 1 &&
      currentIndex !== allModuleDecription?.length - 1
    ) {
      setDescriptionPage(1);
      const nextModule = allModuleDecription[currentIndex + 1];
      setSelectedRow(nextModule);
      setActiveRowModule(nextModule?._id);
      setActiveModuleRow(nextModule?._id);

      setSelectedModuleDescription(
        nextModule?.descriptions?.length > 0
          ? nextModule?.descriptions?.map((desc) => desc?.content)
          : []
      );

      setCurrentDescriptionIndex(
        nextModule?.descriptions?.length > 0
          ? nextModule?.descriptions?.map((desc) => desc?.content)
          : []
      );
    }
  };

  const extractedDataED = selectedRow?._id;

  const extractedData = progress_list?.map((entry) => ({
    module: entry?.module,
    notes: entry?.notes,
    module_progressId: entry?._id,
  }));

  const result = extractedData?.map((entry) => {
    if (entry.module === extractedDataED) {
      return {
        module: entry?.module,
        notes: entry?.notes,
        _id: entry?._id,
        module_progressID: entry?.module_progressId,
      };
    }
    return {
      module: entry.module,
      notes: [],
    };
  });

  const calculateCourseProgress = (module_list, course_id, courseModuleId) => {
    const totalModules = module_list?.length;

    if (!totalModules) {
      return 0; // Return 0 if there are no modules in the course
    }

    const completedModules =
      progress_list?.filter((module) => module?.is_completed)?.length || 0;
    const progressPercentage = (
      (completedModules / totalModules) *
      100
    ).toFixed(2); // Limit to 2 decimal places

    return progressPercentage;
  };

  // Check Data
  const filteredProgressList = progress_list?.filter(
    (item) => item?.is_completed
  );

  const checkData = filteredProgressList?.map((data) => data?.module);

  const contentRef = useRef(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (screenfull.isEnabled && contentRef.current) {
        setZoomed(screenfull.isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullScreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullScreenChange);
      }
    };
  }, [isZoomed]);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && contentRef.current) {
      screenfull.toggle(contentRef.current);
      setIsHovered(true);
    }
  };

  const [descriptionPage, setDescriptionPage] = useState(1);
  const descriptionItemsPerPage = 1; // You can adjust the number of description items per page

  const indexOfLastDescription = descriptionPage * descriptionItemsPerPage;
  const indexOfFirstDescription =
    indexOfLastDescription - descriptionItemsPerPage;
  const currentDescriptions = selectedModuleDescription?.slice(
    indexOfFirstDescription,
    indexOfLastDescription
  );

  const totalDescriptionPages = Math.ceil(
    selectedModuleDescription?.length / descriptionItemsPerPage
  );

  const handleDescriptionPageChange = (pageNumber) => {
    setDescriptionPage(pageNumber);
  };

  const handleEdit = (note) => {
    setEditModalOpen(true);
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    // Define the actions you want to perform when closing the modal
    setDeleteModalOpen(false);
  };

  const handleDelete = (data) => {
    setSelectedNote(null);
    handleCloseModal();
    var formData = {
      data,
      courseId: courseId,
    };
    dispatch(deleteEmployeeNoteById(formData));
  };
  const [isHovered, setIsHovered] = useState(true);

  const handleClick = () => {
    setIsHovered((prevIsHovered) => !prevIsHovered);
  };
  useEffect(() => {
    // Use useEffect to set a timeout to change isHovered to false after 5 seconds
    let timeoutId;
    if (isHovered) {
      timeoutId = setTimeout(() => {
        setIsHovered(false);
      }, 10000);
    }

    return () => {
      // Clear the timeout if the component unmounts or isHovered changes
      clearTimeout(timeoutId);
    };
  }, [isHovered]);

  const [showContent, setShowContent] = useState(true);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

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
            {showContent && (
              <div
                className="col-xl-2 mt-2"
                style={{
                  maxHeight: "720px",
                  minHeight: "400px",
                  overflowY: "scroll",
                }}>
                <div className="main_tab_content">
                  <div className="tab-content">
                    <div className="mb-2 pt-3 black_bg pr-3 pl-3 pt-1 pb-3 color_white heading_tabs text-center">
                      Modules
                    </div>
                    <div></div>

                    {data?.modules?.map((row, index) => (
                      <div key={row?._id}>
                        <div
                          onClick={() => toggleModule(row)}
                          className={`${activeRow === row?._id
                              ? "mb-3 site_bg color_white pointer"
                              : "mb-3 pointer"
                            }`}>
                          <div
                            className={`${activeRow === row?._id
                                ? "pt-2 pb-2 site_bg color_white "
                                : "white_bg color_black pt-2 pb-2"
                              }`}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "normal",
                              }}>
                              <div
                                className={`${activeRow === row?._id
                                    ? "pt-2 pb-2 site_bg color_white pl-3 pr-3"
                                    : "white_bg color_white black_bg pl-3 pr-3 pt-2 pb-2 mr-2"
                                  }`}>
                                <b>{index + 1}.</b>{" "}
                              </div>
                              <div
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}>
                                {row?.module_title}
                              </div>
                            </div>
                            <b></b>
                          </div>
                        </div>

                        {activeRow === row?._id && (
                          <div>
                            {innerData?.module?.map((row, index) => (
                              <div
                                key={row?._id}
                                className="mb-1 pointer"
                                onClick={() => toggleInnerModule(row)}>
                                <div
                                  className={`${activeModuleRow === row?._id
                                      ? checkData.includes(row?._id)
                                        ? "pt-2 pb-2 green_bg color_white pl-3 pr-3"
                                        : "pt-2 pb-2 site_bg color_white pl-3 pr-3"
                                      : "white_bg color_black pl-3 pr-3 pt-2 pb-2"
                                    }`}
                                  style={{
                                    display: "flex",
                                  }}>
                                  <div>{index + 1}</div> &nbsp;:&nbsp;
                                  <div
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}>
                                    {row?.title}
                                  </div>
                                 
                                  <div>
                                    {checkData.includes(row?._id) && (
                                      <i
                                        className="fa fa-check-circle"
                                        style={{
                                          fontSize: "20px",
                                          float: "right",
                                          margin: "3px 0px 0px 0",
                                        }}></i>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={!showContent ? "col-xl-12 mt-2" : "col-xl-8 mt-2"}>
              <div className="col-lg-12">
                <div className="main_tab_content">
                  <div className="tab-content">
                    <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                      <div className="switch_toggle">
                        <Switch
                          onChange={toggleContent}
                          checked={showContent}
                          height={20}
                          width={40}
                          handleDiameter={22}
                          onColor="#4d4f5c"
                        />
                      </div>
                      <div>
                        <button
                          className="color_white"
                          onClick={toggleFullscreen}
                          disabled={activeRowModule === ""}
                          style={{
                            float: "right",
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                            opacity: activeRowModule === "" ? 0.4 : 1,
                          }}>
                          &nbsp;<i className="fas fa-search-plus"></i>
                        </button>
                      </div>
                      {data?.name}
                    </div>
                    <div
                      className={
                        isZoomed
                          ? "zoomed-module-description"
                          : "module-description"
                      }
                      ref={contentRef}>
                      <div
                        className={
                          isZoomed
                            ? "description1 white_bg  text-center gd_2"
                            : "description white_bg  text-center"
                        }>
                        {!activeRowModule ? (
                          <>
                            <img
                              src={`${IMAGE_URL}/${data?.image}`}
                              className="flex-grow-1"
                              alt="Course Image"
                            />
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between align-items-center">
                              {currentDescriptions &&
                                currentDescriptions?.length > 0 &&
                                currentDescriptions?.map((desc, index) => (
                                  <div
                                    className={isZoomed ? "zoomed_disc" : ""}
                                    onClick={handleClick}
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                      __html: desc,
                                    }}></div>
                                ))}
                              {isZoomed ? (
                                <>
                                  {isHovered ? (
                                    <div className="other-content">
                                      {/* Title Start */}
                                      <>
                                        <div
                                          className={
                                            isZoomed
                                              ? "site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs text-center gd_1"
                                              : "mb-2 mt-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs text-center"
                                          }>
                                          <div>
                                            <button
                                              className="color_white"
                                              onClick={toggleFullscreen}
                                              disabled={activeRowModule === ""}
                                              style={{
                                                float: "right",
                                                cursor: "pointer",
                                                border: "none",
                                                background: "none",
                                              }}>
                                              &nbsp;
                                              <i className="fas fa-search-minus"></i>
                                            </button>
                                          </div>
                                          {data?.name}
                                        </div>
                                      </>
                                      <p
                                        onClick={prevRow}
                                        className="px-2 py-3 rounded m-2 text-center cursor"
                                        style={{
                                          float: "left",
                                          cursor: "pointer",
                                          position: "inherit",
                                          top: "50%",
                                        }}>
                                        <i className="fas fa-solid fa-chevron-left"></i>
                                      </p>
                                      <p
                                        onClick={nextRow}
                                        className="px-2 py-3 rounded m-2 text-center cursor"
                                        style={{
                                          float: "right",
                                          cursor: "pointer",
                                          position: "inherit",
                                          top: "50%",
                                          right: "0",
                                        }}>
                                        <i className="fas fa-solid fa-chevron-right"></i>
                                      </p>
                                      {/* End Next Pre */}

                                      {/* Start ProgressBar and Inner Pagination */}
                                      <div className=" zoommed_courses_progress">
                                        <div
                                          className="d-flex align-items-center justify-content-center  mt-1 rounded-pill gd_3"
                                          style={{
                                            background: "#fff",
                                            padding: "5px",
                                            boxShadow: "inset 0px 0px 5px 0px",
                                            borderRadius: "25px",
                                          }}>
                                          {Array.from({
                                            length: totalDescriptionPages,
                                          })?.map((_, index) => (
                                            <button
                                              key={index}
                                              onClick={() =>
                                                handleDescriptionPageChange(
                                                  index + 1
                                                )
                                              }
                                              className={`round-border ${descriptionPage === index + 1
                                                  ? "active"
                                                  : ""
                                                }`}>
                                              {index + 1}
                                            </button>
                                          ))}
                                        </div>

                                        <div className="white_bg px-3 mt-1 mb-1 rounded gd_4">
                                          <div className="progress_view">
                                            <div className="row  text-center">
                                              <div className="col-lg-2 mt-2">
                                                <b className="color_orange">
                                                  Module Progress
                                                </b>
                                              </div>
                                              <div className="col-lg-10 flex">
                                                <div className="row">
                                                  <div
                                                    // className="col-lg-2 mt-2"
                                                    className={
                                                      isZoomed
                                                        ? "col-lg-1 mt-2"
                                                        : "col-lg-2 mt-2"
                                                    }>
                                                    <label>
                                                      <span>
                                                        {calculateCourseProgress(
                                                          allModuleDecription,
                                                          courseId,
                                                          courseModuleId
                                                        )}{" "}
                                                        %
                                                      </span>
                                                    </label>
                                                  </div>
                                                  <div
                                                    // className="col-lg-10 mt-3"
                                                    className={
                                                      isZoomed
                                                        ? "col-lg-11 mt-3"
                                                        : "col-lg-10 mt-3 "
                                                    }>
                                                    <div
                                                      className="progress"
                                                      style={{ width: "100%" }}>
                                                      <div
                                                        className="zoomed_progress-bar orange"
                                                        style={{
                                                          width: `${calculateCourseProgress(
                                                            allModuleDecription,
                                                            courseId,
                                                            courseModuleId
                                                          )}%`,
                                                        }}></div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* End ProgressBar and Inner Pagination */}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      className="description-pagination"
                      style={{
                        background: "#fff",
                        padding: "5px",
                        boxShadow: "inset 0px 0px 5px 0px",
                        borderRadius: "25px",
                      }}>
                      {Array.from({ length: totalDescriptionPages })?.map(
                        (_, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleDescriptionPageChange(index + 1)
                            }
                            className={`round-border ${descriptionPage === index + 1 ? "active" : ""
                              }`}>
                            {index + 1}
                          </button>
                        )
                      )}
                    </div>

                    <div className="white_bg px-3 mt-1 mb-1 rounded gd_4">
                      <div className="progress_view">
                        <div className="row  text-center">
                          <div className="col-lg-2 mt-2">
                            <b className="color_orange">Module Progress</b>
                          </div>
                          <div className="col-lg-10 flex">
                            <div className="row">
                              <div
                                // className="col-lg-2 mt-2"
                                className={
                                  isZoomed ? "col-lg-1 mt-2" : "col-lg-2 mt-2"
                                }>
                                <label>
                                  <span>
                                    {calculateCourseProgress(
                                      allModuleDecription,
                                      courseId,
                                      courseModuleId
                                    )}{" "}
                                    %
                                  </span>
                                </label>
                              </div>
                              <div
                                // className="col-lg-10 mt-3"
                                className={
                                  isZoomed
                                    ? "col-lg-11 mt-3"
                                    : "col-lg-10 mt-3 "
                                }>
                                <div
                                  className="progress"
                                  style={{ width: "100%" }}>
                                  <div
                                    className="zoomed_progress-bar orange"
                                    style={{
                                      width: `${calculateCourseProgress(
                                        allModuleDecription,
                                        courseId,
                                        courseModuleId
                                      )}%`,
                                    }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 mt-2">
                      <div className="row black_bg mt-4 p-2">
                        <div className="col-lg-6">
                          <p
                            onClick={prevRow}
                            className="color_white"
                            style={{ float: "left", cursor: "pointer" }}>
                            <i className="fas fa-solid fa-chevron-left"></i>{" "}
                            &nbsp; Previous
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p
                            onClick={nextRow}
                            className="color_white"
                            style={{ float: "right", cursor: "pointer" }}>
                            Next &nbsp;{" "}
                            <i className="fas fa-solid fa-chevron-right"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showContent && (
              <div className="col-xl-2 mt-2">
                <section className="">
                  <div className="enrollment_tab">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${activeTab === "newnotes"
                              ? "is_active"
                              : "isnot_active"
                            }`}
                          data-toggle="tab"
                          href="#newnotes"
                          onClick={() => handleTabClick("newnotes")}>
                          New Note &nbsp;
                          <i className="far fa-newspaper"></i>
                        </a>
                      </li>{" "}
                      &nbsp; &nbsp;
                      <li className="nav-item">
                        <a
                          className={`nav-link ${activeTab === "savenotes"
                              ? "is_active"
                              : "isnot_active"
                            }`}
                          data-toggle="tab"
                          href="#savenotes"
                          onClick={() => handleTabClick("savenotes")}>
                          Saved Notes
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div
                      className={`tab-pane container p-0 ${activeTab === "newnotes" ? "active" : ""
                        }`}
                      id="newnotes">
                      <div className="rgst_form p-3 ">
                        <div className="additional-links">
                          <textarea
                            style={{
                              height: "200px",
                              width: "100%",
                              border: "1px solid white",
                            }}
                            value={newNotesContent}
                            onChange={(e) => setNewNotesContent(e.target.value)}
                            placeholder="New Notes"></textarea>
                        </div>
                        <button
                          className="btn btn-primary btn-sm mt-2"
                          onClick={handleSaveNotes}
                          // onClick={() => handleSaveNotes(activeTab)}
                          disabled={activeRowModule === ""}>
                          Save
                        </button>
                      </div>
                      <div
                        className={`white_bg mt-4 pl-4 pt-3 pb-2 ${activeRowModule === "" ? "disabled" : ""
                          }`}
                        style={{
                          opacity: activeRowModule === "" ? 0.4 : 1,
                          border: "2px solid #4848487d",
                          borderRadius: "15px",
                        }}>
                        <span style={{ position: "relative", top: "-7px" }}>
                          add tags :
                        </span>
                        <span
                          className={`green_bg add_notes_dot ml-3 ${activeTag === "green" ? "add_notes_dot_active" : ""
                            }`}
                          onClick={() => handleTagClick("green")}>
                          &nbsp;
                        </span>{" "}
                        <span
                          className={`orange add_notes_dot ml-3 ${activeTag === "orange" ? "add_notes_dot_active" : ""
                            }`}
                          onClick={() => handleTagClick("orange")}>
                          &nbsp;
                        </span>{" "}
                        <span
                          className={`purple add_notes_dot ml-3 ${activeTag === "purple" ? "add_notes_dot_active" : ""
                            }`}
                          onClick={() => handleTagClick("purple")}>
                          &nbsp;
                        </span>{" "}
                        <span
                          className={`bg-primary add_notes_dot ml-3 ${activeTag === "bg-primary"
                              ? "add_notes_dot_active"
                              : ""
                            }`}
                          onClick={() => handleTagClick("bg-primary")}>
                          &nbsp;
                        </span>{" "}
                      </div>
                    </div>
                    <div
                      className={`tab-pane container p-0 ${activeTab === "savenotes" ? "active" : ""
                        }`}
                      id="savenotes">
                      <div
                        className="rgst_form p-3"
                        style={{ minHeight: "285px" }}>
                        <div className="additional-links mb-3">
                          {result.map((entry) => (
                            <div key={entry.module}>
                              {entry.notes.map((note, index) => (
                                <div key={note._id}>
                                  <>{index + 1}</> : <>{note.note}</>
                                  <div style={{ float: "right" }}>
                                    <a
                                      href="#"
                                      style={{ color: "blue" }}
                                      onClick={() => handleEdit(note)}>
                                      <i className="fas fa-edit"></i> Edit
                                    </a>{" "}
                                    &nbsp;&nbsp;
                                    <a
                                      href="#"
                                      style={{ color: "red" }}
                                      onClick={() => {
                                        setDeleteModalOpen(true);
                                        setSelectedNote(note);
                                      }}>
                                      <i className="fas fa-trash"></i> Delete
                                    </a>
                                  </div>{" "}
                                  <hr />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>

      {deleteModalOpen && selectedNote && (
        <DeleteModel
          data={selectedNote}
          handleDelete={handleDelete}
          handleCloseModal={() => setDeleteModalOpen(false)}
        />
      )}

      {editmodalOpen && selectedNote && (
        <Edit
          courseData={selectedNote}
          handleCloseModal={() => setEditModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default EmpCourseModulesIndex;
