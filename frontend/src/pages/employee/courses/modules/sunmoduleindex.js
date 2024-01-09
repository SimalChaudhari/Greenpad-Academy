import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  updateProgress,
  getModulesProgress,
  editEmployeeNoteById,
  deleteEmployeeNoteById,
} from "../../../../redux/actions/employee/modulesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../../../Components/Layout";
import { toast } from "react-toastify";
import screenfull from "screenfull";
import { DeleteModel } from "../../../../Components/index";
import { IMAGE_URL } from "../../../../config/config";
import Edit from "./Edit";
import "./module.css";

const EmpCourseModulesIndex = () => {
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);
  const authId = useSelector((state) => state?.auth?.user);
  const progress_list = useSelector(
    (state) => state?.employeemodule?.progress_list || []
  );
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

  const mergeProgressWithModules = () => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((course) => {
      return {
        ...course,
        progress_list: progress_list,
      };
    });
  };

  const mergedData = mergeProgressWithModules();

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
        // console.log('formData: ', formData);
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

    if (
      selectedModule
      // &&
      // Array.isArray(selectedModule?.descriptions) &&
      // selectedModule?.descriptions?.length > 0
    ) {
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
    // const modulesForCourse = progress_list?.filter(
    //   (item) => item?.coursemodule === courseModuleId
    //   );
    const totalModules = module_list?.length;

    if (!totalModules) {
      return 0; // Return 0 if there are no modules in the course
    }

    const completedModules =
      progress_list?.filter((module) => module?.is_completed)?.length || 0;
      const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2); // Limit to 2 decimal places

    return progressPercentage;
  };

  // Check Data
  const filteredProgressList = progress_list?.filter(
    (item) => item?.is_completed
  );

  const checkData = filteredProgressList?.map((data) => data?.module);

  const contentRef = useRef(null);

  // const toggleFullscreen = () => {
  //   if (screenfull?.isEnabled && contentRef?.current) {
  //     screenfull?.toggle(contentRef?.current);
  //     setZoomed(isZoomed === true ? false : true);
  //   }
  // };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (screenfull.isEnabled && contentRef.current) {
        setZoomed(screenfull.isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullScreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullScreenChange);
      }
    };
  }, [isZoomed]);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && contentRef.current) {
      screenfull.toggle(contentRef.current);
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
    var formData = {
      data: note,
      courseId: courseId,
    };
    // Rest of your code...
  };

  const handleCloseModal = () => {
    // Define the actions you want to perform when closing the modal
    setDeleteModalOpen(false);
    // Additional actions...
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
            <div
              className="col-lg-3 mt-2"
              style={{
                maxHeight: "720px",
                minHeight: "400px",
                overflowY: "scroll",
              }}>
              <div className="main_tab_content">
                <div className="tab-content">
                  <div className="mb-2 pt-3 black_bg pr-3 pl-3 pt-1 pb-3 color_white heading_tabs text-center">
                    CHAPTERS
                  </div>
                  <div></div>

                  {data?.modules?.map((row, index) => (
                    <div key={row?._id}>
                      <div
                        onClick={() => toggleModule(row)}
                        className={`${
                          activeRow === row?._id
                            ? "mb-3 site_bg color_white pointer"
                            : "mb-3 pointer"
                        }`}>
                        <div
                          className={`${
                            activeRow === row?._id
                              ? "pt-2 pb-2 site_bg color_white "
                              : "white_bg color_black pt-2 pb-2"
                          }`}>
                          <div className="row">
                            <div className="col-sm-1">
                              <b
                                className={`${
                                  activeRow === row?._id
                                    ? "pt-2 pb-2 site_bg color_white pl-3 pr-3"
                                    : "white_bg color_white black_bg pl-3 pr-3 pt-2 pb-2"
                                }`}>
                                {index + 1}.
                              </b>{" "}
                            </div>
                            <div className="col-sm-11">
                              &nbsp;
                              <b
                                className="pl-3 pr-3"
                                title={row?.module_title}>
                                {row?.module_title?.length > 40
                                  ? row?.module_title.substring(0, 40) + "..."
                                  : row?.module_title}
                              </b>{" "}
                            </div>
                          </div>
                          <b>
                            {/* <a
                              href="#"
                              style={{ color: "green", float: "right" }}
                              className="pr-4"
                              onClick={() => {
                                navigatePage(
                                  `/employee/modules/${row._id}/courses/${courseId}`
                                );
                              }}>
                              <i className="fas fa-file-alt"></i> Open
                            </a> */}
                          </b>
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
                                className={`${
                                  activeModuleRow === row?._id
                                    ? checkData.includes(row?._id)
                                      ? "pt-2 pb-2 green_bg color_white pl-3 pr-3"
                                      : "pt-2 pb-2 site_bg color_white pl-3 pr-3"
                                    : "white_bg color_black pl-3 pr-3 pt-2 pb-2"
                                }`}>
                                {index + 1} :{/* {row?.title} */}
                                {row?.title?.length > 45
                                  ? row?.title.substring(0, 45) + "..."
                                  : row?.title}
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
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-2">
              <div className="col-lg-12">
                <div className="main_tab_content">
                  <div className="tab-content">
                    <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
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
                      // style={{ minHeight: "1200px" }}
                      className="module-description"
                      ref={contentRef}>
                      {isZoomed ? (
                        <>
                          <div className="mb-2 mt-5 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs text-center">
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
                                &nbsp;<i className="fas fa-search-minus"></i>
                              </button>
                            </div>
                            {data?.name}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      <div
                        className={
                          isZoomed
                            ? "description1 white_bg p-3 text-center"
                            : "description white_bg p-3 text-center"
                        }
                        // className="description white_bg p-3 text-center"
                        // style={{ minHeight: "400px" }}
                      >
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
                            {currentDescriptions &&
                              currentDescriptions?.length > 0 &&
                              currentDescriptions?.map((desc, index) => (
                                <div
                                  className={isZoomed ? "zoomed_disc" : ""}
                                  key={index}
                                  dangerouslySetInnerHTML={{
                                    __html: desc,
                                  }}></div>
                              ))}
                          </>
                        )}
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
                            className={`round-border ${
                              descriptionPage === index + 1 ? "active" : ""
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
                                  allModuleDecription,
                                  courseId,
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

                    {/* <div
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
                            className={`round-border ${
                              descriptionPage === index + 1 ? "active" : ""
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
                                  allModuleDecription,
                                  courseId,
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
                    </div> */}
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
                        className={`nav-link ${
                          activeTab === "newnotes"
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
                        className={`nav-link ${
                          activeTab === "savenotes"
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
                    className={`tab-pane container p-0 ${
                      activeTab === "newnotes" ? "active" : ""
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
                      className={`white_bg mt-4 pl-4 pt-3 pb-2 ${
                        activeRowModule === "" ? "disabled" : ""
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
                        className={`green_bg add_notes_dot ml-3 ${
                          activeTag === "green" ? "add_notes_dot_active" : ""
                        }`}
                        onClick={() => handleTagClick("green")}>
                        &nbsp;
                      </span>{" "}
                      <span
                        className={`orange add_notes_dot ml-3 ${
                          activeTag === "orange" ? "add_notes_dot_active" : ""
                        }`}
                        onClick={() => handleTagClick("orange")}>
                        &nbsp;
                      </span>{" "}
                      <span
                        className={`purple add_notes_dot ml-3 ${
                          activeTag === "purple" ? "add_notes_dot_active" : ""
                        }`}
                        onClick={() => handleTagClick("purple")}>
                        &nbsp;
                      </span>{" "}
                      <span
                        className={`bg-primary add_notes_dot ml-3 ${
                          activeTag === "bg-primary"
                            ? "add_notes_dot_active"
                            : ""
                        }`}
                        onClick={() => handleTagClick("bg-primary")}>
                        &nbsp;
                      </span>{" "}
                    </div>
                  </div>
                  <div
                    className={`tab-pane container p-0 ${
                      activeTab === "savenotes" ? "active" : ""
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
