import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  updateProgress,
  getModulesProgress,
  editEmployeeNoteById,
  deleteEmployeeNoteById,
} from "../../../../../redux/actions/employee/modulesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../../../../Components/Layout";
import { toast } from "react-toastify";
import DeleteModel from "../../../../../Components/Delete";
import Edit from "../Edit";
import ModulesList from "./ModulesList";
import ModuleDescription from "./ModuleDescription";
import NotesSection from "./NotesSection";
import "./style.css";

const EmpCourseModulesIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);
  const authId = useSelector((state) => state?.auth?.user);
  const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);

  const [activeRow, setActiveRow] = useState("");
  const [innerData, setInnerData] = useState([]);
  const [activeModuleRow, setActiveModuleRow] = useState("");
  const [newNotesContent, setNewNotesContent] = useState("");
  const [saveNotesContent, setSaveNotesContent] = useState("");
  const [activeTab, setActiveTab] = useState("newnotes");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [courseModule_Id, setCourseModule_Id] = useState(null);
  const [showContent, setShowContent] = useState(true);

  const [activeModule, setActiveModule] = useState([]);
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [subModuleImage, setSubModuleImage] = useState(null);
  const [activeSubmodule, setActiveSubmodule] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const courseId = location?.pathname?.split("/")[4];

  useEffect(() => {
    dispatch(getAll(id));
    dispatch(getModulesProgress(id));
  }, [dispatch, id]);

  const handleSaveNotes = () => {
    const textareaContent = activeTab === "newnotes" ? newNotesContent : saveNotesContent;
    if (!textareaContent.trim()) {
      toast.warning("Please enter some notes before saving.");
      return;
    }

    const formData = {
      course: courseId,
      module: courseModule_Id,
      notes: textareaContent,
      tag: activeTab,
    };

    dispatch(editEmployeeNoteById(authId.id, formData));
    setNewNotesContent("");
    setSaveNotesContent("");
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleDelete = (noteId) => {
    dispatch(deleteEmployeeNoteById(noteId)).then(() => {
      setDeleteModalOpen(false);
      setSelectedNote(null);
      toast.success("Note deleted successfully");
    });
  };

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            {showContent && (
              <ModulesList
                data={data}
                activeRow={activeRow}
                innerData={innerData}
                setActiveRow={setActiveRow}
                setInnerData={setInnerData}
                setActiveModuleRow={setActiveModuleRow}
                setActiveModule={setActiveModule}
                courseModule_Id={courseModule_Id}
                setCourseModule_Id={setCourseModule_Id}
                setSubModuleDescription={setSubModuleDescription}
                activeSubmodule={activeSubmodule}
              />
            )}
            <div className={showContent ? "col-xl-8 mt-2" : "col-xl-12 mt-2"}>
              <ModuleDescription
                data={data}
                activeModuleRow={activeModuleRow}
                activeModule={activeModule}
                subModuleDescription={subModuleDescription}
                subModuleImage={subModuleImage}
                courseId={courseId}
                courseModule_Id={courseModule_Id}
                setActiveSubmodule={setActiveSubmodule}
              />
            </div>
            {showContent && (
              <NotesSection
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                newNotesContent={newNotesContent}
                setNewNotesContent={setNewNotesContent}
                saveNotesContent={saveNotesContent}
                setSaveNotesContent={setSaveNotesContent}
                handleSaveNotes={handleSaveNotes}
              />
            )}
          </div>
        </div>
      </section>

      {deleteModalOpen && selectedNote && (
        <DeleteModel
          data={selectedNote}
          handleDelete={handleDelete}
          handleCloseModal={() => setDeleteModalOpen(false)}
        />
      )}

      {editmodalOpen && selectedNote && (
        <Edit
          courseData={selectedNote}
          handleCloseModal={() => setEditModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default EmpCourseModulesIndex;
