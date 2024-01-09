// import React from "react";
import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { useNavigate } from "react-router-dom";
import SubLayout from "./SubLayout";
import { useSelector } from "react-redux";
const moment = require('moment');

const SavedNotes = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.employeeCourses);

  const progress_list = useSelector(
    (state) => state.employeemodule?.progress_list || []
    );

  const navigatePage = (path) => {
    navigate(path);
  };

  const mergedData = courses?.list?.data?.map((course) => {
    const modulesWithProgress = course.modules.map((module) => {
      const moduleProgress = progress_list.find(
        (progress) => progress.module === module._id
        );
        
        return {
          ...module,
          progress: moduleProgress || {},
        };
      });
      
      return {
      ...course,
      modules: modulesWithProgress,
    };
  });


  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              Saved Notes
              {/* <div className="drop_message pl-5">
                <a href="#" className="color_white recent_btn">
                  Most Recent<i className="fas fa-angle-down"></i>
                </a>
                <ul className="recent_drop">
                  <li>
                    <a href="#">dsfsda</a>
                  </li>
                  <li>
                    <a href="#">dsfsda</a>
                  </li>
                  <li>
                    <a href="#">dsfsda</a>
                  </li>
                  <li>
                    <a href="#">dsfsda</a>
                  </li>
                </ul>
              </div> */}
            </div>

            {/* <div className="create_notes mb-2">
              <form>
                <input type="text" name="" placeholder="Create a new notes" />
                <i className="fas fa-edit"></i>
              </form>
            </div> */}

            <div className="notes_box mb-2">
              <div id="accordion-notes" className="notes_accordion">
                {mergedData?.map((course, courseIndex) => (
                  <div className="card mb-3" key={courseIndex}>
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href={`#notes${courseIndex}`}
                      >
                        C00{courseIndex + 1} - {course?.name}
                        <i className="fas fa-angle-down"></i>
                      </a>
                    </div>
                    <div
                      id={`notes${courseIndex}`}
                      className="collapse"
                      data-parent="#accordion-notes"
                    >
                      <div className="card-body p-0">
                        <div
                          id={`accordion-${courseIndex}`}
                          className="notes_inner"
                        >
                          {course?.modules?.map((module, moduleIndex) => (
                            <div className="card" key={moduleIndex}>
                              <div className="card-header">
                                <a
                                  className="collapsed card-link"
                                  data-toggle="collapse"
                                  href={`#notes${courseIndex}${moduleIndex}`}
                                >
                                  M0{moduleIndex + 1} - {module?.title}
                                  <i className="fas fa-angle-down"></i>
                                </a>
                              </div>
                              <div
                                id={`notes${courseIndex}${moduleIndex}`}
                                className={`collapse ${
                                  moduleIndex === 0 ? "show" : ""
                                }`}
                                data-parent={`#accordion-${courseIndex}`}
                              >
                                <div className="card-body">
                                  {module?.progress?.notes?.length > 0 ? (
                                    module?.progress?.notes?.map(
                                      (note, noteIndex) => (
                                        <div
                                          className="notes_view mb-2 pt-2 pb-2 white_bg"
                                          key={noteIndex}
                                        >
                                          <div className="notes_text pl-3 pt-2">
                                            {note?.note}
                                          </div>
                                          <div className="notes_created text-center">
                                            Date Created
                                            <br />
                                            {moment(note?.date_created).format(' DD / MM ')}
                                          </div>
                                          <div className="notes_created text-center">
                                            Date Edited
                                            <br />
                                            {moment(note?.date_updated).format(' DD / MM ')}
                                          </div>
                                          <div className="notes_created text-center">
                                            Tags
                                            <br />
                                            <span className={`${note?.tag} notes_dot`}></span>{" "}
                                          </div>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                      <div className="notes_text pl-3 pt-2">
                                        No notes saved
                                      </div>
                                    </div>
                                  )}
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
