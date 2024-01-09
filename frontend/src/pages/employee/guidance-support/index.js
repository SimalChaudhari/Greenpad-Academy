import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { getEmployeesPolicy } from "../../../redux/actions/Guidance-Support/policyActions";
import { getEmployeesProgrammeContacts } from "../../../redux/actions/Guidance-Support/programmecontactsActions";
import { CreateContactus } from "../../../redux/actions/Guidance-Support/contactusActions";

const GuidanceSupport = () => {
  const [policyData, setPolicyData] = useState(null);
  const policyReducer = useSelector((state) => state.policy?.list?.data);
  const programmecontactsReducer = useSelector(
    (state) => state.programmecontacts?.list?.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getEmployeesPolicy());
      dispatch(getEmployeesProgrammeContacts());
  }, []);

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(CreateContactus(values));
      values.submit = true;
      resetForm();
    } catch (error) {
      console.error("Error creating contact:", error);
    } finally {
      setSubmitting(false);
    }
    // dispatch(CreateContactus(values));
  };

  // Listen for changes in policyReducer, and when policy data is available, set it in the policyData state
  useEffect(() => {
    if (policyReducer && policyReducer.length > 0) {
      setPolicyData(policyReducer[0]);
    }
  }, [policyReducer]);

  return (
    <Layout>
      <section className="support_page">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12 mx-auto">
              <div className="tab_container">
                <h3 className="mb-4 p-2 site_bg color_white">
                  GUIDANCE & SUPPORT
                </h3>
                <div className="tabs_design">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#home"
                      >
                        Policy
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu1">
                        Contact Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu2">
                        Programme Contacts
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane container active" id="home">
                      <div className="s_tab_detail pl-2 pr-2 pb-5">
                        <h4 className="text-center text-uppercase site_color pt-5 mb-4">
                          equal policy
                        </h4>
                        <img src="../assets/images/banner.jpg" alt="banner" />
                        <div className="s_tab_text">
                          {policyData && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: policyData.description,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane container fade" id="menu1">
                      <div className="s_tab_detail pl-5 pr-5 pb-5">
                        <h4 className="text-center text-uppercase site_color pt-5 mb-4">
                          contact us
                        </h4>

                        <p className="mb-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labor et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris. Onsectetur
                          adipiscing elit, sed do.
                        </p>
                        <div className="enquery_form">
                          <h4 className="p-2 black_bg color_white mb-3">
                            Send an enquiry
                          </h4>

                          {/* <form className="pl-3 pr-3 pt-2 pb-3">
                            <p className="mb-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </p>
                            <div className="form-group">
                              <label className="d-block">
                                <b>Choose your type of query</b>
                              </label>
                              <div className="from-radio d-inline-block mr-3 mb-3">
                                <input type="radio" name="" />
                                modules
                              </div>
                              <div className="from-radio d-inline-block mr-3 mb-3">
                                <input type="radio" name="" />
                                System
                              </div>
                              <div className="from-radio d-inline-block mr-3 mb-3">
                                <input type="radio" name="" />
                                Other
                              </div>
                              <div className="from-radio d-inline-block mr-3 mb-3">
                                <input type="radio" name="" />
                                Course
                              </div>
                              <div className="from-radio d-inline-block mr-3 mb-3">
                                <input type="radio" name="" />
                                Technical
                              </div>
                            </div>
                            <div className="form-grpup">
                              <textarea placeholder="Enter Enquiry"></textarea>
                              <button className="green_bg ml-2 color_white">
                                Send
                              </button>
                            </div>
                          </form> */}

                          <Formik
                            enableReinitialize
                            initialValues={{
                              query: "",
                              type: "",
                            }}
                            validate={(values) => {
                              const errors = {};

                              // Validate query field
                              if (!values.query || values.query.length === 0) {
                                errors.query =
                                  "At least one Query must be selected";
                              }

                              // Validate type field
                              if (!values.type || values.type.length === 0) {
                                errors.type = "Please select a Query type";
                              }

                              return errors;
                            }}
                            onSubmit={handleCreate}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                            }) => (
                              <form onSubmit={handleSubmit}>
                                <div className="row p-3">
                                  <div className="col-lg-12">
                                    <p className="mb-4">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit
                                    </p>
                                    {/* <div className="form-group">
                                      <label className="d-block">
                                        <b>Choose your type of query</b>
                                      </label>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input type="radio" name="modules" />
                                        modules
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input type="radio" name="System" />
                                        System
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input type="radio" name="" />
                                        Other
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input type="radio" name="" />
                                        Course
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input type="radio" name="" />
                                        Technical
                                      </div>
                                    </div> */}

                                    <div className="form-group">
                                      <label className="d-block">
                                        <b>Choose your type of query</b>
                                      </label>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input
                                          type="radio"
                                          name="type"
                                          value="modules"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          checked={values.type === "modules"} // Check if the current type value is "modules"
                                        />
                                        modules
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input
                                          type="radio"
                                          name="type"
                                          value="system"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          checked={values.type === "system"} // Check if the current type value is "System"
                                        />
                                        System
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input
                                          type="radio"
                                          name="type"
                                          value="other"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          checked={values.type === "other"} // Check if the current type value is "Other"
                                        />
                                        Other
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input
                                          type="radio"
                                          name="type"
                                          value="course"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          checked={values.type === "course"} // Check if the current type value is "Course"
                                        />
                                        Course
                                      </div>
                                      <div className="from-radio d-inline-block mr-3 mb-3">
                                        <input
                                          type="radio"
                                          name="type"
                                          value="technical"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          checked={values.type === "technical"} // Check if the current type value is "Technical"
                                        />
                                        Technical
                                      </div>
                                      {errors.type && touched.type && (
                                        <div className="input-feedback">
                                          {errors.type}
                                        </div>
                                      )}
                                    </div>

                                    <div className="form-group">
                                      <textarea
                                        name="query"
                                        value={values.query}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter your query here..."
                                        style={{
                                          width: "100%",
                                          height: "200px",
                                          resize: "vertical", // Allow vertical resizing
                                        }}
                                        className={
                                          errors.query && touched.query
                                            ? "error"
                                            : ""
                                        }
                                      />
                                      {errors.query && touched.query && (
                                        <div className="input-feedback">
                                          {errors.query}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-btn text-center mt-3">
                                      <button
                                        className="text-uppercase green_bg color_white"
                                        type="submit"
                                        // disabled={isSubmitting}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane container fade" id="menu2">
                      <div className="s_tab_detail">
                        <h4 className="text-center text-uppercase site_color pt-5 mb-4">
                          Programme contacts
                        </h4>
                        <p className="mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labor et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris. Onsectetur
                          adipiscing elit, sed do.
                        </p>
                        <div className="row">
                          {programmecontactsReducer &&
                            programmecontactsReducer.map((contact) => (
                              <div
                                className="col-lg-4 col-md-4"
                                key={contact._id}
                              >
                                <div className="programme_main black_bg p-2">
                                  <div className="programme_part">
                                    <p className="color_white">
                                      <b>Programme Director</b>
                                      <br />
                                      {contact.first_name} {contact.last_name}
                                    </p>
                                    <p className="color_white">
                                      <b>Mobile</b>
                                      <br />
                                      {contact.mobile}
                                    </p>
                                    <p className="color_white">
                                      <b>Email</b>
                                      <br />
                                      {contact.email}
                                    </p>
                                  </div>
                                  <div className="programme_part">
                                    <img
                                      src="../assets/images/joe-deo.png"
                                      alt="joe-deo"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
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

export default GuidanceSupport;
