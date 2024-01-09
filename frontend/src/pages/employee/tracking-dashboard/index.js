import React from "react";
import Layout from "../../../Components/Layout";

const TrackingDashboard = () => {
    return (
        <Layout>
            <section className="tracking_dashboard grey_bg pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                TRACKING DASHBOARD
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="t_dashboard_left">
                                        <div className="quries_box">
                                            <h5 className="mb-3">MESSAGES & QUERIES</h5>
                                            <table width="100%" className="box_shadow">
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <span className="dots red"></span>
                                                    </td>
                                                    <td className="p-2">
                                                        <b>
                                                            DOE Joe<i className="far fa-hand-point-up"></i>
                                                        </b>
                                                        <br />
                                                        <label>RE: COURSES - Ref#: 1092</label>
                                                    </td>
                                                    <td className="text-right p-2">
                                                        <p>15:41</p>
                                                        <span className="site_color">unresolved</span>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <span className="dots red"></span>
                                                    </td>
                                                    <td className="p-2">
                                                        <b>
                                                            DOE Joe<i className="far fa-hand-point-up"></i>
                                                        </b>
                                                        <br />
                                                        <label>RE: SYSTEM - Ref#: 1092</label>
                                                    </td>
                                                    <td className="text-right p-2">
                                                        <p>10:27</p>
                                                        <span className="site_color">unresolved</span>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <span className="dots"></span>
                                                    </td>
                                                    <td className="p-2">
                                                        <b>DOE Joe</b>
                                                        <br />
                                                        <label>RE: OTHER</label>
                                                    </td>
                                                    <td className="text-right p-2">
                                                        <p>Yesterday</p>
                                                        <span className="green_color">resolved</span>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <span className="dots"></span>
                                                    </td>
                                                    <td className="p-2">
                                                        <b>DOE Joe</b>
                                                        <br />
                                                        <label>RE: OTHER</label>
                                                    </td>
                                                    <td className="text-right p-2">
                                                        <p>Yesterday</p>
                                                        <span className="green_color">resolved</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            <div className="read_quaries text-right mt-2">
                                                <a href="#">
                                                    <i>Read all Messages & Queries</i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="course_surveys">
                                            <h5 className="mb-3 mt-3">COURSE SURVEYS</h5>
                                            <table className="tracking_table box_shadow" width="100%">
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        PRE - Organisational Sustainability, Management and
                                                        Leadership
                                                    </td>
                                                    <td className="p-3">12/01</td>
                                                    <td className="p-3">
                                                        <button className="green_bg">Complete</button>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        POST - Organisational Sustainability, Management and
                                                        Leadership
                                                    </td>
                                                    <td className="p-3">12/01</td>
                                                    <td className="p-3">
                                                        <button className="green_bg">Complete</button>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        PRE - Youth Sustainability, Innovation and
                                                        Leadership
                                                    </td>
                                                    <td className="p-3">12/01</td>
                                                    <td className="p-3">
                                                        <button className="dark_grey">Incomplete</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="course_surveys">
                                            <h5 className="mb-3 mt-3">CERTIFICATES</h5>
                                            <table className="tracking_table box_shadow" width="100%">
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        Programme in Organisational Sustainability,
                                                        Management and Leadership Programme
                                                    </td>

                                                    <td className="p-3">
                                                        <button className="green_bg">Complete</button>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        Programme in Engineering Sustainability and
                                                        Management Programme
                                                    </td>

                                                    <td className="p-3">
                                                        <button className="dark_grey">Incomplete</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="t_dashboard_right">
                                        <div className="status_table">
                                            <h5 className="mb-3">MY STATUS</h5>
                                            <table className="white_bg box_shadow" width="100%">
                                                <tr>
                                                    <td className="p-3">
                                                        <b>Student Status</b>
                                                    </td>
                                                    <td className="p-3">Enrolled</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3">
                                                        <b>Programme Session</b>
                                                    </td>
                                                    <td className="p-3">2018 / 2019</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3">
                                                        <b>Training mode</b>
                                                    </td>
                                                    <td className="p-3">Online</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3">
                                                        <b>Fee Status</b>
                                                    </td>
                                                    <td className="site_color p-3">Outstanding</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="status_table">
                                            <h5 className="mb-3 mt-3">COURSE PROGRESS</h5>
                                            <div className="white_bg" width="100%">
                                                <div className="course_progress box_shadow">
                                                    <div className="star_date text-center p-2">
                                                        <b>Start Date</b>
                                                        08/01/19
                                                    </div>
                                                    <div className="end_date text-center p-2">
                                                        <b>End Date</b>
                                                        01/04/19
                                                    </div>
                                                    <div className="c_progress text-center p-2">
                                                        <span className="progres_text">
                                                            Progress<i>82%</i>
                                                        </span>
                                                        <div className="progress mt-2">
                                                            <div
                                                                className="progress-bar orange"
                                                                style={{ width: "82%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="c_progress text-center p-2">
                                                        <span className="progres_text">
                                                            Time left<i>7 days</i>
                                                        </span>
                                                        <div className="progress mt-2">
                                                            <div
                                                                className="progress-bar red"
                                                                style={{ width: "82%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="t_results">
                                            <h5 className="mb-3 mt-3">RESULTS</h5>
                                            <table className="tracking_table box_shadow" width="100%">
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        Third Exam on Sustainability Environments
                                                    </td>
                                                    <td className="p-3">
                                                        <button className="green_bg">Complete</button>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        Second Exam on Leadership
                                                    </td>
                                                    <td className="p-3">
                                                        <button className="dark_grey">Incomplete</button>
                                                    </td>
                                                </tr>
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        First Exam on Sustainability in Major Cities
                                                    </td>
                                                    <td className="p-3">
                                                        <button className="dark_grey">Incomplete</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="t_results">
                                            <h5 className="mb-3 mt-3">
                                                SUSTAINABLE DEVELOPMENT PLAN
                                            </h5>
                                            <table className="tracking_table box_shadow" width="100%">
                                                <tr className="white_bg">
                                                    <td className="pl-2">
                                                        <input type="checkbox" name="" />
                                                    </td>
                                                    <td className="pt-3 pb-3 pl-2 pr-2">
                                                        Sustainable Development Plan
                                                    </td>
                                                    <td className="p-3">
                                                        <button className="dark_grey">Incomplete</button>
                                                    </td>
                                                </tr>
                                            </table>
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

export default TrackingDashboard;
