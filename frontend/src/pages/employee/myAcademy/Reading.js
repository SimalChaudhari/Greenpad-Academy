import React from "react";

import SubLayout from "./SubLayout";
import { useSelector } from "react-redux";

const Reading = () => {
  
  const courses = useSelector((state) => state.employeeCourses);


  return (
    <SubLayout>
      <div className="col-lg-9">
        <div className="main_tab_content">
          <div className="tab-content">
            <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs">
              READING LISTS
            </div>
            {courses?.list?.data &&
              courses?.list?.data?.map((item, index) => {
                return (
                  <div className="reading_box white_bg p-3 mb-2" key={index}>
                    <h6 className="mb-3">
                      <b>
                        C00{index + 1} - {item?.name}
                      </b>
                    </h6>
                    <table width="100%">
                      <tr>
                        <td className="pb-3">
                          <b>1.</b> Ashford N, Hall R (2018) Technology,
                          Globalization, and Sustainable
                          Development:Transforming the Industrial State
                        </td>
                        <td className="pb-3">ISBN 978-3-319-70585-9</td>
                      </tr>
                      <tr>
                        <td className="pb-3">
                          <b>2.</b> Sanneh E.S (2018) Systems Thinking for
                          Sustainable Development{" "}
                        </td>
                        <td className="pb-3">ISBN-10: 1138665908</td>
                      </tr>
                      <tr>
                        <td className="pb-3">
                          <b>3.</b> Benn S., Edwards M., Williams T. (2018)
                          Organizational Change for Corporate Sustainability 4th
                          Edition Routledge{" "}
                        </td>
                        <td className="pb-3">ISBN-10: 1138963062</td>
                      </tr>
                      <tr>
                        <td className="pb-3">
                          <b>4.</b> Robertson M (2018) Communicating
                          Sustainability
                        </td>
                        <td className="pb-3">ISBN-10: 1138659282 </td>
                      </tr>
                      <tr>
                        <td className="pb-3">
                          <b>5.</b> Konig A., Ravetz J. (ed) (2017)
                          Sustainability Science: Key Issues (Key Issues in
                          Environment and Sustainability)
                        </td>
                        <td className="pb-3">ISBN-13:978-1138294868 </td>
                      </tr>
                      <tr>
                        <td className="pb-3">
                          <b>6.</b> Clegg S.R , de Matos J.A. (eds) (2017)
                          Sustainability and Organizational Change Management
                        </td>
                        <td className="pb-3">ISBN-978-1-5095-1107-5</td>
                      </tr>
                    </table>
                  </div>
                )
              })}

          </div>
        </div>
      </div>
    </SubLayout>
  );
};

export default Reading;
