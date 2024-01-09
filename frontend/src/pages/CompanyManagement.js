import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../redux/actions/companyActions.js";

const defaultFilter = {
  page: 1,
  pageSize: 10,
};

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(defaultFilter);
  const [list, setList] = useState([]);
  const companyReducer = useSelector(({ company }) => company);

  useEffect(() => {
    setFilter(defaultFilter);
    dispatch(getAllCompanies(filter));
    setList(companyReducer?.list?.data);
  }, []);

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                {/* <div className="search_course mb-3">
                  <input
                    type="text"
                    name=""
                    placeholder="Search Employee"
                    className="box_shadow"
                  />
                  <i className="fas fa-search"></i>
                </div> */}
                <h3 className="mb-4 p-2 site_bg color_white">COMPANIES</h3>
                <div className="forum_table white_bg p-3">
                 
                  <table className="full_width white_bg">
                    <thead>
                      <tr className="black_bg">
                        <th className="color_white">Name</th>
                        <th className="color_white">Email</th>
                        <th className="text-center color_white">Address</th>
                        <th className="text-center color_white">Country</th>
                        <th className="text-center color_white">Pin Code</th>
                        <th className="text-center color_white">Active</th>
                        <th className="text-center color_white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="white_bg">
                        <td
                          className="p-0"
                          colSpan="6"
                          style={{ height: "5px" }}
                        ></td>
                      </tr>

                      {list.map((company) => {
                        return (
                          <tr>
                            <td className="">{company?.company_name}</td>
                            <td className="">{company?.email}</td>
                            <td className="text-center">{company?.address}</td>
                            <td className="text-center">{company?.country}</td>
                            <td className="text-center">
                              {company?.post_code}
                            </td>
                            <td className="text-center">
                              {company?.is_active ? "Yes" : "No"}
                            </td>
                            <td className="text-center">
                              <i className="fas fa-edit"></i>
                              <i className="fas fa-trash ml-3"></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* <div className="modal fade fourm_modal" id="myModal">
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
                          <div className="row"></div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form_filed mb-3">
                                <div className="input_fields_wrap">
                                  <label>Attachment</label>
                                  <input
                                    type="file"
                                    name=""
                                    onChange={(f) => selectFile(f)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="green_bg color_white"
                            // onClick={onFileUpload}
                            onClick={(e) => onFileUpload(e)}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="view_post p-3 mb-3 white_bg">
                  <div className="course_form mt-4">
                    <form className="p-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="d-block mb-2">Course</label>
                            <select className="full_width">
                              <option>Energy</option>
                              <option>Waste</option>
                              <option>Water</option>
                              <option>Travel</option>
                              <option>Resource Use</option>
                              <option>Biodiversity</option>
                              <option>Employee Engagement</option>
                              <option>Working Conditions</option>
                              <option>Community and Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Title</label>
                            <input
                              className="full_width"
                              type="text"
                              name=""
                              placeholder="Enter the title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Message</label>
                            <textarea className="full_width"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-3">
                            <label className="d-block mb-2">Attatchment</label>
                            <input
                              className="full_width"
                              type="file"
                              name=""
                              placeholder="Choose file"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-btn mb-3">
                            <button type="button" className="color_white green_bg">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyManagement;
