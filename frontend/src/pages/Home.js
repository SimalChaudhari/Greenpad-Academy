import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout.js";
import { getAllCourses } from "../redux/actions/admin/courssActions.js";
import { IMAGE_URL } from "../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const coursesReducer = useSelector((state) => state.course?.list
  );
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
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

            {coursesReducer?.data && coursesReducer?.data?.map((item, index) => {
              return (
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex" key={index}>
                <div className="courses_categories box_shadow d-flex flex-column">
                  <a href="organisational_sustainability.html">
                    <img src={`${IMAGE_URL}/${item?.image}`} className="flex-grow-1" alt="Course Image" />
                  </a>
                  <div className="course_sub_text p-3">
                    <h6 className="mb-2">
                      <a href="organisational_sustainability.html">
                        {item?.name}
                      </a>
                    </h6>
                    <p>
                      {item?.description}
                    </p>
                  </div>
                </div>
              </div>
              
              );
            })
          }
            
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Home;
