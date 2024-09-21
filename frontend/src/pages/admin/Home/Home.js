import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Components/Layout.js";
import { getAllCourses } from "../../../redux/actions/admin/courssActions.js";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../config/config";
import { Hourglass } from "react-loader-spinner"; // Import the loader component

const Home = () => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list);
  const coursesLoder = useSelector((state) => state.course);
  const loading = coursesLoder.loading;
  const auth = useSelector((state) => state?.useremployee);
  const authLoading = auth.loading;

  // Array of background images
  const backgroundImages = [
    "assets/images/banner1.jpg",
    "assets/images/banner2.jpg",
    "assets/images/banner3.jpg",
  ];

  const [currentBgImage, setCurrentBgImage] = useState(backgroundImages[0]);

  useEffect(() => {
    dispatch(getAllCourses());

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
        <div style={{ position: "relative", top: "250px" }}>
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
          {/* Banner Section */}
          <section className="home_banner" style={{ backgroundImage: `url(${currentBgImage})` }}>
            <div className="academy_slider">
              <div>
                {/* No need for img tag since the background is now dynamically applied */}
                <div className="slider_text">
                  <h3 className="mb-3">WELCOME TO GREENPAD ACADEMY</h3>
                  <p>
                    Sustainability leadership and management accredited courses
                    as <br />
                    well as sustainability insights for people and businesses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
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
                    {coursesReducer?.data &&
                      coursesReducer?.data?.map((item, index) => (
                        <div className="col-lg-4 col-md-4 col-sm-12 d-flex courses_list" key={index} onClick={() => {
                          navigatePage(`/courses/modules/${item._id}`);
                        }}>
                          <div className="courses_categories box_shadow d-flex flex-column">
                            <a
                              onClick={() => {
                                navigatePage(`/courses/modules/${item._id}`);
                              }}
                            >
                              <img
                                src={`${IMAGE_URL}/${item?.image}`}
                                className="flex-grow-1"
                                alt="Course"
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
                      ))}
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

export default Home;
