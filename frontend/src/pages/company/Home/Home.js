import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../config/config";
import { getAllConpanyCourses } from "../../../redux/actions/company/courssActions";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const CompanyHome = () => {
  const dispatch = useDispatch();
  const companyCourseReducer = useSelector(
    (state) => state.companycourses.list?.data
  );
  const cmpcorseReducer = useSelector((state) => state.companycourses);
  const auth = useSelector((state) => state?.useremployee);
  const loading = cmpcorseReducer.loading;
  const authLoading = auth.loading;


  useEffect(() => {
      dispatch(getAllConpanyCourses());
  }, []);

  const navigate = useNavigate();
  const navigatePage = (path) => {
    navigate(path);
  };

  return (
    <>
    {authLoading ? (
      <div style={{position: "relative", top :"250px"}}>
        <div className="col-lg-12 col-md-12 mt-5">
          <div className="text-center mt-5">
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
      </div>
    ) : (
    <Layout>
      <section className="home_banner">
        <div className="academy_slider">
          <div>
            <img src="assets/images/banner.jpg" alt="banner" />
            <div className="slider_text">
              <h3 className="mb-3">WELCOME TO GREENPAD ACADEMY</h3>
              <p>
                Sustainability leadership and management accredited courses as{" "}
                <br />
                well as sustainability insights for people and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home_courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 ">
              <h2 className="text-center mb-5">Courses</h2>
            </div>

            {loading ? (
              <>
            <div className="col-lg-12 col-md-12 ">
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
              </>
            ) : (
              <>
                {companyCourseReducer && companyCourseReducer.length > 0 ? (
                  // Render courses if there are any
                  companyCourseReducer?.map((item, index) => {
                    return (
                      <div
                        className="col-lg-4 col-md-4 col-sm-12 d-flex"
                        key={index}
                      >
                        <div className="courses_categories box_shadow d-flex flex-column">
                          <a
                            onClick={() => {
                              navigatePage(`/courses/modules/${item._id}`);
                            }}
                          >
                            <img
                              src={`${IMAGE_URL}/${item?.image}`}
                              className="flex-grow-1"
                              alt="Course Image"
                            />
                          </a>
                          <div className="course_sub_text p-3">
                            <h6 className="mb-2">
                              <a
                                onClick={() => {
                                  navigatePage(`/courses/modules/${item._id}`);
                                }}
                              >
                                {item?.name}
                              </a>
                            </h6>
                            <p>{item?.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Render a message if no courses are assigned
                  <div className="col-lg-12 col-md-12 text-center">
                    <hr />
                    <b>Courses are not assigned to this company.</b>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
    )}
    </>
  );
};

export default CompanyHome;
