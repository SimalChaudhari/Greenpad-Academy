import React, { useState, useEffect } from "react";
import Layout from "../../../Components/Layout";
import { IMAGE_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllConpanyCourses } from "../../../redux/actions/company/courssActions";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const CompanyCourses = () => {
  const dispatch = useDispatch();
  const companyCourseReducer = useSelector(
    (state) => state.companycourses.list?.data
  );
  const companycorseReducer = useSelector((state) => state.companycourses);
  const loading = companycorseReducer.loading;

  useEffect(() => {
      dispatch(getAllConpanyCourses());
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navigatePage = (path) => {
    navigate(path);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = companyCourseReducer
    ? companyCourseReducer.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <section className="forum_page grey_bg pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="forum_content">
                <h3 className="mb-4 p-2 site_bg color_white">COURSES</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="course_page grey_bg">
        <div className="container">
          <div className="row">
            {loading ? (
              <div className="col-lg-12">
                <div className="text-center">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="col-lg-12">
                  <div className="course_right">
                    <div className="search_course mb-3">
                      <input
                        type="text"
                        placeholder="Search Course"
                        className="box_shadow"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <i className="fas fa-search"></i>
                    </div>

                    <div className="row">
                      {filteredCourses && filteredCourses.length === 0 ? (
                        <div className="col-lg-12 text-center">
                          <hr />
                          <b>Courses are not assigned to this company.</b>
                        </div>
                      ) : (
                        filteredCourses.map((item, index) => {
                          return (
                            <div className="col-lg-4 col-md-6" key={index}>
                              <div className="courses_categories box_shadow">
                                <a
                                  href="#"
                                  onClick={() => {
                                    navigatePage(
                                      `/courses/modules/${item._id}`
                                    );
                                  }}
                                >
                                  <img
                                    src={`${IMAGE_URL}/${item?.image}`}
                                    align="course-new"
                                  />
                                </a>
                                <div className="course_sub_text p-3">
                                  <h6 className="mb-2">
                                    <a
                                      href="#"
                                      onClick={() => {
                                        navigatePage(
                                          `/courses/modules/${item._id}`
                                        );
                                      }}
                                    >
                                      {item?.name}
                                    </a>
                                  </h6>

                                  <p className="mb-3">{item?.description}</p>
                                  <div className="assign_button_container text-right"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyCourses;
