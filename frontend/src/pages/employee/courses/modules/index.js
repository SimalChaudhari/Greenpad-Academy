import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getModulesProgress, updateProgress, editEmployeeNoteById } from "../../../../redux/actions/employee/modulesActions";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../../Components/Layout";
import { toast } from "react-toastify";
import screenfull from "screenfull";
import "./module.css";

const EmpModulesIndex = () => {
  const dispatch = useDispatch();
  const [newNotesContent, setNewNotesContent] = useState("");
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);
  const authId = useSelector((state) => state?.auth?.user);
  const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);

  const [activeTag, setActiveTag] = useState(null);
  const [selectedModuleDescription, setSelectedModuleDescription] = useState("");
  const [saveNotesContent, setSaveNotesContent] = useState("");
  const { id } = useParams();
  const [activeRow, setActiveRow] = useState("");
  const [description, setDescription] = useState("");
  const location = useLocation();
  const courseModuleId = location?.pathname.split("/")[3];
  const courseId = location?.pathname.split("/")[5];
  const navigate = useNavigate();

  const filteredModule = data?.modules.find((module) => module?._id === courseModuleId);

  useEffect(() => {
    dispatch(getAll(id));
    dispatch(getModulesProgress(courseModuleId));
  }, [dispatch, id, courseModuleId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeRow) {
        const formData = {
          id: id,
          activeRow,
          courseModuleId,
        };
        dispatch(updateProgress(formData));
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, activeRow, id, courseModuleId]);

  const handleRowClick = (row) => {
    setDescriptionPage(1);
    setActiveRow(row?._id);
    const selectedModule = row;

    if (selectedModule) {
      const descriptionContents = selectedModule?.descriptions?.map((description) => description?.content);
      setSelectedModuleDescription(descriptionContents);
    } else {
      setSelectedModuleDescription([]);
    }
  };

  const [activeTab, setActiveTab] = useState("newnotes");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const prevRow = () => {
    setDescriptionPage(1);
    const currentIndex = filteredModule?.module?.findIndex(
      (module) => module?._id === activeRow
    );

    if (currentIndex > 0) {
      const prevModule = filteredModule?.module[currentIndex - 1];
      setActiveRow(prevModule?._id);
      setSelectedModuleDescription(
        prevModule?.descriptions?.length > 0
          ? prevModule?.descriptions?.map((desc) => desc?.content)
          : []
      );
    }
  };

  const nextRow = () => {
    setDescriptionPage(1);
    const currentIndex = filteredModule?.module?.findIndex(
      (module) => module?._id === activeRow
    );
    if (currentIndex < filteredModule?.module?.length - 1) {
      const nextModule = filteredModule?.module[currentIndex + 1];
      setActiveRow(nextModule?._id);
      setSelectedModuleDescription(
        nextModule?.descriptions?.length > 0
          ? nextModule?.descriptions?.map((desc) => desc?.content)
          : []
      );
    }
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const handleExamClick = (moduleId) => {
    navigate(`/exam/${moduleId}`); // You need to create this route for the exam page
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
      module: activeRow,
      notes: textareaContent,
      tag: activeTag,
    };

    dispatch(editEmployeeNoteById(Id, formData));

    if (activeTab === "newnotes") {
      setNewNotesContent("");
    } else if (activeTab === "savenotes") {
      setSaveNotesContent("");
    }
  };

  const extractedData = progress_list?.map((entry) => ({
    module: entry?.module,
    notes: entry?.notes,
  }));
  const extractedDataED = filteredModule?.module?.map((entry) => ({
    id: entry?._id,
  }));

  const result = extractedData?.map((entry) => {
    const matchingEntry = extractedDataED?.find(
      (edEntry) => edEntry?.id === entry?.module
    );
    return {
      module: entry?.module,
      notes: matchingEntry ? entry.notes : [],
    };
  });

  const [descriptionPage, setDescriptionPage] = useState(1);
  const descriptionItemsPerPage = 1;

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

  const contentRef = useRef(null);

  const toggleFullscreen = () => {
    if (screenfull?.isEnabled && contentRef?.current) {
      screenfull?.toggle(contentRef?.current);
    }
  };

  const calculateCourseProgress = (module_list, courseModuleId) => {
    const modulesForCourse = progress_list?.filter(
      (item) => item?.coursemodule === courseModuleId
    );
    const totalModules = module_list?.length;

    if (!totalModules) {
      return 0;
    }

    const completedModules =
      modulesForCourse?.filter((module) => module?.is_completed)?.length || 0;
    const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2);

    return progressPercentage;
  };

  const filteredProgressList = progress_list.filter((item) => item.is_completed);

  const checkData = filteredProgressList.map((data) => data.module);

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
            <div className="col-lg-3 mt-2">
              <div className="main_tab_content">
                <div className="tab-content">
                  {/* Header for the Module Section */}
                  <div className="mb-2 pt-3 black_bg pr-3 pl-3 pt-1 pb-3 color_white heading_tabs text-center">
                    MODULES
                  </div>

                  {/* Loop through each module and render its details */}
                  {filteredModule?.module?.map((row, index) => (
                    <div
                      key={row?._id}
                      className={`mb-3 pointer ${activeRow === row?._id ? "site_bg color_white ml-1 mr-1" : ""}`}
                      onClick={() => handleRowClick(row)}
                    >
                      {/* Module Row */}
                      <div className="mb-2">
                        <div
                          className={`pt-2 pb-2 ${activeRow === row?._id ? "site_bg color_white" : "white_bg color_black"}`}
                        >
                          {/* Index and Title */}
                          <b className={`pl-3 pr-3 ${activeRow === row?._id ? "site_bg color_white" : "black_bg white_bg"}`}>
                            {index + 1}.
                          </b>
                          &nbsp;
                          <b className="pl-3 pr-3" title={row?.title}>
                            {row?.title?.length > 40 ? row?.title.substring(0, 40) + "..." : row?.title}
                          </b>

                          {/* Checkmark Icon if the Module is Completed */}
                          {checkData.includes(row?._id) && (
                            <i
                              className="fa fa-check-circle"
                              style={{
                                fontSize: "20px",
                                float: "right",
                                margin: "3px 15px 0 0",
                              }}
                            ></i>
                          )}
                        </div>

                        {/* Exam Button */}
                        <div className="text-right mt-2">
                          <button
                            className="btn btn-success"
                            onClick={() => handleExamClick(row?._id)}
                          >
                            Take Exam
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="col-lg-6 mt-2">
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                    {data?.name}
                    <button
                      className="color_white"
                      onClick={toggleFullscreen}
                      disabled={activeRow === ""}
                      style={{
                        float: "right",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                      }}>
                      &nbsp;<i className="fas fa-search-plus"></i>
                    </button>
                  </div>
                  <div
                    style={{ minHeight: "400px" }}
                    className="module-description"
                    ref={contentRef}>
                    <div
                      className="description white_bg p-3"
                      style={{ minHeight: "400px" }}>
                      {description}
                      {currentDescriptions &&
                        currentDescriptions?.length > 0 &&
                        currentDescriptions?.map((desc, index) => (
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: desc }}></div>
                        ))}
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

                    <div className="courses_progress white_bg p-3 mt-3">
                      <div className="progress_view">
                        <div className="row">
                          <div className="col-lg-2 mt-3">
                            <b className="color_orange">Module Progress</b>
                          </div>
                          <div className="col-lg-10">
                            <label>
                              <span>
                                {calculateCourseProgress(
                                  filteredModule?.module,
                                  courseModuleId
                                )}{" "}
                                %
                              </span>
                            </label>
                            <div className="progress" style={{ width: "100%" }}>
                              <div
                                className="progress-bar orange"
                                style={{
                                  width: `${calculateCourseProgress(
                                    filteredModule?.module,
                                    courseModuleId
                                  )}%`,
                                }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Exam Component here */}
                    <div className="exam-section white_bg p-3 mt-3">
                      <h4>Module Exam</h4>
                      <p>After completing the module, please take this short exam:</p>
                      <ul>
                        <li>Question 1: [Add question here]</li>
                        <li>Question 2: [Add question here]</li>
                        <li>Question 3: [Add question here]</li>
                      </ul>
                      <button className="btn btn-primary mt-2">Submit Exam</button>
                    </div>

                    <div className="col-lg-12">
                      <div className="row black_bg mt-4 p-2">
                        <div className="col-lg-6">
                          <p
                            className="color_white"
                            onClick={prevRow}
                            style={{ float: "left", cursor: "pointer" }}>
                            <i className="fas fa-solid fa-chevron-left"></i>{" "}
                            &nbsp; Previous
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p
                            className="color_white"
                            onClick={nextRow}
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

            <div className="col-lg-3 mt-2">
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
                        disabled={activeRow === ""}>
                        Save
                      </button>
                    </div>
                    <div className="white_bg mt-4 p-2">
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
                    <div className="rgst_form p-3">
                      <div className="additional-links">
                        <textarea
                          style={{
                            height: "200px",
                            width: "100%",
                            border: "1px solid white",
                          }}
                          placeholder="Saved Notes"
                          value={
                            result
                              .find((entry) => entry?.module === activeRow)
                              ?.notes?.map((note) => note.note)
                              .join("\n") || ""
                          }
                          readOnly></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmpModulesIndex;
