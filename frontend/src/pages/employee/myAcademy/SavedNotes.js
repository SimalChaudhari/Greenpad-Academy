import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SubLayout from "./SubLayout";

const SavedNotes = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.employeeCourses);
  const progressList = useSelector(
    (state) => state.employeemodule?.progress_list || []
  );

  const [openNoteIndex, setOpenNoteIndex] = useState(null);

  const navigatePage = (path) => {
    navigate(path);
  };

  const mergeProgressWithModules = () => {
    if (!courses) return [];

    return courses.list.data.map((course, courseIndex) => {
      const modulesWithProgress = course.modules.map((module, moduleIndex) => {
        const modulesWithProgress1 = module.module.map((data) => {
          const moduleProgress = progressList.find(
            (progress) => progress.module === data._id
          );
          return {
            ...data,
            progress: moduleProgress || {},
          };
        });
        return {
          module: modulesWithProgress1,
          module_title: module.module_title,
          _id: module._id,
        };
      });
      return {
        ...course,
        modules: modulesWithProgress,
      };
    });
  };

  const mergedData = mergeProgressWithModules();

  const handleNoteClick = (courseIndex, moduleIndex, moduleIndex1) => {
    setOpenNoteIndex({ courseIndex, moduleIndex, moduleIndex1 });
  };

  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              Saved Notes
            </div>

            <div className="notes_box mb-2">
              <div id="accordion-notes" className="notes_accordion">
                {mergedData.map((course, courseIndex) => (
                  <div className="card mb-3" key={courseIndex}>
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href={`#notes${courseIndex}`}>
                        C00{courseIndex + 1} - {course?.name}
                        <i className="fas fa-angle-down"></i>
                      </a>
                    </div>
                    <div
                      id={`notes${courseIndex}`}
                      className="collapse"
                      data-parent="#accordion-notes">
                      <div className="card-body p-0">
                        <div
                          id={`accordion-${courseIndex}`}
                          className="notes_inner">
                          {course.modules.map((module, moduleIndex) => (
                            <div className="card" key={moduleIndex}>
                              <div className="card-header">
                                <a
                                  className="collapsed card-link"
                                  data-toggle="collapse"
                                  href={`#notes${courseIndex}${moduleIndex}`}>
                                  CM0{moduleIndex + 1} - {module?.module_title}
                                  <i className="fas fa-angle-down"></i>
                                </a>
                              </div>
                              <div
                                id={`notes${courseIndex}${moduleIndex}`}
                                className={`collapse ${
                                  moduleIndex === 0 ? "show" : ""
                                }`}
                                data-parent={`#accordion-${courseIndex}`}>
                                <div
                                  className="card-body p-3"
                                  style={{ border: "2px solid #d7d7d7" }}>
                                  {module.module.length > 0
                                    ? module.module.map(
                                        (module, moduleIndex1) => (
                                          <div
                                            className="card"
                                            key={moduleIndex1}>
                                            <div className="card-header p-3">
                                              <a
                                                className="collapsed card-link"
                                                data-toggle="collapse"
                                                href={`#notes${courseIndex}${moduleIndex}${moduleIndex1}`}
                                                onClick={() =>
                                                  handleNoteClick(
                                                    courseIndex,
                                                    moduleIndex,
                                                    moduleIndex1
                                                  )
                                                }
                                                >
                                                M0{moduleIndex1 + 1} -{" "}
                                                {module?.title}
                                                {/* <i className="fas fa-angle-down"></i> */}
                                              </a>
                                            </div>
                                            <div
                                              className="notes_item"
                                              key={moduleIndex1}>
                                              {module.progress.notes?.length >
                                              0 ? (
                                                module.progress.notes.map(
                                                  (note, noteIndex) => (
                                                    <div
                                                      className={`notes_view white_bg ${
                                                        openNoteIndex &&
                                                        openNoteIndex.courseIndex ===
                                                          courseIndex &&
                                                        openNoteIndex.moduleIndex ===
                                                          moduleIndex &&
                                                        openNoteIndex.moduleIndex1 ===
                                                          moduleIndex1
                                                          ? "show"
                                                          : ""
                                                      }`}
                                                      key={noteIndex}
                                                      style={{
                                                        borderBottom:
                                                          "2px solid #d7d7d7",
                                                      }}>
                                                      <div className="notes_text pl-3 pt-2 mt-1 ">
                                                        {noteIndex + 1} :{" "}
                                                        {note.note}
                                                      </div>
                                                      <div className="notes_created text-center">
                                                        Date Created
                                                        <br />
                                                        {moment(
                                                          note.date_created
                                                        ).format("DD / MM / Y")}
                                                      </div>
                                                      <div className="notes_created text-center">
                                                        Date Edited
                                                        <br />
                                                        {moment(
                                                          note.date_updated
                                                        ).format("DD / MM / Y")}
                                                      </div>
                                                      <div className="notes_created text-center">
                                                        Tags
                                                        <br />
                                                        <span
                                                          className={`${note.tag} notes_dot`}></span>{" "}
                                                      </div>
                                                    </div>
                                                  )
                                                )
                                              ) : (
                                                <div
                                                  className={`notes_view ${
                                                    openNoteIndex &&
                                                    openNoteIndex.courseIndex ===
                                                      courseIndex &&
                                                    openNoteIndex.moduleIndex ===
                                                      moduleIndex &&
                                                    openNoteIndex.moduleIndex1 ===
                                                      moduleIndex1
                                                      ? "show"
                                                      : ""
                                                  }`}>
                                                  <div
                                                    className="notes_text pl-3 pt-2 pb-2 white_bg"
                                                    style={{ width: "100%" }}>
                                                    No notes saved
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )
                                    : "Module Not Found"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default SavedNotes;
