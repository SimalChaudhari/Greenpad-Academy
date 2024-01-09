import React from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "./SubLayout";
import { useSelector } from "react-redux";

const SustainablePlan = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.employeeCourses);

  const navigatePage = (path) => {
    navigate(path);
  };

  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              SUSTAINABLE DEVELOPMENT PLAN
            </div>

            {courses?.list?.data &&
              courses?.list?.data?.map((item, index) => {
                return (
                  <div className="sustainable_plan mb-3">
                    <h6>C00{index + 1} - {item?.name}</h6>
                    <div className="sustainable white_bg p-3 mb-2">
                      <table width="100%">
                        <tr>
                          <td>
                            <select>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                            </select>
                          </td>
                          <td className="text-center">
                            Word Count
                            <br />
                            <span>3,500</span>
                          </td>
                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25 / 02</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="sustainable white_bg p-3">
                      <table width="100%">
                        <tr>
                          <td>
                            <select>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                              <option>
                                First Essay on Sustainability in Major Cities
                              </option>
                            </select>
                          </td>
                          <td className="text-center">
                            Word Count
                            <br />
                            <span>3,500</span>
                          </td>
                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25 / 02</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                )
              })}

          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default SustainablePlan;
