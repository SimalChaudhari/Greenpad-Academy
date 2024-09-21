import React from "react";

const NotesSection = ({
  activeTab,
  setActiveTab,
  newNotesContent,
  setNewNotesContent,
  saveNotesContent,
  setSaveNotesContent,
  handleSaveNotes,
}) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-2 notes-section">
      <section>
        <div className="enrollment_tab">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "newnotes" ? "is_active" : ""
                }`}
                onClick={() => handleTabClick("newnotes")}
              >
                New Note &nbsp;<i className="far fa-newspaper"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "savenotes" ? "is_active" : ""
                }`}
                onClick={() => handleTabClick("savenotes")}
              >
                Saved Notes
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
              placeholder="New Notes"
            ></textarea>
            <button
              className="btn btn-primary btn-sm mt-2 save-btn"
              onClick={handleSaveNotes}
            >
              Save
            </button>
          </div>
          <div
            className={`tab-pane ${activeTab === "savenotes" ? "active" : ""}`}
          >
            {/* Saved Notes Logic */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotesSection;
