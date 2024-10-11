import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NotesSection = ({
  activeTab,
  setActiveTab,
  newNotesContent,
  setNewNotesContent,
  saveNotesContent,
  setSaveNotesContent,
  handleSaveNotes,
  activeSubmodule
}) => {
  const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);
  const [notes, setNotes] = useState(null);
  // console.log(progress_list)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeSubmodule) {
      // Find if the submodule already has notes saved
      const existingNotes = progress_list?.find(item => item.description === activeSubmodule?.Id);
      setNotes(existingNotes?.notes[0]?.note || null);
      setNewNotesContent(existingNotes?.notes[0]?.note || "");
      setSaveNotesContent(existingNotes?.notes[0]?.note || ""); // Set notes if available in the progress_list
    }
  }, [activeSubmodule, progress_list, setSaveNotesContent]);

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-2 notes-section">
      <section>
        <div className="enrollment_tab">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "newnotes" ? "is_active" : ""
                  }`}
                onClick={() => handleTabClick("newnotes")}
              >
                {notes && notes.length > 0 ? "Update Note" : "Add Note"} &nbsp;<i className="far fa-newspaper"></i>
              </a>
            </li>
            
          </ul>
        </div>
        <div className="tab-content">
          <div
            className={`tab-pane ${activeTab === "newnotes" ? "active" : ""}`}
          >
            <textarea
              className="notes-textarea"
              value={newNotesContent}
              onChange={(e) => setNewNotesContent(e.target.value)}
              placeholder="Enter your note here..."
            ></textarea>
            <button
              className="btn btn-primary btn-sm mt-2 save-btn"
              onClick={handleSaveNotes}
            >
              {notes && notes.length > 0 ? "Update" : "Save"}
            </button>
          </div>
          <div
            className={`tab-pane ${activeTab === "savenotes" ? "active" : ""}`}
          >
            {/* Display Saved Notes */}
            {notes ? (
              <div className="saved-notes">
                <p>{notes}</p>
              </div>
            ) : (
              <p>No saved notes available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotesSection;
