import React from "react";
import Layout from "../../../Components/Layout";

const Forum = () => {
  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                <div className="search_course mb-3">
                  <input
                    type="text"
                    name=""
                    placeholder="Search Course"
                    className="box_shadow"
                  />
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="mb-4 p-2 site_bg color_white">FORUM</h3>
                <div className="forum_table white_bg p-3">
                  <div className="add_couses mb-3">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="color_white green_bg d-inline-block"
                    >
                      Post a Question
                    </a>
                  </div>
                  <table className="full_width white_bg">
                    <tr className="black_bg">
                      <th className="color_white">Course Name</th>
                      <th className="text-center color_white">User Name</th>
                      <th className="text-center color_white">Role</th>
                      <th className="text-center color_white">Dept.</th>
                      <th className="text-center color_white">Topics</th>
                      <th className="text-center color_white">Tittle</th>
                      <th className="text-center color_white">Message</th>
                      <th className="text-center color_white">Date</th>
                      <th className="text-center color_white">Time</th>
                      <th className="text-center color_white">Replies</th>
                    </tr>
                    <tr className="white_bg">
                      <td
                        className="p-0"
                        colspan="6"
                        style={{ height: "5px" }}
                      ></td>
                    </tr>

                    <tr>
                      <td>
                        <a href="topic.html">Learning with greenpad academy</a>
                      </td>
                      <td className="text-center">ajia z. (zakajia)</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">20-09-2019</td>
                      <td className="text-center">08:43:59</td>
                      <td className="text-center">10</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="topic.html">Innovation and Sustainability</a>
                      </td>
                      <td className="text-center">Jhon</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">20-09-2019</td>
                      <td className="text-center">08:43:59</td>
                      <td className="text-center">10</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="topic.html">
                          Entrepreneurship and Sustainability
                        </a>
                      </td>
                      <td className="text-center">Smith</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">20-09-2019</td>
                      <td className="text-center">08:43:59</td>
                      <td className="text-center">10</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="topic.html">
                          Impacts Creation and Sustainability
                        </a>
                      </td>
                      <td className="text-center">Manish</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">xxx</td>
                      <td className="text-center">20-09-2019</td>
                      <td className="text-center">08:43:59</td>
                      <td className="text-center">10</td>
                    </tr>
                  </table>
                </div>

                <div className="modal fade fourm_modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header site_bg">
                        <h4 className="modal-title color_white"></h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <form className="p-3 white_bg form_part">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="select_topic mb-3">
                                <label>Course</label>
                                <select>
                                  <option>
                                    Learning with greenpad academy
                                  </option>
                                  <option>Innovation and Sustainability</option>
                                  <option>
                                    Entrepreneurship and Sustainability
                                  </option>
                                  <option>
                                    Impacts Creation and Sustainability
                                  </option>
                                  <option>
                                    Sustainability Innovation and Management
                                  </option>
                                  <option>
                                    Sustainability Innovation and leadership
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="select_topic mb-3">
                                <label>Search Topic</label>
                                <select>
                                  <option>energy</option>
                                  <option>waste</option>
                                  <option>water</option>
                                  <option>carbon</option>
                                  <option>resource use</option>
                                  <option>transport</option>
                                  <option>biodiversity</option>
                                  <option>working conditions</option>
                                  <option>stakeholder engagament</option>
                                  <option>communities</option>
                                  <option>others</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <label>Tittle</label>
                                <input
                                  type="text"
                                  name=""
                                  placeholder="Enter The Tittle"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <label>Message</label>
                                <textarea></textarea>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <div className="input_fields_wrap">
                                  <label>Attachment</label>
                                  <input type="file" name="" />
                                </div>
                                <button className="add_field_button">
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <button className="green_bg color_white">
                            Submit
                          </button>
                        </form>
                      </div>
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

export default Forum;
