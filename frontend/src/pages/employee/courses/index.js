import React from "react";
import Layout from "../../../Components/Layout";
import { useNavigate } from "react-router-dom";

const Course = () => {
    const navigate = useNavigate();

    const navigatePage = (path) => {
        navigate(path);
    };

    return (
        <Layout>
            <section className="enrolled_courses grey_bg pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="main_tabs">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item mb-2">
                                        <a
                                            className="nav-link active white_bg"
                                            onClick={() => {
                                                navigatePage("/my-academy");
                                            }}
                                        >
                                            <i className="fas fa-pencil-alt"></i>My Courses
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a
                                            className="nav-link white_bg"
                                            onClick={() => {
                                                navigatePage("/reading");
                                            }}
                                        >
                                            <i className="fas fa-book-open"></i>Reading List
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a
                                            className="nav-link white_bg"
                                            onClick={() => {
                                                navigatePage("/saved-notes");
                                            }}
                                        >
                                            <i className="fas fa-book"></i>Saved Notes
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a
                                            className="nav-link white_bg"
                                            onClick={() => {
                                                navigatePage("/sustainable-plan");
                                            }}
                                        >
                                            <i className="far fa-plus-square"></i>Sustainable
                                            Development Plan
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a
                                            className="nav-link white_bg"
                                            onClick={() => {
                                                navigatePage("/my-profile");
                                            }}
                                        >
                                            <i className="far fa-user"></i>My Profile
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="main_tab_content">
                                <div className="tab-content">
                                    <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                        ENROLLED COURSES
                                    </div>
                                    <div id="accordion" className="courses_accordion">
                                        <div className="card mb-2">
                                            <div className="card-header">
                                                <a
                                                    className="card-link"
                                                    data-toggle="collapse"
                                                    href="#collapseOne"
                                                >
                                                    C001 - Organisational Sustainability, Management and
                                                    Leadership Programme
                                                    <i className="fas fa-angle-down"></i>
                                                </a>
                                                <div className="courses_progress">
                                                    <div className="progress_view">
                                                        <label>
                                                            Progress <span>82%</span>
                                                        </label>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar orange"
                                                                style={{ width: "70%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="progress_view">
                                                        <label>
                                                            Time left <span>7 Days</span>
                                                        </label>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar red"
                                                                style={{ width: "70%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className="collapse show"
                                                data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    <h6 className="mb-3">
                                                        <b>Modules</b>
                                                    </h6>
                                                    <ul className="modules_process">
                                                        <li className="mb-2">
                                                            Global Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Innovation and Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Entrepreneurship and Sustainability
                                                            <span>In progress</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Impacts Creation and Sustainability
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and Management
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and leadership
                                                            <span>Pending</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header">
                                                <a
                                                    className="collapsed card-link"
                                                    data-toggle="collapse"
                                                    href="#collapseTwo"
                                                >
                                                    C002 - Youth Sustainability, Innovation and Leadership
                                                    Programme<i className="fas fa-angle-down"></i>
                                                    <div className="courses_progress">
                                                        <div className="progress_view">
                                                            <label>
                                                                Progress <span>82%</span>
                                                            </label>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar orange"
                                                                    style={{ width: "70%" }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="progress_view">
                                                            <label>
                                                                Time left <span>7 Days</span>
                                                            </label>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar red"
                                                                    style={{ width: "70%" }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="collapse"
                                                data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    <h6 className="mb-3">
                                                        <b>Modules</b>
                                                    </h6>
                                                    <ul className="modules_process">
                                                        <li className="mb-2">
                                                            Global Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Innovation and Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Entrepreneurship and Sustainability
                                                            <span>In progress</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Impacts Creation and Sustainability
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and Management
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and leadership
                                                            <span>Pending</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header">
                                                <a
                                                    className="collapsed card-link"
                                                    data-toggle="collapse"
                                                    href="#collapseThree"
                                                >
                                                    C003 - Engineering Sustainability and Management
                                                    <i className="fas fa-angle-down"></i>
                                                </a>
                                                <div className="courses_progress">
                                                    <div className="progress_view">
                                                        <label>
                                                            Progress <span>82%</span>
                                                        </label>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar orange"
                                                                style={{ width: "70%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="progress_view">
                                                        <label>
                                                            Time left <span>7 Days</span>
                                                        </label>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar red"
                                                                style={{ width: "70%" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                className="collapse"
                                                data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    <h6 className="mb-3">
                                                        <b>Modules</b>
                                                    </h6>
                                                    <ul className="modules_process">
                                                        <li className="mb-2">
                                                            Global Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Innovation and Sustainability
                                                            <span>Completed</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Entrepreneurship and Sustainability
                                                            <span>In progress</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Impacts Creation and Sustainability
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and Management
                                                            <span>Pending</span>
                                                        </li>
                                                        <li className="mb-2">
                                                            Sustainability Innovation and leadership
                                                            <span>Pending</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane container fade" id="reading_list">
                                        <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                            READING LISTS
                                        </div>
                                        <div className="reading_box white_bg p-3 mb-2">
                                            <h6 className="mb-3">
                                                <b>
                                                    C001 - Organisational Sustainability, Management and
                                                    Leadership Programme
                                                </b>
                                            </h6>
                                            <table width="100%">
                                                <tr>
                                                    <td className="pb-3">
                                                        Ashford N, Hall R (2018) Technology, Globalization,
                                                        and Sustainable Development:Transforming the
                                                        Industrial State
                                                    </td>
                                                    <td className="pb-3">ISBN 978-3-319-70585-9</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Sanneh E.S (2018) Systems Thinking for Sustainable
                                                        Development{" "}
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138665908</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Benn S., Edwards M., Williams T. (2018)
                                                        Organizational Change for Corporate Sustainability
                                                        4th Edition Routledge{" "}
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138963062</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Robertson M (2018) Communicating Sustainability
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138659282 </td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Konig A., Ravetz J. (ed) (2017) Sustainability
                                                        Science: Key Issues (Key Issues in Environment and
                                                        Sustainability)
                                                    </td>
                                                    <td className="pb-3">ISBN-13:978-1138294868 </td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Clegg S.R , de Matos J.A. (eds) (2017)
                                                        Sustainability and Organizational Change Management
                                                    </td>
                                                    <td className="pb-3">ISBN-978-1-5095-1107-5</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="reading_box white_bg p-3">
                                            <h6 className="mb-3">
                                                <b>
                                                    C003 - Engineering Sustainability and Management
                                                    Programme
                                                </b>
                                            </h6>
                                            <table width="100%">
                                                <tr>
                                                    <td className="pb-3">
                                                        Ashford N, Hall R (2018) Technology, Globalization,
                                                        and Sustainable Development:Transforming the
                                                        Industrial State
                                                    </td>
                                                    <td className="pb-3">ISBN 978-3-319-70585-9</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Sanneh E.S (2018) Systems Thinking for Sustainable
                                                        Development{" "}
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138665908</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Benn S., Edwards M., Williams T. (2018)
                                                        Organizational Change for Corporate Sustainability
                                                        4th Edition Routledge{" "}
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138963062</td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Robertson M (2018) Communicating Sustainability
                                                    </td>
                                                    <td className="pb-3">ISBN-10: 1138659282 </td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Konig A., Ravetz J. (ed) (2017) Sustainability
                                                        Science: Key Issues (Key Issues in Environment and
                                                        Sustainability)
                                                    </td>
                                                    <td className="pb-3">ISBN-13:978-1138294868 </td>
                                                </tr>
                                                <tr>
                                                    <td className="pb-3">
                                                        Clegg S.R , de Matos J.A. (eds) (2017)
                                                        Sustainability and Organizational Change Management
                                                    </td>
                                                    <td className="pb-3">ISBN-978-1-5095-1107-5</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="container tab-pane fade" id="saved_notes">
                                        <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                            Saved Notes
                                            <div className="drop_message pl-5">
                                                <a
                                                    href="#"
                                                    className="color_white recent_btn"
                                                >
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
                                            </div>
                                        </div>
                                        <div className="create_notes mb-2">
                                            <form>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Create a new notes"
                                                />
                                                <i className="fas fa-edit"></i>
                                            </form>
                                        </div>
                                        <div className="notes_box mb-2">
                                            <div id="accordion" className="notes_accordion">
                                                <div className="card mb-3">
                                                    <div className="card-header">
                                                        <a
                                                            className="collapsed card-link"
                                                            data-toggle="collapse"
                                                            href="#notes1"
                                                        >
                                                            C002 - Youth Sustainability, Innovation and
                                                            Leadership Programme
                                                            <i className="fas fa-angle-down"></i>
                                                        </a>
                                                    </div>
                                                    <div
                                                        id="notes1"
                                                        className="collapse"
                                                        data-parent="#accordion"
                                                    >
                                                        <div className="card-body p-0">
                                                            <div id="accordion" className="notes_inner">
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <a
                                                                            className="collapsed card-link"
                                                                            data-toggle="collapse"
                                                                            href="#notes3"
                                                                        >
                                                                            M03 - Entrepreneurship and Sustainability
                                                                            <i className="fas fa-angle-down"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="notes3"
                                                                        className="collapse"
                                                                        data-parent="#accordion"
                                                                    >
                                                                        <div className="card-body">
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    In today's lesson the difference
                                                                                    between the types of leadership was
                                                                                    discussed…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="orange notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Search for “modern sustainability
                                                                                    solutions”
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="bg-primary notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Look for different model of
                                                                                    entrepreneurship online. Who can be an
                                                                                    entreprene…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <a
                                                                            className="collapsed card-link"
                                                                            data-toggle="collapse"
                                                                            href="#notes4"
                                                                        >
                                                                            M06 - Sustainability Innovation and
                                                                            Leadership
                                                                            <i className="fas fa-angle-down"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="notes4"
                                                                        className="collapse"
                                                                        data-parent="#accordion"
                                                                    >
                                                                        <div className="card-body">
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Lorem ipsum dolor sit amet,
                                                                                    consectetur adipiscing elit, sed do
                                                                                    eius incididunt…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="orange notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Excepteur sint occaecat cupidatat non
                                                                                    proident, sunt in culpa qui
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="bg-primary notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    In today's lesson the difference
                                                                                    between the types of leadership was
                                                                                    discussed…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <a
                                                            className="collapsed card-link"
                                                            data-toggle="collapse"
                                                            href="#notes2"
                                                        >
                                                            C003 - Engineering Sustainability and Management
                                                            <i className="fas fa-angle-down"></i>
                                                        </a>
                                                    </div>
                                                    <div
                                                        id="notes2"
                                                        className="collapse"
                                                        data-parent="#accordion"
                                                    >
                                                        <div className="card-body p-0">
                                                            <div id="accordion" className="notes_inner">
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <a
                                                                            className="collapsed card-link"
                                                                            data-toggle="collapse"
                                                                            href="#notes5"
                                                                        >
                                                                            M03 - Entrepreneurship and Sustainability
                                                                            <i className="fas fa-angle-down"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="notes5"
                                                                        className="collapse"
                                                                        data-parent="#accordion"
                                                                    >
                                                                        <div className="card-body">
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    In today's lesson the difference
                                                                                    between the types of leadership was
                                                                                    discussed…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="orange notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Search for “modern sustainability
                                                                                    solutions”
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="bg-primary notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Look for different model of
                                                                                    entrepreneurship online. Who can be an
                                                                                    entreprene…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <a
                                                                            className="collapsed card-link"
                                                                            data-toggle="collapse"
                                                                            href="#notes6"
                                                                        >
                                                                            M06 - Sustainability Innovation and
                                                                            Leadership
                                                                            <i className="fas fa-angle-down"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="notes6"
                                                                        className="collapse"
                                                                        data-parent="#accordion"
                                                                    >
                                                                        <div className="card-body">
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Lorem ipsum dolor sit amet,
                                                                                    consectetur adipiscing elit, sed do
                                                                                    eius incididunt…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="orange notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    Excepteur sint occaecat cupidatat non
                                                                                    proident, sunt in culpa qui
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="bg-primary notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="notes_view mb-2 pt-2 pb-2 white_bg">
                                                                                <div className="notes_text pl-3 pt-2">
                                                                                    In today's lesson the difference
                                                                                    between the types of leadership was
                                                                                    discussed…
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Date Created
                                                                                    <br />
                                                                                    11 / 02
                                                                                </div>
                                                                                <div className="notes_created text-center">
                                                                                    Tags
                                                                                    <br />
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                    <span className="green_bg notes_dot"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="tab-pane container fade"
                                        id="sustainable_plan"
                                    >
                                        <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                            SUSTAINABLE DEVELOPMENT PLAN
                                        </div>
                                        <div className="sustainable_plan mb-3">
                                            <h6>
                                                C001 - Organisational Sustainability, Management and
                                                Leadership Programme
                                            </h6>
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
                                                                Upload
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
                                                                Upload
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="sustainable_plan mb-3">
                                            <h6>
                                                C003 - Engineering Sustainability and Management
                                                Programme
                                            </h6>
                                            <div className="sustainable white_bg p-3">
                                                <p>
                                                    <i>
                                                        There aren't any assigned assessments for this
                                                        course yet
                                                    </i>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="sustainable_plan">
                                            <h6>Final Sustainable Development Plan</h6>
                                            <div className="sustainable white_bg p-3 mb-2">
                                                <table width="100%">
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
                                                                Upload
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane container fade" id="my_profile">
                                        <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                                            PERSONAL DETAILS
                                        </div>
                                        <div className="tab_profile">
                                            <div className="t_profile_top white_bg p-3">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="profile_img">
                                                            <img src="images/miriam-merad-t.png" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="user_detail">
                                                            <ul>
                                                                <li>
                                                                    <i className="far fa-address-card site_color"></i>
                                                                    <span>Cleanergy</span>
                                                                </li>
                                                                <li>
                                                                    <i className="far fa-envelope site_color"></i>
                                                                    <span>janedoe@email.com</span>
                                                                </li>
                                                                <li>
                                                                    <i className="fas fa-map-marker-alt site_color"></i>
                                                                    <span>Edinburgh, UK</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="t_profile_bottom p-3">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="user_name">Jane Deo</div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="user_postion text-right site_color">
                                                            Technology Consultant
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="personal_detail mt-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <h6 className="mb-3">
                                                        <b>PROGRAMME CONTACTS</b>
                                                    </h6>
                                                    <div className="personal_status grey_bg">
                                                        <div className="white_bg mb-2 p-3">
                                                            <label className="d-block">
                                                                <b>Assigned Tutor</b>
                                                            </label>
                                                            <table width="100%">
                                                                <tr>
                                                                    <td>Joe Doe</td>
                                                                    <td>(01) 234567008</td>
                                                                    <td>joedoe@email.com</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <div className="white_bg mb-2 p-3">
                                                            <label className="d-block">
                                                                <b>Programme Coordinator</b>
                                                            </label>
                                                            <table width="100%">
                                                                <tr>
                                                                    <td>Joe Doe</td>
                                                                    <td>(01) 234567008</td>
                                                                    <td>joedoe@email.com</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <div className="white_bg p-3">
                                                            <label className="d-block">
                                                                <b>Programme Director</b>
                                                            </label>
                                                            <table width="100%">
                                                                <tr>
                                                                    <td>Joe Doe</td>
                                                                    <td>(01) 234567008</td>
                                                                    <td>joedoe@email.com</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h6 className="mb-3">
                                                        <b>PROGRAMME CONTACTS</b>
                                                    </h6>
                                                    <div className="personal_status grey_bg">
                                                        <div className="white_bg mb-2 p-3">
                                                            <table width="100%">
                                                                <tr>
                                                                    <td className="pt-2 pb-2">
                                                                        <b>Student Status</b>
                                                                    </td>
                                                                    <td className="pt-2 pb-2">Enrolled</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="pt-2 pb-2">
                                                                        <b>Programme Session</b>
                                                                    </td>
                                                                    <td className="pt-2 pb-2">2018 / 2019</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="pt-2 pb-2">
                                                                        <b>Training mode</b>
                                                                    </td>
                                                                    <td className="pt-2 pb-2">Online</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="pt-2 pb-2">
                                                                        <b>Fee Status</b>
                                                                    </td>
                                                                    <td className="pt-2 pb-2">Outstanding</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
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

export default Course;
