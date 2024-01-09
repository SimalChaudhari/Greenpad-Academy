import React, { useEffect } from "react";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeExam } from "../../../redux/actions/employee/examActions";
import jsPDF from "jspdf";
import SubMenu from "./SubMenu";
const moment = require("moment");

const Reports = () => {
  const dispatch = useDispatch();

  const examaReducer = useSelector((state) => state?.employeeExam);
  const courseReducer = useSelector((state) => state?.employeeCourses);

  const matchedData = courseReducer?.list?.data?.map((course) => {
    const examsForCourse = examaReducer?.list?.data?.filter(
      (exam) => exam?.course_id[0] === course?._id
    );
    return { ...course, exams: examsForCourse };
  });

  useEffect(() => {
      dispatch(getEmployeeExam());
  }, []);

  const generatePDF = (courseName, feedback, grade) => {

    // Create a new PDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text(courseName, 20, 20);

    doc.setFontSize(16);
    doc.text(`Feedback : ${feedback}`, 20, 40);

    doc.setFontSize(16);
    doc.text(`Grade : ${grade}`, 20, 60);

    // Save the PDF and trigger download
    doc.save("exam_progress.pdf");
  };

  return (
    <Layout>
      <section className="reports grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <SubMenu />
            <div className="col-lg-9">
              <div className="results_table">
                <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
                  EXAM RESULTS AND FEEDBACK
                </div>
                <table width="100%">
                  <thead>
                    <tr className="black_bg">
                      <th className="color_white p-2">
                        <i>Course</i>
                      </th>
                      <th className="color_white p-2">
                        <i>Date</i>
                      </th>
                      <th className="color_white p-2">
                        <i>Grade</i>
                      </th>
                      <th className="color_white p-2">
                        <i>Feedback</i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedData?.map((course) => (
                      <tr className="white_bg" key={course?._id}>
                        <td className="p-2">
                          {course?.exams?.map((exam, index) => (
                            <div className="mt-3 mb-3" key={index}>
                              {course?.name}
                            </div>
                          ))}
                        </td>
                        <td className="p-2">
                          {course?.exams?.map((exam, index) => (
                            <div className="mt-3 mb-3" key={index}>
                              {moment(exam?.exam_date).format(" DD / MM / YYYY") ||
                                "N/A"}
                            </div>
                          ))}
                        </td>
                        <td className="p-2">
                          {course?.exams?.map((exam, index) => (
                            <div className="mt-3 mb-3" key={index}>
                              {exam?.grade || "N/A"}
                            </div>
                          ))}
                        </td>
                        <td className="p-2">
                          {course?.exams?.map((exam, index) => (
                            <div className="mt-3 mb-3" key={index}>
                              {exam?.feedback ? (
                                <button
                                  className="green_bg color_white"
                                  onClick={() =>
                                    generatePDF(
                                      `${course?.name}`,
                                      `${exam?.feedback}`,
                                      `${exam?.grade}`
                                    )
                                  }
                                >
                                  Download
                                </button>
                              ) : (
                                "N/A"
                              )}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reports;
