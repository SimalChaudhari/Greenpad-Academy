import React, { useEffect } from "react";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import img from "../../../assets/images/enterprise.png";
import { getAllModulesProgress } from "../../../redux/actions/employee/modulesActions";
import SubMenu from "./SubMenu";
const moment = require("moment");

const Certificates = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state?.employeeCourses);
  const Auth = useSelector((state) => state?.useremployee);
  const fullName = Auth?.list?.data?.first_name + " " + Auth?.list?.data?.last_name;

  useEffect(() => {
    dispatch(getAllModulesProgress());
  }, []);
  const progress_list = useSelector(
    (state) => state?.employeemodule?.progress_list || []
  );

  // Create a map of progress data based on course IDs
  const progressMap = {};
  progress_list?.forEach((progress) => {
    if (!progressMap[progress?.course]) {
      progressMap[progress?.course] = [];
    }
    progressMap[progress?.course].push(progress);
  });

  // Merge progress data into courses
  const mergedCourses = courses?.list?.data?.map((course) => {
    const courseProgress = progressMap[course?._id] || [];
    return { ...course, progress_list: courseProgress };
  });

  const calculateCourseProgress = (module_list, course_id) => {
    const modulesForCourse = progress_list?.filter(
      (item) => item?.course === course_id
    );
    const totalModules = module_list?.length;

    if (!totalModules) {
      return 0; // Return 0 if there are no modules in the course
    }

    const completedModules =
      modulesForCourse?.filter((module) => module.is_completed)?.length || 0;
      const progressPercentage = ((completedModules / totalModules) * 100).toFixed(2); // Limit to 2 decimal places

    return progressPercentage;
  };

  const generatePDF = (courseName, courseDate) => {
    // const doc = new jsPDF("l", "mm", [297, 210]);
    const doc = new jsPDF("l", "mm", [247, 160]);
  
    // Create a rectangular page with a border
    const pageWidth = doc?.internal?.pageSize?.getWidth();
    const pageHeight = doc?.internal?.pageSize?.getHeight();
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
    const imgWidth = 40;
    const imgHeight = 25;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 30;
  
    doc.addImage(img, "JPEG", imgX, imgY, imgWidth, imgHeight);
    doc.setFont("times", "italic");
  
    doc.setFontSize(13);
    doc.text("The certificate is awarded to", 98, 68);
    doc.setFont("Helvetica", "BoldOblique");
    doc.setFontSize(20);
    doc.text(fullName, 98, 80);
    doc.setFont("normal");
    doc.setFontSize(12);
    doc.text("For the successful completion of the course", 85, 90);
    doc.setTextColor(95, 95, 95);
    doc.setFontSize(18);
  
    // Split the courseName into lines with a maximum of 6 words per line
    const courseNameLines = splitTextIntoLines(courseName, 6);
    const courseNameY = 105;
    for (let i = 0; i < courseNameLines?.length; i++) {
      doc.text(courseNameLines[i], 65, courseNameY + i * 10);
    }
  
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    const data = moment(courseDate).format(" Do MMMM YYYY ");
    doc.text(`Completion date: ${data}`, 20, courseNameY + courseNameLines?.length * 10 + 10);
  
    doc.save("course_progress.pdf");
  };
  
  // Function to split text into lines with a maximum number of words per line
  const splitTextIntoLines = (text, maxWordsPerLine) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
  
    for (let i = 0; i < words?.length; i++) {
      if ((currentLine + words[i]).split(' ').length <= maxWordsPerLine) {
        currentLine += `${words[i]} `;
      } else {
        lines.push(currentLine);
        currentLine = `${words[i]} `;
      }
    }
  
    if (currentLine !== '') {
      lines.push(currentLine);
    }
  
    return lines;
  };

  return (
    <Layout>
      <section className="reports grey_bg pt-5 pb-5">
        <div className="container">
          <div className="row">
            <SubMenu />
            <div className="col-lg-9">
              <div className="certificates">
                {/* {courses?.list?.data?.map((course, index) => ( */}
                {mergedCourses?.map((course, index) => (
                  <table key={course?._id} width="100%" className="mb-3">
                    <tr className="black_bg">
                      <th className="color_white p-2" colSpan="3">
                        {`C00${index + 1} - ${course?.name}`}
                      </th>
                    </tr>
                    <tr className="dark_grey">
                      <td className="p-2 color_white">
                        <i>Title Received</i>
                      </td>
                      <td className="p-2 color_white">
                        <i>Date Uploaded</i>
                      </td>
                      <td className="p-2 color_white">
                        <i>Certificate</i>
                      </td>
                    </tr>

                    <tr className="white_bg">
                      <td className="p-3 font-weight-bold">
                        <i>Title of Certificate in {course?.name}</i>
                      </td>
                      <td className="p-3 font-weight-bold">
                        <i>
                          {moment(course?.created_at).format(" DD/MM/YYYY ")}
                        </i>
                      </td>
                      <td className="p-3 font-weight-bold">
                        <button
                          className="green_bg color_white"
                          onClick={() =>
                            generatePDF(
                              `${course?.name}`,
                              `${course?.created_at}`,
                              calculateCourseProgress(
                                course?.modules,
                                course?._id
                              )
                            )
                          }>
                          Download
                        </button>
                      </td>
                    </tr>
                  </table>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Certificates;
