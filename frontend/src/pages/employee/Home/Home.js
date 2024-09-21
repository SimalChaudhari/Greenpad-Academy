import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { getAllEmployeeCourses } from "../../../redux/actions/employee/courssActions";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../config/config";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.employeeCourses?.list?.data);
  const coursesLoder = useSelector((state) => state.employeeCourses);
  const auth = useSelector((state) => state?.useremployee);
  const loading = coursesLoder.loading;
  const authLoading = auth.loading;
// Array of background images
const backgroundImages = [
  "assets/images/banner.jpg",
  "assets/images/banner1.jpg",
  "assets/images/banner2.jpg",
  "assets/images/banner3.jpg",
];

const [currentBgImage, setCurrentBgImage] = useState(backgroundImages[0]);

  useEffect(() => {
      dispatch(getAllEmployeeCourses())
      // Change background every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentBgImage((prevImage) => {
        const currentIndex = backgroundImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % backgroundImages.length;
        return backgroundImages[nextIndex];
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [dispatch]);

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
        <>
          <Layout>
            <section className="home_banner">
              <div className="academy_slider">
                <div>
                  
                  <img src={currentBgImage} alt="banner" />
                  <div className="slider_text">
                    <h3 className="mb-3">WELCOME TO GREENPAD ACADEMY</h3>
                    <p>
                      Sustainability leadership and management accredited
                      courses as <br />
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
                      {courses && courses.length > 0 ? (
                        courses &&
                        courses?.map((item, index) => {
                          return (
                            <div
                              className="col-lg-4 col-md-4 col-sm-12 d-flex"
                              key={index}
                            >
                              <div className="courses_categories box_shadow d-flex flex-column">
                                <a
                                  onClick={() => {
                                    navigatePage(
                                      `/employee/courses/modules/${item._id}`
                                    );
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
                                        navigatePage(
                                          `/employee/courses/modules/${item._id}`
                                        );
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
                        <div className="col-lg-12 col-md-12 text-center">
                          <hr />
                          <b>Courses are not assigned.</b>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </Layout>
        </>
      )}
    </>
  );
};

export default EmployeeHome;
