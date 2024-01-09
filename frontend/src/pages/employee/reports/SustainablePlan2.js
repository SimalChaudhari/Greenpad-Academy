import React, { useEffect } from "react";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fatchPlans } from "../../../redux/actions/Plans/plansActions";
import { IMAGE_URL } from "../../../config/config";
import SubMenu from "./SubMenu";
const moment = require("moment");

const SustainablePlan2 = () => {
  const dispatch = useDispatch();

  const plansReducer = useSelector((state) => state?.plans);

  useEffect(() => {
      dispatch(fatchPlans());
  }, []);

  return (
    <Layout>
      <section className="reports grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
          <SubMenu />
            {/* <div className="col-lg-9">
              <div className="sustainable_plan-new">
                <div className="sustainable_plan">
                  <h4 className="site_bg color_white text-uppercase mb-3 p-2">
                    Final Sustainable Development Plan
                  </h4>
                  <div className="sustainable white_bg p-3 mb-2">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <select>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                              <option>
                                Final Sustainable Development Plan
                              </option>
                            </select>
                          </td>

                          <td className="text-center">
                            Submission
                            <br />
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </td>
                          <td className="text-center">
                            Due date
                            <br />
                            <span>25/02/2019</span>
                          </td>
                          <td className="text-center">
                            Submit
                            <br />
                            <button className="green_bg color_white">
                              Download
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-lg-9">
              <div className="sustainable_plan-new">
                <div className="sustainable_plan">
                  <h4 className="site_bg color_white text-uppercase mb-3 p-2">
                    Final Sustainable Development Plan
                  </h4>
                  <div className="sustainable white_bg p-3 mb-2">
                    <table width="100%">
                      <tbody>
                        {plansReducer?.list?.data?.length > 0 ? (
                          plansReducer?.list?.data?.map((plan, index) => (
                            <tr key={plan?._id}>
                              <td>{plan?.title}</td>
                              <td className="text-center">
                                Submission
                                <br />
                                <i
                                  className="fa fa-times"
                                  aria-hidden="true"></i>
                              </td>
                              <td className="text-center">
                                Due date
                                <br />
                                <span>
                                  {moment(plan?.created_at).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </td>
                              <td className="text-center">
                                Submit
                                <br />
                                <a
                                  href={`${IMAGE_URL}/${plan?.pdffile}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <button className="green_bg color_white">
                                    Download
                                  </button>
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-center" colSpan="4"><b>No plans have been added.</b></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default SustainablePlan2;
